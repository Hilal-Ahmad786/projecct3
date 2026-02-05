import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

const SUPPORTED_LOCALES = ['tr', 'de', 'ur', 'ar'];

// GET /api/admin/content/services/translations-status
// Returns translation status for all services
export async function GET(request: NextRequest) {
  try {
    const prisma = getPrisma();

    // Get all services with their translations
    const services = await prisma.service.findMany({
      where: { status: { in: ['published', 'active'] } },
      select: {
        id: true,
        name: true,
        slug: true,
        translations: {
          select: {
            locale: true,
            name: true,
          },
        },
      },
      orderBy: { order: 'asc' },
    });

    // Build status report
    const report = services.map((service) => {
      const translatedLocales = service.translations.map((t) => t.locale);
      const missingLocales = SUPPORTED_LOCALES.filter(
        (locale) => !translatedLocales.includes(locale)
      );

      return {
        id: service.id,
        name: service.name,
        slug: service.slug,
        translatedLocales,
        missingLocales,
        isFullyTranslated: missingLocales.length === 0,
        completionPercentage: Math.round(
          (translatedLocales.length / SUPPORTED_LOCALES.length) * 100
        ),
      };
    });

    // Summary statistics
    const summary = {
      totalServices: services.length,
      fullyTranslated: report.filter((r) => r.isFullyTranslated).length,
      partiallyTranslated: report.filter(
        (r) => r.translatedLocales.length > 0 && !r.isFullyTranslated
      ).length,
      notTranslated: report.filter((r) => r.translatedLocales.length === 0)
        .length,
      localeBreakdown: SUPPORTED_LOCALES.reduce(
        (acc, locale) => {
          acc[locale] = report.filter((r) =>
            r.translatedLocales.includes(locale)
          ).length;
          return acc;
        },
        {} as Record<string, number>
      ),
    };

    return NextResponse.json({
      success: true,
      data: {
        summary,
        services: report,
      },
    });
  } catch (error) {
    console.error('Error fetching translation status:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch translation status' },
      { status: 500 }
    );
  }
}

// POST /api/admin/content/services/translations-status
// Bulk copy English content to missing translations
export async function POST(request: NextRequest) {
  try {
    const prisma = getPrisma();
    const body = await request.json();
    const { serviceIds, locales } = body;

    // Validate input
    if (!serviceIds || !Array.isArray(serviceIds) || serviceIds.length === 0) {
      return NextResponse.json(
        { success: false, message: 'serviceIds array is required' },
        { status: 400 }
      );
    }

    const targetLocales = locales || SUPPORTED_LOCALES;

    // Get services with their current data
    const services = await prisma.service.findMany({
      where: { id: { in: serviceIds } },
      include: { translations: true },
    });

    const results: Array<{
      serviceId: string;
      serviceName: string;
      created: string[];
      skipped: string[];
    }> = [];

    for (const service of services) {
      const existingLocales = service.translations.map((t) => t.locale);
      const created: string[] = [];
      const skipped: string[] = [];

      for (const locale of targetLocales) {
        if (existingLocales.includes(locale)) {
          skipped.push(locale);
          continue;
        }

        // Create translation with English content as placeholder
        await prisma.serviceTranslation.create({
          data: {
            serviceId: service.id,
            locale,
            name: service.name, // Copy English name
            shortDescription: service.shortDescription,
            fullDescription: service.fullDescription,
            features: service.features || [],
            benefits: service.benefits || [],
            content: service.content as any,
            metaTitle: service.metaTitle,
            metaDescription: service.metaDescription,
          },
        });
        created.push(locale);
      }

      results.push({
        serviceId: service.id,
        serviceName: service.name,
        created,
        skipped,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Translations initialized successfully',
      data: results,
    });
  } catch (error) {
    console.error('Error initializing translations:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to initialize translations' },
      { status: 500 }
    );
  }
}
