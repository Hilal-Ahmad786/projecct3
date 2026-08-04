import { getPrisma } from '@/lib/db/prisma';

// Type definitions to avoid importing from @prisma/client at top level
type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'NEGOTIATION' | 'WON' | 'LOST' | 'ARCHIVED';
type LeadPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
type RequestStatus = 'PENDING' | 'UNDER_REVIEW' | 'NEEDS_INFO' | 'APPROVED' | 'REJECTED' | 'CONVERTED';
type MessageStatus = 'UNREAD' | 'READ' | 'REPLIED' | 'ARCHIVED' | 'SPAM';

// Get prisma instance - will throw if DATABASE_URL is not set
const getPrismaClient = () => getPrisma();

// Pagination helper types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ==================== LEAD QUERIES ====================

export interface LeadFilters {
  status?: LeadStatus;
  priority?: LeadPriority;
  source?: string;
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export async function getLeads(
  filters: LeadFilters = {},
  pagination: PaginationParams = {}
): Promise<PaginatedResult<typeof leads[0]>> {
  const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
  const skip = (page - 1) * limit;

  const where = buildLeadWhereClause(filters);

  const [leads, total] = await Promise.all([
    getPrismaClient().lead.findMany({
      where,
      include: {
        projectRequests: { select: { id: true, serviceType: true, status: true } },
        contactMessages: { select: { id: true, subject: true, status: true } },
        _count: { select: { activities: true } },
      },
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: limit,
    }),
    getPrismaClient().lead.count({ where }),
  ]);

  return {
    data: leads,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getLeadById(id: string) {
  return getPrismaClient().lead.findUnique({
    where: { id },
    include: {
      projectRequests: true,
      contactMessages: true,
      activities: { orderBy: { createdAt: 'desc' }, take: 20 },
    },
  });
}

export async function createLead(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  source?: string;
  notes?: string;
}) {
  return getPrismaClient().lead.create({
    data: {
      ...data,
      activities: {
        create: {
          type: 'CREATED',
          description: 'Lead created',
        },
      },
    },
    include: {
      activities: true,
    },
  });
}

export async function updateLead(
  id: string,
  data: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    website?: string;
    source?: string;
    status?: LeadStatus;
    priority?: LeadPriority;
    notes?: string;
  }
) {
  const currentLead = await getPrismaClient().lead.findUnique({ where: { id } });

  const lead = await getPrismaClient().lead.update({
    where: { id },
    data,
    include: {
      projectRequests: true,
      contactMessages: true,
    },
  });

  // Log status change activity
  if (data.status && currentLead && data.status !== currentLead.status) {
    await getPrismaClient().leadActivity.create({
      data: {
        leadId: id,
        type: 'STATUS_CHANGED',
        description: `Status changed from ${currentLead.status} to ${data.status}`,
        metadata: { oldStatus: currentLead.status, newStatus: data.status },
      },
    });
  }

  return lead;
}

export async function deleteLead(id: string) {
  return getPrismaClient().lead.delete({ where: { id } });
}

export async function getLeadByEmail(email: string) {
  return getPrismaClient().lead.findFirst({
    where: { email: { equals: email, mode: 'insensitive' } },
    include: {
      projectRequests: true,
      contactMessages: true,
    },
  });
}

function buildLeadWhereClause(filters: LeadFilters) {
  const where: Record<string, unknown> = {};

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.priority) {
    where.priority = filters.priority;
  }

  if (filters.source) {
    where.source = filters.source;
  }

  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: 'insensitive' } },
      { email: { contains: filters.search, mode: 'insensitive' } },
      { company: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  if (filters.dateFrom || filters.dateTo) {
    where.createdAt = {};
    if (filters.dateFrom) {
      (where.createdAt as Record<string, Date>).gte = filters.dateFrom;
    }
    if (filters.dateTo) {
      (where.createdAt as Record<string, Date>).lte = filters.dateTo;
    }
  }

  return where;
}

// ==================== PROJECT REQUEST QUERIES ====================

