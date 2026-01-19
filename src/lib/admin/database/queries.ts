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
  return getPrismaClient().analyticsEvent.create({ data });
}

export async function getPageViews(days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return getPrismaClient().analyticsEvent.groupBy({
    by: ['page'],
    where: {
      eventType: 'pageview',
      createdAt: { gte: startDate },
    },
    _count: true,
    orderBy: { _count: { page: 'desc' } },
    take: 10,
  });
}

export async function getVisitorStats(days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const [uniqueVisitors, totalPageViews, topReferrers] = await Promise.all([
    getPrismaClient().analyticsEvent.groupBy({
      by: ['sessionId'],
      where: { createdAt: { gte: startDate } },
    }),
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
    uniqueVisitors: uniqueVisitors.length,
    totalPageViews,
    topReferrers: topReferrers.map((r) => ({
      referrer: r.referrer,
      count: r._count,
    })),
  };
}
