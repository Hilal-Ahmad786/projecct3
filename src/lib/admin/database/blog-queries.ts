import { getPrisma } from '@/lib/db/prisma';

// Type definitions
type BlogStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

// Pagination types
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

// Blog Post Filters
export interface BlogPostFilters {
  status?: BlogStatus;
  category?: string;
  featured?: boolean;
  search?: string;
  tag?: string;
  locale?: string;
}

// Get prisma instance
const getPrismaClient = () => getPrisma();

// ==================== BLOG POST QUERIES ====================

export async function getBlogPosts(
  filters: BlogPostFilters = {},
  pagination: PaginationParams = {}
) {
  const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
  const skip = (page - 1) * limit;

  const where = buildBlogWhereClause(filters);

  const [posts, total] = await Promise.all([
    getPrismaClient().blogPost.findMany({
      where,
      include: {
        translations: true,
      },
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: limit,
    }),
    getPrismaClient().blogPost.count({ where }),
  ]);

  return {
    data: posts,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getBlogPostBySlug(slug: string, locale?: string) {
  const post = await getPrismaClient().blogPost.findUnique({
    where: { slug },
    include: {
      translations: locale ? {
        where: { locale }
      } : true,
    },
  });

  return post;
}

export async function getBlogPostById(id: string) {
  return getPrismaClient().blogPost.findUnique({
    where: { id },
    include: {
      translations: true,
    },
  });
}

export async function createBlogPost(data: {
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  category?: string;
  tags?: string[];
  status?: BlogStatus;
  featured?: boolean;
  publishedAt?: Date;
  authorId?: string;
}) {
  // Auto-publish date if status is PUBLISHED
  const publishedAt = data.status === 'PUBLISHED' && !data.publishedAt
    ? new Date()
    : data.publishedAt;

  return getPrismaClient().blogPost.create({
    data: {
      ...data,
      publishedAt,
    },
    include: {
      translations: true,
    },
  });
}

export async function updateBlogPost(
  id: string,
  data: {
    slug?: string;
    title?: string;
    excerpt?: string;
    content?: string;
    featuredImage?: string;
    metaTitle?: string;
    metaDescription?: string;
    category?: string;
    tags?: string[];
    status?: BlogStatus;
    featured?: boolean;
    publishedAt?: Date;
  }
) {
  // Auto-publish date if changing to PUBLISHED
  let publishedAt = data.publishedAt;
  if (data.status === 'PUBLISHED') {
    const currentPost = await getPrismaClient().blogPost.findUnique({ where: { id } });
    if (currentPost && currentPost.status !== 'PUBLISHED' && !data.publishedAt) {
      publishedAt = new Date();
    }
  }

  return getPrismaClient().blogPost.update({
    where: { id },
    data: {
      ...data,
      publishedAt,
    },
    include: {
      translations: true,
    },
  });
}

export async function deleteBlogPost(id: string) {
  return getPrismaClient().blogPost.delete({ where: { id } });
}

// ==================== BLOG TRANSLATION QUERIES ====================

export async function createBlogTranslation(data: {
  postId: string;
  locale: string;
  title: string;
  excerpt?: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
}) {
  return getPrismaClient().blogTranslation.create({
    data,
  });
}

export async function updateBlogTranslation(
  postId: string,
  locale: string,
  data: {
    title?: string;
    excerpt?: string;
    content?: string;
    metaTitle?: string;
    metaDescription?: string;
  }
) {
  return getPrismaClient().blogTranslation.upsert({
    where: {
      postId_locale: { postId, locale }
    },
    update: data,
    create: {
      postId,
      locale,
      title: data.title || '',
      content: data.content || '',
      excerpt: data.excerpt,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
    },
  });
}

export async function deleteBlogTranslation(postId: string, locale: string) {
  return getPrismaClient().blogTranslation.delete({
    where: {
      postId_locale: { postId, locale }
    },
  });
}

// ==================== BLOG CATEGORY QUERIES ====================

export async function getBlogCategories() {
  return getPrismaClient().blogCategory.findMany({
    orderBy: { name: 'asc' },
  });
}

export async function createBlogCategory(data: {
  slug: string;
  name: string;
  description?: string;
  nameTranslations?: Record<string, string>;
}) {
  return getPrismaClient().blogCategory.create({ data });
}

export async function updateBlogCategory(
  id: string,
  data: {
    slug?: string;
    name?: string;
    description?: string;
    nameTranslations?: Record<string, string>;
  }
) {
  return getPrismaClient().blogCategory.update({
    where: { id },
    data,
  });
}

export async function deleteBlogCategory(id: string) {
  return getPrismaClient().blogCategory.delete({ where: { id } });
}

// ==================== HELPER FUNCTIONS ====================

function buildBlogWhereClause(filters: BlogPostFilters) {
  const where: Record<string, unknown> = {};

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.category) {
    where.category = filters.category;
  }

  if (filters.featured !== undefined) {
    where.featured = filters.featured;
  }

  if (filters.tag) {
    where.tags = { has: filters.tag };
  }

  if (filters.search) {
    where.OR = [
      { title: { contains: filters.search, mode: 'insensitive' } },
      { excerpt: { contains: filters.search, mode: 'insensitive' } },
      { content: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  return where;
}

// Get published posts for public blog
export async function getPublishedBlogPosts(
  locale: string = 'en',
  pagination: PaginationParams = {}
) {
  const { page = 1, limit = 10 } = pagination;
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    getPrismaClient().blogPost.findMany({
      where: {
        status: 'PUBLISHED',
        publishedAt: { lte: new Date() },
      },
      include: {
        translations: {
          where: { locale }
        },
      },
      orderBy: { publishedAt: 'desc' },
      skip,
      take: limit,
    }),
    getPrismaClient().blogPost.count({
      where: {
        status: 'PUBLISHED',
        publishedAt: { lte: new Date() },
      },
    }),
  ]);

  return {
    data: posts,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

// Get blog stats for admin dashboard
export async function getBlogStats() {
  const [total, published, drafts, featured] = await Promise.all([
    getPrismaClient().blogPost.count(),
    getPrismaClient().blogPost.count({ where: { status: 'PUBLISHED' } }),
    getPrismaClient().blogPost.count({ where: { status: 'DRAFT' } }),
    getPrismaClient().blogPost.count({ where: { featured: true } }),
  ]);

  return {
    total,
    published,
    drafts,
    featured,
  };
}