export interface ProjectRequestFilters {
  status?: RequestStatus;
  serviceType?: string;
  leadId?: string;
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export async function getProjectRequests(
  filters: ProjectRequestFilters = {},
  pagination: PaginationParams = {}
): Promise<PaginatedResult<typeof requests[0]>> {
  const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
  const skip = (page - 1) * limit;

  const where = buildProjectRequestWhereClause(filters);

  const [requests, total] = await Promise.all([
    getPrismaClient().projectRequest.findMany({
      where,
      include: {
        lead: { select: { id: true, name: true, email: true, company: true } },
      },
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: limit,
    }),
    getPrismaClient().projectRequest.count({ where }),
  ]);

  return {
    data: requests,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getProjectRequestById(id: string) {
  return getPrismaClient().projectRequest.findUnique({
    where: { id },
    include: {
      lead: true,
    },
  });
}

export async function createProjectRequest(data: {
  leadId: string;
  serviceType: string;
  projectTitle?: string;
  description: string;
  goals?: string;
  targetAudience?: string;
  techPreferences?: string;
  integrations?: string;
  performanceReqs?: string;
  budgetRange?: 'SMALL' | 'MEDIUM' | 'LARGE' | 'ENTERPRISE' | 'CUSTOM';
  timeline?: 'URGENT' | 'STANDARD' | 'FLEXIBLE' | 'LONG_TERM';
  urgencyLevel?: 'LOW' | 'NORMAL' | 'HIGH' | 'CRITICAL';
  preferredStartDate?: Date;
  additionalNotes?: string;
}) {
  const request = await getPrismaClient().projectRequest.create({
    data,
    include: {
      lead: true,
    },
  });

  // Log activity on the lead
  await getPrismaClient().leadActivity.create({
    data: {
      leadId: data.leadId,
      type: 'CUSTOM',
      description: `Project request submitted: ${data.serviceType}`,
      metadata: { projectRequestId: request.id },
    },
  });

  return request;
}

export async function updateProjectRequest(
  id: string,
  data: {
    status?: RequestStatus;
    reviewedBy?: string;
    internalNotes?: string;
    serviceType?: string;
    projectTitle?: string;
    description?: string;
  }
) {
  const updateData: Record<string, unknown> = { ...data };

  if (data.status) {
    updateData.reviewedAt = new Date();
  }

  return getPrismaClient().projectRequest.update({
    where: { id },
    data: updateData,
    include: {
      lead: true,
    },
  });
}

export async function deleteProjectRequest(id: string) {
  return getPrismaClient().projectRequest.delete({ where: { id } });
}

function buildProjectRequestWhereClause(filters: ProjectRequestFilters) {
  const where: Record<string, unknown> = {};

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.serviceType) {
    where.serviceType = filters.serviceType;
  }

  if (filters.leadId) {
    where.leadId = filters.leadId;
  }

  if (filters.search) {
    where.OR = [
      { projectTitle: { contains: filters.search, mode: 'insensitive' } },
      { description: { contains: filters.search, mode: 'insensitive' } },
      { lead: { name: { contains: filters.search, mode: 'insensitive' } } },
      { lead: { email: { contains: filters.search, mode: 'insensitive' } } },
    ];
  }

  if (filters.dateFrom || filters.dateTo) {
    where.createdAt = {};
    if (filters.dateFrom) {
      (where.createdAt as Record<string, Date>).gte = filters.dateFrom;
    }
    if (filters.dateTo) {
      (where.createdAt as Record<string, Date>).lte = filters.dateTo;
    }
  }

  return where;
}

// ==================== CONTACT MESSAGE QUERIES ====================

export interface ContactMessageFilters {
  status?: MessageStatus;
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export async function getContactMessages(
  filters: ContactMessageFilters = {},
  pagination: PaginationParams = {}
): Promise<PaginatedResult<typeof messages[0]>> {
  const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
  const skip = (page - 1) * limit;

  const where = buildContactMessageWhereClause(filters);

  const [messages, total] = await Promise.all([
    getPrismaClient().contactMessage.findMany({
      where,
      include: {
        lead: { select: { id: true, name: true, email: true } },
      },
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: limit,
    }),
    getPrismaClient().contactMessage.count({ where }),
  ]);

  return {
    data: messages,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getContactMessageById(id: string) {
  return getPrismaClient().contactMessage.findUnique({
    where: { id },
    include: {
      lead: true,
    },
  });
}

export async function createContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  leadId?: string;
}) {
  // Try to find existing lead or create link
  let leadId = data.leadId;

  if (!leadId) {
    const existingLead = await getLeadByEmail(data.email);
    if (existingLead) {
      leadId = existingLead.id;
    }
  }

  const contactMessage = await getPrismaClient().contactMessage.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      leadId,
    },
    include: {
      lead: true,
    },
  });

  // If linked to a lead, create activity
  if (leadId) {
    await getPrismaClient().leadActivity.create({
      data: {
        leadId,
        type: 'CUSTOM',
        description: `Contact message received: ${data.subject}`,
        metadata: { contactMessageId: contactMessage.id },
      },
    });
  }

  return contactMessage;
}

export async function updateContactMessage(
  id: string,
  data: {
    status?: MessageStatus;
    repliedBy?: string;
  }
) {
  const updateData: Record<string, unknown> = { ...data };

  if (data.status === 'REPLIED') {
    updateData.repliedAt = new Date();
  }

  return getPrismaClient().contactMessage.update({
    where: { id },
    data: updateData,
    include: {
      lead: true,
    },
  });
}

export async function deleteContactMessage(id: string) {
  return getPrismaClient().contactMessage.delete({ where: { id } });
}

function buildContactMessageWhereClause(filters: ContactMessageFilters) {
  const where: Record<string, unknown> = {};

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: 'insensitive' } },
      { email: { contains: filters.search, mode: 'insensitive' } },
      { subject: { contains: filters.search, mode: 'insensitive' } },
      { message: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  if (filters.dateFrom || filters.dateTo) {
    where.createdAt = {};
    if (filters.dateFrom) {
      (where.createdAt as Record<string, Date>).gte = filters.dateFrom;
    }
    if (filters.dateTo) {
      (where.createdAt as Record<string, Date>).lte = filters.dateTo;
    }
  }

  return where;
}

// ==================== DASHBOARD STATS QUERIES ====================

