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
  scheduledAt?: Date;
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
    scheduledAt?: Date | null;
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
  pagination: PaginationParams = {},
  category?: string,
  excludeCategories?: string[]
) {
  const { page = 1, limit = 10 } = pagination;
  const skip = (page - 1) * limit;

  // Category partitions the publication: 'general' = company-wide blog,
  // a service slug = that service's own blog. Omit to fetch across all.
  // excludeCategories lets the company blog show every post EXCEPT the
  // per-service ones (posts are seeded with topical categories like 'ai'
  // or 'marketing', so an exact category='general' match returns nothing).
  //
  // Language filter: posts are single-language rows (BlogPost.language), so a
  // locale's listing must only surface posts written in that language or
  // carrying a translation for it — without this, Arabic posts appeared on
  // the Turkish blog (and everywhere else).
  const where = {
    status: 'PUBLISHED' as BlogStatus,
    publishedAt: { lte: new Date() },
    ...(category ? { category } : {}),
    ...(excludeCategories?.length ? { category: { notIn: excludeCategories } } : {}),
    OR: [
      { language: locale },
      { translations: { some: { locale } } },
    ],
  };

  const [posts, total] = await Promise.all([
    getPrismaClient().blogPost.findMany({
      where,
      include: {
        translations: {
          where: { locale }
        },
      },
      orderBy: { publishedAt: 'desc' },
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

// Duplicate a blog post with translations
export async function duplicateBlogPost(id: string) {
  const prisma = getPrismaClient();
  const original = await prisma.blogPost.findUnique({
    where: { id },
    include: { translations: true },
  });
  if (!original) throw new Error('Blog post not found');

  const newSlug = `${original.slug}-copy-${Date.now().toString(36)}`;

  const newPost = await prisma.blogPost.create({
    data: {
      slug: newSlug,
      title: `${original.title} (Copy)`,
      excerpt: original.excerpt,
      content: original.content,
      featuredImage: original.featuredImage,
      metaTitle: original.metaTitle,
      metaDescription: original.metaDescription,
      category: original.category,
      tags: original.tags,
      status: 'DRAFT',
      featured: false,
    },
    include: { translations: true },
  });

  // Copy translations
  for (const t of original.translations) {
    await prisma.blogTranslation.create({
      data: {
        postId: newPost.id,
        locale: t.locale,
        title: t.title,
        excerpt: t.excerpt,
        content: t.content,
        metaTitle: t.metaTitle,
        metaDescription: t.metaDescription,
      },
    });
  }

  return prisma.blogPost.findUnique({
    where: { id: newPost.id },
    include: { translations: true },
  });
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