export async function getDashboardStats() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  const [
    totalLeads,
    leadsThisMonth,
    leadsLastMonth,
    newLeads,
    qualifiedLeads,
    totalRequests,
    requestsThisMonth,
    pendingRequests,
    unreadMessages,
    messagesThisMonth,
    leadsBySource,
    requestsByService,
    recentLeads,
    recentRequests,
  ] = await Promise.all([
    getPrismaClient().lead.count(),
    getPrismaClient().lead.count({ where: { createdAt: { gte: startOfMonth } } }),
    getPrismaClient().lead.count({ where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } } }),
    getPrismaClient().lead.count({ where: { status: 'NEW' } }),
    getPrismaClient().lead.count({ where: { status: 'QUALIFIED' } }),
    getPrismaClient().projectRequest.count(),
    getPrismaClient().projectRequest.count({ where: { createdAt: { gte: startOfMonth } } }),
    getPrismaClient().projectRequest.count({ where: { status: 'PENDING' } }),
    getPrismaClient().contactMessage.count({ where: { status: 'UNREAD' } }),
    getPrismaClient().contactMessage.count({ where: { createdAt: { gte: startOfMonth } } }),
    getPrismaClient().lead.groupBy({ by: ['source'], _count: true }),
    getPrismaClient().projectRequest.groupBy({ by: ['serviceType'], _count: true }),
    getPrismaClient().lead.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    getPrismaClient().projectRequest.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { lead: { select: { name: true, email: true } } },
    }),
  ]);

  const leadsGrowth = leadsLastMonth > 0
    ? Math.round(((leadsThisMonth - leadsLastMonth) / leadsLastMonth) * 100)
    : 100;

  return {
    leads: {
      total: totalLeads,
      thisMonth: leadsThisMonth,
      growth: leadsGrowth,
      new: newLeads,
      qualified: qualifiedLeads,
    },
    requests: {
      total: totalRequests,
      thisMonth: requestsThisMonth,
      pending: pendingRequests,
    },
    messages: {
      unread: unreadMessages,
      thisMonth: messagesThisMonth,
    },
    analytics: {
      leadsBySource: leadsBySource.map((item) => ({
        source: item.source,
        count: item._count,
      })),
      requestsByService: requestsByService.map((item) => ({
        service: item.serviceType,
        count: item._count,
      })),
    },
    recentActivity: {
      leads: recentLeads,
      requests: recentRequests,
    },
  };
}

// ==================== ADMIN USER QUERIES ====================

export async function getAdminUserByEmail(email: string) {
  return getPrismaClient().adminUser.findUnique({
    where: { email },
  });
}

export async function getAdminUsers() {
  return getPrismaClient().adminUser.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      lastLogin: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function updateAdminUserLastLogin(id: string) {
  return getPrismaClient().adminUser.update({
    where: { id },
    data: { lastLogin: new Date() },
  });
}

// ==================== ADMIN USER CRUD QUERIES ====================

export async function createAdminUser(data: {
  email: string;
  name: string;
  password: string;
  role?: 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'VIEWER';
}) {
  // Dynamic import bcryptjs to avoid build issues
  const bcrypt = await import('bcryptjs');
  const passwordHash = await bcrypt.hash(data.password, 12);

  return getPrismaClient().adminUser.create({
    data: {
      email: data.email,
      name: data.name,
      passwordHash,
      role: data.role || 'VIEWER',
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      lastLogin: true,
      createdAt: true,
    },
  });
}

export async function updateAdminUser(
  id: string,
  data: {
    name?: string;
    email?: string;
    role?: 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'VIEWER';
    isActive?: boolean;
    password?: string;
  }
) {
  const updateData: Record<string, unknown> = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.email !== undefined) updateData.email = data.email;
  if (data.role !== undefined) updateData.role = data.role;
  if (data.isActive !== undefined) updateData.isActive = data.isActive;
  if (data.password) {
    const bcrypt = await import('bcryptjs');
    updateData.passwordHash = await bcrypt.hash(data.password, 12);
  }

  return getPrismaClient().adminUser.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      lastLogin: true,
      createdAt: true,
    },
  });
}

export async function deleteAdminUser(id: string) {
  return getPrismaClient().adminUser.delete({ where: { id } });
}

// ==================== SETTINGS QUERIES ====================

export async function getSettings(category?: string) {
  const where = category ? { category } : {};
  return getPrismaClient().setting.findMany({ where, orderBy: { key: 'asc' } });
}

export async function getSetting(key: string) {
  return getPrismaClient().setting.findUnique({ where: { key } });
}

export async function upsertSetting(key: string, value: unknown, category: string = 'general') {
  return getPrismaClient().setting.upsert({
    where: { key },
    update: { value: value as any, category },
    create: { key, value: value as any, category },
  });
}

export async function bulkUpsertSettings(settings: Array<{ key: string; value: unknown; category?: string }>) {
  const results = [];
  for (const s of settings) {
    const result = await upsertSetting(s.key, s.value, s.category || 'general');
    results.push(result);
  }
  return results;
}

// ==================== NOTIFICATION QUERIES ====================

export async function getNotifications(
  userId?: string,
  filters: { read?: boolean; type?: string } = {},
  pagination: PaginationParams = {}
) {
  const { page = 1, limit = 20, sortOrder = 'desc' } = pagination;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};
  if (userId) where.userId = userId;
  if (filters.read !== undefined) where.read = filters.read;
  if (filters.type) where.type = filters.type;

  const [data, total] = await Promise.all([
    getPrismaClient().notification.findMany({
      where,
      orderBy: { createdAt: sortOrder },
      skip,
      take: limit,
    }),
    getPrismaClient().notification.count({ where }),
  ]);

  return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function createNotification(data: {
  userId?: string;
  type?: string;
  priority?: string;
  title: string;
  message: string;
  actionUrl?: string;
  metadata?: Record<string, unknown>;
}) {
  return getPrismaClient().notification.create({ data });
}

export async function markNotificationRead(id: string) {
  return getPrismaClient().notification.update({
    where: { id },
    data: { read: true },
  });
}

export async function markAllNotificationsRead(userId?: string) {
  const where: Record<string, unknown> = { read: false };
  if (userId) where.userId = userId;
  return getPrismaClient().notification.updateMany({
    where,
    data: { read: true },
  });
}

export async function deleteNotification(id: string) {
  return getPrismaClient().notification.delete({ where: { id } });
}

export async function getUnreadCount(userId?: string) {
  const where: Record<string, unknown> = { read: false };
  if (userId) where.userId = userId;
  return getPrismaClient().notification.count({ where });
}

// ==================== SERVICE QUERIES ====================

export interface ServiceFilters {
  status?: string;
  featured?: boolean;
  search?: string;
}

export async function getServices(
  filters: ServiceFilters = {},
  pagination: PaginationParams = {}
) {
  const { page = 1, limit = 50, sortBy = 'order', sortOrder = 'asc' } = pagination;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};
  if (filters.status) where.status = filters.status;
  if (filters.featured !== undefined) where.featured = filters.featured;
  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: 'insensitive' } },
      { description: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  const [data, total] = await Promise.all([
    getPrismaClient().service.findMany({
      where,
      include: { _count: { select: { pricingPackages: true } } },
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: limit,
    }),
    getPrismaClient().service.count({ where }),
  ]);

  return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function getServiceById(id: string) {
  return getPrismaClient().service.findUnique({
    where: { id },
    include: { pricingPackages: true, translations: true },
  });
}

export async function createService(data: {
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  fullDescription?: string;
  icon?: string;
  heroImage?: string;
  features?: string[];
  benefits?: string[];
  content?: any;
  status?: string;
  featured?: boolean;
  order?: number;
  color?: string;
}) {
  return getPrismaClient().service.create({ data });
}

export async function updateService(id: string, data: {
  name?: string;
  slug?: string;
  description?: string;
  shortDescription?: string;
  fullDescription?: string;
  icon?: string;
  heroImage?: string;
  features?: string[];
  benefits?: string[];
  content?: any;
  status?: string;
  featured?: boolean;
  order?: number;
  color?: string;
}) {
  return getPrismaClient().service.update({ where: { id }, data });
}

export async function reorderServices(orders: { id: string; order: number }[]) {
  const prisma = getPrismaClient();
  return prisma.$transaction(
    orders.map(({ id, order }) =>
      prisma.service.update({ where: { id }, data: { order } })
    )
  );
}

export async function deleteService(id: string) {
  return getPrismaClient().service.delete({ where: { id } });
}

// ==================== PRICING PACKAGE QUERIES ====================

export async function getPricingPackages(serviceId?: string) {
  const where = serviceId ? { serviceId } : {};
  return getPrismaClient().pricingPackage.findMany({
    where,
    include: { service: { select: { id: true, name: true, slug: true } } },
    orderBy: [{ service: { order: 'asc' } }, { tier: 'asc' }],
  });
}

export async function createPricingPackage(data: {
  serviceId: string;
  tier?: string;
  name: string;
  price: string;
  description?: string;
  features?: string[];
  highlighted?: boolean;
  billingPeriod?: string;
  yearlyPrice?: string;
  ctaText?: string;
}) {
  return getPrismaClient().pricingPackage.create({
    data,
    include: { service: { select: { id: true, name: true, slug: true } } },
  });
}

export async function updatePricingPackage(id: string, data: {
  tier?: string;
  name?: string;
  price?: string;
  description?: string;
  features?: string[];
  highlighted?: boolean;
  billingPeriod?: string;
  yearlyPrice?: string;
  ctaText?: string;
}) {
  return getPrismaClient().pricingPackage.update({
    where: { id },
    data,
    include: { service: { select: { id: true, name: true, slug: true } } },
  });
}

export async function duplicatePricingPackage(id: string) {
  const prisma = getPrismaClient();
  const original = await prisma.pricingPackage.findUnique({ where: { id } });
  if (!original) throw new Error('Package not found');

  return prisma.pricingPackage.create({
    data: {
      serviceId: original.serviceId,
      tier: original.tier,
      name: `${original.name} (Copy)`,
      price: original.price,
      description: original.description,
      features: original.features,
      highlighted: false,
      billingPeriod: original.billingPeriod,
      yearlyPrice: original.yearlyPrice,
      ctaText: original.ctaText,
    },
    include: { service: { select: { id: true, name: true, slug: true } } },
  });
}

export async function deletePricingPackage(id: string) {
  return getPrismaClient().pricingPackage.delete({ where: { id } });
}

// ==================== PROJECT QUERIES ====================

export interface ProjectFilters {
  status?: string;
  category?: string;
  featured?: boolean;
  search?: string;
}

export async function getProjects(
  filters: ProjectFilters = {},
  pagination: PaginationParams = {}
) {
  const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};
  if (filters.status) where.status = filters.status;
  if (filters.category) where.category = filters.category;
  if (filters.featured !== undefined) where.featured = filters.featured;
  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: 'insensitive' } },
      { client: { contains: filters.search, mode: 'insensitive' } },
      { description: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  const [data, total] = await Promise.all([
    getPrismaClient().project.findMany({
      where,
      include: { translations: true },
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: limit,
    }),
    getPrismaClient().project.count({ where }),
  ]);

  return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function getProjectById(id: string) {
  return getPrismaClient().project.findUnique({
    where: { id },
    include: { translations: true },
  });
}

export async function createProject(data: {
  name: string;
  slug: string;
  client?: string;
  category?: string;
  industry?: string;
  status?: string;
  featured?: boolean;
  thumbnail?: string;
  description?: string;
  fullDescription?: string;
  challenge?: string;
  solution?: string;
  images?: string[];
  technologies?: string[];
  results?: any;
  duration?: string;
  teamSize?: string;
  content?: any;
  completedDate?: Date;
  projectUrl?: string;
}) {
  return getPrismaClient().project.create({ data });
}

export async function updateProject(id: string, data: {
  name?: string;
  slug?: string;
  client?: string;
  category?: string;
  industry?: string;
  status?: string;
  featured?: boolean;
  thumbnail?: string;
  description?: string;
  fullDescription?: string;
  challenge?: string;
  solution?: string;
  images?: string[];
  technologies?: string[];
  results?: any;
  duration?: string;
  teamSize?: string;
  content?: any;
  completedDate?: Date;
  projectUrl?: string;
}) {
  return getPrismaClient().project.update({ where: { id }, data });
}

export async function deleteProject(id: string) {
  return getPrismaClient().project.delete({ where: { id } });
}

// ==================== SERVICE TRANSLATION QUERIES ====================

export async function getServiceTranslations(serviceId: string) {
  return getPrismaClient().serviceTranslation.findMany({
    where: { serviceId },
    orderBy: { locale: 'asc' },
  });
}

export async function upsertServiceTranslation(serviceId: string, locale: string, data: {
  name: string;
  shortDescription?: string;
  fullDescription?: string;
  features?: string[];
  benefits?: string[];
  content?: any;
  metaTitle?: string;
  metaDescription?: string;
}) {
  const existing = await getPrismaClient().serviceTranslation.findUnique({
    where: { serviceId_locale: { serviceId, locale } },
  });

  if (existing) {
    return getPrismaClient().serviceTranslation.update({
      where: { id: existing.id },
      data,
    });
  }

  return getPrismaClient().serviceTranslation.create({
    data: { serviceId, locale, ...data },
  });
}

export async function deleteServiceTranslation(serviceId: string, locale: string) {
  return getPrismaClient().serviceTranslation.delete({
    where: { serviceId_locale: { serviceId, locale } },
  });
}

// ==================== PROJECT TRANSLATION QUERIES ====================

export async function getProjectTranslations(projectId: string) {
  return getPrismaClient().projectTranslation.findMany({
    where: { projectId },
    orderBy: { locale: 'asc' },
  });
}

export async function upsertProjectTranslation(projectId: string, locale: string, data: {
  name: string;
  description?: string;
  fullDescription?: string;
  challenge?: string;
  solution?: string;
  results?: any;
  content?: any;
}) {
  const existing = await getPrismaClient().projectTranslation.findUnique({
    where: { projectId_locale: { projectId, locale } },
  });

  if (existing) {
    return getPrismaClient().projectTranslation.update({
      where: { id: existing.id },
      data,
    });
  }

  return getPrismaClient().projectTranslation.create({
    data: { projectId, locale, ...data },
  });
}

export async function deleteProjectTranslation(projectId: string, locale: string) {
  return getPrismaClient().projectTranslation.delete({
    where: { projectId_locale: { projectId, locale } },
  });
}

// ==================== REPORT QUERIES ====================

export async function getReportRecords(
  filters: { type?: string } = {},
  pagination: PaginationParams = {}
) {
  const { page = 1, limit = 20, sortOrder = 'desc' } = pagination;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};
  if (filters.type) where.type = filters.type;

  const [data, total] = await Promise.all([
    getPrismaClient().reportRecord.findMany({
      where,
      orderBy: { createdAt: sortOrder },
      skip,
      take: limit,
    }),
    getPrismaClient().reportRecord.count({ where }),
  ]);

  return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function createReportRecord(data: {
  name: string;
  type: string;
  format?: string;
  status?: string;
  fileUrl?: string;
  dateRangeStart?: Date;
  dateRangeEnd?: Date;
  generatedBy?: string;
}) {
  return getPrismaClient().reportRecord.create({ data });
}

export async function getScheduledReports() {
  return getPrismaClient().scheduledReport.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function createScheduledReport(data: {
  name: string;
  type: string;
  frequency: string;
  nextRunAt?: Date;
  status?: string;
}) {
  return getPrismaClient().scheduledReport.create({ data });
}

export async function updateScheduledReport(id: string, data: {
  name?: string;
  type?: string;
  frequency?: string;
  nextRunAt?: Date;
  status?: string;
}) {
  return getPrismaClient().scheduledReport.update({ where: { id }, data });
}

// ==================== SECURITY QUERIES ====================

export async function getSecurityEvents(days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return getPrismaClient().analyticsEvent.findMany({
    where: {
      eventType: { in: ['security_alert', 'failed_login', 'blocked_ip'] },
      createdAt: { gte: startDate },
    },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
}

export async function getSecuritySummary() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [threatsToday, totalBlocked, checklist] = await Promise.all([
    getPrismaClient().analyticsEvent.count({
      where: {
        eventType: { in: ['security_alert', 'failed_login', 'blocked_ip'] },
        createdAt: { gte: todayStart },
      },
    }),
    getPrismaClient().analyticsEvent.count({
      where: {
        eventType: { in: ['security_alert', 'failed_login', 'blocked_ip'] },
        createdAt: { gte: thirtyDaysAgo },
      },
    }),
    getPrismaClient().setting.findUnique({ where: { key: 'security_checklist' } }),
  ]);

  // Calculate security score from checklist
  let securityScore = 100;
  if (checklist?.value) {
    const items = checklist.value as Array<{ name: string; status: boolean }>;
    const passedCount = items.filter(i => i.status).length;
    securityScore = items.length > 0 ? Math.round((passedCount / items.length) * 100) : 100;
  }

  return {
    securityScore,
    threatsToday,
    totalBlocked,
    sslActive: true,
  };
}

export async function getBlockedIPs() {
  const setting = await getPrismaClient().setting.findUnique({ where: { key: 'blocked_ips' } });
  return (setting?.value as Array<{ ip: string; reason: string; blockedAt: string; attempts: number }>) || [];
}

export async function addBlockedIP(ip: string, reason: string) {
  const current = await getBlockedIPs();
  const updated = [...current, { ip, reason, blockedAt: new Date().toISOString(), attempts: 1 }];
  await upsertSetting('blocked_ips', updated, 'security');
  return updated;
}

export async function removeBlockedIP(ip: string) {
  const current = await getBlockedIPs();
  const updated = current.filter(item => item.ip !== ip);
  await upsertSetting('blocked_ips', updated, 'security');
  return updated;
}

export async function getSecurityChecklist() {
  const setting = await getPrismaClient().setting.findUnique({ where: { key: 'security_checklist' } });
  return (setting?.value as Array<{ name: string; status: boolean }>) || [];
}

export async function updateSecurityChecklist(items: Array<{ name: string; status: boolean }>) {
  await upsertSetting('security_checklist', items, 'security');
  return items;
}

// ==================== EXTENDED ANALYTICS QUERIES ====================

export async function getAnalyticsMetrics(days: number = 7) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const prevStartDate = new Date();
  prevStartDate.setDate(prevStartDate.getDate() - days * 2);

  const [currentPageViews, currentSessions, prevPageViews, prevSessions] = await Promise.all([
    getPrismaClient().analyticsEvent.count({
      where: { eventType: 'pageview', createdAt: { gte: startDate } },
    }),
    getPrismaClient().analyticsEvent.groupBy({
      by: ['sessionId'],
      where: { createdAt: { gte: startDate } },
    }),
    getPrismaClient().analyticsEvent.count({
      where: { eventType: 'pageview', createdAt: { gte: prevStartDate, lt: startDate } },
    }),
    getPrismaClient().analyticsEvent.groupBy({
      by: ['sessionId'],
      where: { createdAt: { gte: prevStartDate, lt: startDate } },
    }),
  ]);

  const uniqueVisitors = currentSessions.length;
  const prevUniqueVisitors = prevSessions.length;
  const avgPerSession = uniqueVisitors > 0 ? (currentPageViews / uniqueVisitors).toFixed(1) : '0';

  return {
    pageViews: currentPageViews,
    pageViewsChange: prevPageViews > 0 ? Math.round(((currentPageViews - prevPageViews) / prevPageViews) * 100) : 0,
    uniqueVisitors,
    uniqueVisitorsChange: prevUniqueVisitors > 0 ? Math.round(((uniqueVisitors - prevUniqueVisitors) / prevUniqueVisitors) * 100) : 0,
    avgPerSession: parseFloat(avgPerSession),
    bounceRate: 0, // Would need more complex session analysis
  };
}

export async function getTrafficSources(days: number = 7) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const events = await getPrismaClient().analyticsEvent.groupBy({
    by: ['referrer'],
    where: { createdAt: { gte: startDate } },
    _count: true,
    orderBy: { _count: { referrer: 'desc' } },
  });

  const total = events.reduce((sum, e) => sum + e._count, 0);

  return events.map(e => ({
    source: categorizeReferrer(e.referrer),
    referrer: e.referrer || 'Direct',
    visitors: e._count,
    percentage: total > 0 ? Math.round((e._count / total) * 100) : 0,
  }));
}

function categorizeReferrer(referrer: string | null): string {
  if (!referrer) return 'Direct';
  const r = referrer.toLowerCase();
  if (r.includes('google') || r.includes('bing') || r.includes('yahoo') || r.includes('duckduckgo')) return 'Organic Search';
  if (r.includes('facebook') || r.includes('twitter') || r.includes('linkedin') || r.includes('instagram')) return 'Social Media';
  if (r.includes('mail') || r.includes('email')) return 'Email';
  return 'Referral';
}

export async function getTopPagesDetailed(days: number = 7) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const pages = await getPrismaClient().analyticsEvent.groupBy({
    by: ['page'],
    where: { eventType: 'pageview', createdAt: { gte: startDate } },
    _count: true,
    orderBy: { _count: { page: 'desc' } },
    take: 10,
  });

  // Get unique visitors per page
  const results = await Promise.all(
    pages.map(async (p) => {
      const uniqueSessions = await getPrismaClient().analyticsEvent.groupBy({
        by: ['sessionId'],
        where: { page: p.page, eventType: 'pageview', createdAt: { gte: startDate } },
      });
      return {
        page: p.page,
        views: p._count,
        unique: uniqueSessions.length,
        bounce: '0%',
      };
    })
  );

  return results;
}

// ==================== TRAFFIC QUERIES ====================

export async function getTrafficByDevice(days: number = 7) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return getPrismaClient().analyticsEvent.groupBy({
    by: ['device'],
    where: { createdAt: { gte: startDate }, device: { not: null } },
    _count: true,
    orderBy: { _count: { device: 'desc' } },
  });
}

export async function getTrafficByCountry(days: number = 7) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return getPrismaClient().analyticsEvent.groupBy({
    by: ['country'],
    where: { createdAt: { gte: startDate }, country: { not: null } },
    _count: true,
    orderBy: { _count: { country: 'desc' } },
    take: 20,
  });
}

export async function getTrafficByBrowser(days: number = 7) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return getPrismaClient().analyticsEvent.groupBy({
    by: ['browser'],
    where: { createdAt: { gte: startDate }, browser: { not: null } },
    _count: true,
    orderBy: { _count: { browser: 'desc' } },
  });
}

export async function getTrafficByReferrer(days: number = 7) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return getPrismaClient().analyticsEvent.groupBy({
    by: ['referrer'],
    where: { createdAt: { gte: startDate } },
    _count: true,
    orderBy: { _count: { referrer: 'desc' } },
    take: 20,
  });
}

export async function getActiveVisitors() {
  const fiveMinutesAgo = new Date();
  fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);

  // COUNT(DISTINCT) in SQL — the previous groupBy(sessionId) transferred one
  // row per distinct session just to count them client-side.
  const [activeSessions, activePages] = await Promise.all([
    getPrismaClient().$queryRaw<[{ count: number }]>`
      SELECT COUNT(DISTINCT "sessionId")::int AS count
      FROM "AnalyticsEvent" WHERE "createdAt" >= ${fiveMinutesAgo}`,
    getPrismaClient().analyticsEvent.groupBy({
      by: ['page'],
      where: { eventType: 'pageview', createdAt: { gte: fiveMinutesAgo } },
      _count: true,
      orderBy: { _count: { page: 'desc' } },
      take: 10,
    }),
  ]);

  return {
    activeVisitors: activeSessions[0]?.count ?? 0,
    activePages: activePages.map(p => ({ page: p.page, visitors: p._count })),
  };
}

export async function getHourlyTraffic(days: number = 1) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const events = await getPrismaClient().analyticsEvent.findMany({
    where: { eventType: 'pageview', createdAt: { gte: startDate } },
    select: { createdAt: true },
  });

  // Group by hour
  const hourly: Record<number, number> = {};
  for (let i = 0; i < 24; i++) hourly[i] = 0;
  events.forEach(e => {
    const hour = new Date(e.createdAt).getHours();
    hourly[hour]++;
  });

  return Object.entries(hourly).map(([hour, count]) => ({
    hour: parseInt(hour),
    visitors: count,
  }));
}

export async function generateReportData(type: string, dateRangeStart?: Date, dateRangeEnd?: Date) {
  const start = dateRangeStart || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const end = dateRangeEnd || new Date();

  switch (type) {
    case 'traffic': {
      const [pageViews, visitors, topPages] = await Promise.all([
        getPrismaClient().analyticsEvent.count({
          where: { eventType: 'pageview', createdAt: { gte: start, lte: end } },
        }),
        getPrismaClient().analyticsEvent.groupBy({
          by: ['sessionId'],
          where: { createdAt: { gte: start, lte: end } },
        }),
        getPageViews(Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))),
      ]);
      return { pageViews, uniqueVisitors: visitors.length, topPages };
    }
    case 'leads': {
      const [total, byStatus, bySource] = await Promise.all([
        getPrismaClient().lead.count({ where: { createdAt: { gte: start, lte: end } } }),
        getPrismaClient().lead.groupBy({
          by: ['status'],
          where: { createdAt: { gte: start, lte: end } },
          _count: true,
        }),
        getPrismaClient().lead.groupBy({
          by: ['source'],
          where: { createdAt: { gte: start, lte: end } },
          _count: true,
        }),
      ]);
      return { total, byStatus, bySource };
    }
    case 'users': {
      const users = await getAdminUsers();
      return { totalUsers: users.length, users };
    }
    default:
      return { message: 'Unknown report type' };
  }
}

// ==================== ANALYTICS QUERIES ====================

export async function trackAnalyticsEvent(data: {
  sessionId: string;
  userId?: string;
  eventType: string;
  eventName?: string;
  page: string;
  referrer?: string;
  metadata?: Record<string, unknown>;
  device?: string;
  browser?: string;
  os?: string;
  country?: string;
  city?: string;
}) {
  // select only the id — the default create() echoes the full inserted row
  // (all 13 columns incl. metadata) back over the wire on every event, which
  // is pure wasted Neon egress for fire-and-forget tracking.
  return getPrismaClient().analyticsEvent.create({ data, select: { id: true } });
}

/** Batch insert for tracking events (heatmap click batches). One round-trip,
 *  no rows echoed back — vs. one INSERT..RETURNING per point previously. */
export async function trackAnalyticsEvents(events: Array<{
  sessionId: string;
  eventType: string;
  eventName?: string;
  page: string;
  metadata?: Record<string, string | number | boolean | null>;
  device?: string;
}>) {
  if (!events.length) return { count: 0 };
  return getPrismaClient().analyticsEvent.createMany({ data: events });
}

// ── Click heatmap ────────────────────────────────────────────────────
// Click events are stored as AnalyticsEvent rows (eventType 'click') with
// metadata { xpct, ypct, vw, tag }. No dedicated table / migration needed.

function heatmapSince(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - (Number.isFinite(days) ? days : 30));
  return d;
}

/** Pages that have recorded clicks, with counts — for the page picker. */
export async function getHeatmapPages(days = 30) {
  const rows = await getPrismaClient().analyticsEvent.groupBy({
    by: ['page'],
    where: { eventType: 'click', createdAt: { gte: heatmapSince(days) } },
    _count: { page: true },
    orderBy: { _count: { page: 'desc' } },
    take: 200,
  });
  return rows.map(r => ({ page: r.page, clicks: r._count.page }));
}

/** Raw click points for one page (optionally filtered by device). */
export async function getHeatmapPoints(page: string, days = 30, device?: string) {
  const rows = await getPrismaClient().analyticsEvent.findMany({
    where: {
      eventType: 'click',
      page,
      createdAt: { gte: heatmapSince(days) },
      ...(device && device !== 'all' ? { device } : {}),
    },
    select: { metadata: true },
    take: 5000,
    orderBy: { createdAt: 'desc' },
  });
  const points = rows
    .map(r => (r.metadata || {}) as Record<string, unknown>)
    .filter(m => typeof m.xpct === 'number' && typeof m.ypct === 'number')
    .map(m => ({ x: m.xpct as number, y: m.ypct as number, tag: (m.tag as string) || null }));
  return { page, total: points.length, points };
}

export async function getPageViews(startDate: Date | number = 30, endDate?: Date) {
  if (typeof startDate === 'number') {
    const days = startDate;
    startDate = new Date();
    (startDate as Date).setDate((startDate as Date).getDate() - days);
  }

  return getPrismaClient().analyticsEvent.groupBy({
    by: ['page'],
    where: {
      eventType: 'pageview',
      createdAt: { gte: startDate as Date, ...(endDate ? { lte: endDate } : {}) },
    },
    _count: true,
    orderBy: { _count: { page: 'desc' } },
    take: 10,
  });
}

/** True total pageview count in a window (getPageViews returns only the top
 *  10 pages, so its length is NOT the total). */
export async function getPageViewCount(startDate: Date | number = 30, endDate?: Date) {
  if (typeof startDate === 'number') {
    const days = startDate;
    startDate = new Date();
    (startDate as Date).setDate((startDate as Date).getDate() - days);
  }
  return getPrismaClient().analyticsEvent.count({
    where: {
      eventType: 'pageview',
      createdAt: { gte: startDate as Date, ...(endDate ? { lte: endDate } : {}) },
    },
  });
}

export async function getVisitorStats(startDate: Date | number = 30, endDate?: Date) {
  if (typeof startDate === 'number') {
    const days = startDate;
    startDate = new Date();
    (startDate as Date).setDate((startDate as Date).getDate() - days);
  }

  // COUNT(DISTINCT) in SQL — the previous groupBy(sessionId) over a 30-day
  // window transferred thousands of rows per call just to count them.
  const [uniqueVisitors, totalPageViews, topReferrers] = await Promise.all([
    getPrismaClient().$queryRaw<[{ count: number }]>`
      SELECT COUNT(DISTINCT "sessionId")::int AS count
      FROM "AnalyticsEvent" WHERE "createdAt" >= ${startDate as Date}`,
    getPrismaClient().analyticsEvent.count({
      where: { eventType: 'pageview', createdAt: { gte: startDate } },
    }),
    getPrismaClient().analyticsEvent.groupBy({
      by: ['referrer'],
      where: {
        referrer: { not: null },
        createdAt: { gte: startDate },
      },
      _count: true,
      orderBy: { _count: { referrer: 'desc' } },
      take: 5,
    }),
  ]);

  return {
    uniqueVisitors: uniqueVisitors[0]?.count ?? 0,
    totalPageViews,
    topReferrers: topReferrers.map((r) => ({
      referrer: r.referrer,
      count: r._count,
    })),
  };
}
