#!/bin/bash

echo "🔍 Checking Admin Panel Structure..."
echo "=================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
total=0
missing=0
present=0

# Function to check file/directory
check_path() {
    local path=$1
    local type=$2
    total=$((total + 1))
    
    if [ -e "$path" ]; then
        echo -e "${GREEN}✓${NC} $path"
        present=$((present + 1))
    else
        echo -e "${RED}✗${NC} $path ${YELLOW}(MISSING)${NC}"
        missing=$((missing + 1))
    fi
}

echo "📁 Checking Admin Pages..."
echo "-------------------------"
check_path "src/app/admin/layout.tsx" "file"
check_path "src/app/admin/page.tsx" "file"
check_path "src/app/admin/dashboard/page.tsx" "file"

# Analytics
check_path "src/app/admin/analytics/page.tsx" "file"
check_path "src/app/admin/analytics/overview/page.tsx" "file"
check_path "src/app/admin/analytics/realtime/page.tsx" "file"
check_path "src/app/admin/analytics/sources/page.tsx" "file"
check_path "src/app/admin/analytics/campaigns/page.tsx" "file"

# Conversions
check_path "src/app/admin/conversions/page.tsx" "file"
check_path "src/app/admin/conversions/goals/page.tsx" "file"
check_path "src/app/admin/conversions/funnels/page.tsx" "file"
check_path "src/app/admin/conversions/attribution/page.tsx" "file"

# Traffic
check_path "src/app/admin/traffic/page.tsx" "file"
check_path "src/app/admin/traffic/live/page.tsx" "file"
check_path "src/app/admin/traffic/geographic/page.tsx" "file"
check_path "src/app/admin/traffic/devices/page.tsx" "file"

# Users
check_path "src/app/admin/users/page.tsx" "file"
check_path "src/app/admin/users/active/page.tsx" "file"
check_path "src/app/admin/users/behavior/page.tsx" "file"
check_path "src/app/admin/users/segments/page.tsx" "file"

# Leads
check_path "src/app/admin/leads/page.tsx" "file"
check_path "src/app/admin/leads/contacts/page.tsx" "file"
check_path "src/app/admin/leads/quotes/page.tsx" "file"
check_path "src/app/admin/leads/messages/page.tsx" "file"

# Security
check_path "src/app/admin/security/page.tsx" "file"
check_path "src/app/admin/security/threats/page.tsx" "file"
check_path "src/app/admin/security/blocked/page.tsx" "file"
check_path "src/app/admin/security/logs/page.tsx" "file"

# Settings
check_path "src/app/admin/settings/page.tsx" "file"
check_path "src/app/admin/settings/general/page.tsx" "file"
check_path "src/app/admin/settings/integrations/page.tsx" "file"
check_path "src/app/admin/settings/notifications/page.tsx" "file"

# Reports
check_path "src/app/admin/reports/page.tsx" "file"
check_path "src/app/admin/reports/custom/page.tsx" "file"
check_path "src/app/admin/reports/scheduled/page.tsx" "file"
check_path "src/app/admin/reports/export/page.tsx" "file"

echo ""
echo "📊 Checking Components..."
echo "-------------------------"
# Charts
check_path "src/components/admin/charts/LineChart.tsx" "file"
check_path "src/components/admin/charts/BarChart.tsx" "file"
check_path "src/components/admin/charts/PieChart.tsx" "file"
check_path "src/components/admin/charts/AreaChart.tsx" "file"
check_path "src/components/admin/charts/HeatMap.tsx" "file"
check_path "src/components/admin/charts/GeoMap.tsx" "file"
check_path "src/components/admin/charts/RealtimeChart.tsx" "file"

# Tables
check_path "src/components/admin/tables/DataTable.tsx" "file"
check_path "src/components/admin/tables/LeadsTable.tsx" "file"
check_path "src/components/admin/tables/TrafficTable.tsx" "file"
check_path "src/components/admin/tables/ConversionsTable.tsx" "file"
check_path "src/components/admin/tables/UsersTable.tsx" "file"

# Cards
check_path "src/components/admin/cards/StatCard.tsx" "file"
check_path "src/components/admin/cards/MetricCard.tsx" "file"
check_path "src/components/admin/cards/TrendCard.tsx" "file"
check_path "src/components/admin/cards/AlertCard.tsx" "file"
check_path "src/components/admin/cards/ActivityCard.tsx" "file"

# Widgets
check_path "src/components/admin/widgets/LiveTrafficWidget.tsx" "file"
check_path "src/components/admin/widgets/ConversionRateWidget.tsx" "file"
check_path "src/components/admin/widgets/RevenueWidget.tsx" "file"
check_path "src/components/admin/widgets/VisitorsWidget.tsx" "file"
check_path "src/components/admin/widgets/LeadsWidget.tsx" "file"
check_path "src/components/admin/widgets/SecurityWidget.tsx" "file"
check_path "src/components/admin/widgets/PerformanceWidget.tsx" "file"

# Forms
check_path "src/components/admin/forms/FilterForm.tsx" "file"
check_path "src/components/admin/forms/DateRangeForm.tsx" "file"
check_path "src/components/admin/forms/ExportForm.tsx" "file"
check_path "src/components/admin/forms/SettingsForm.tsx" "file"

# Modals
check_path "src/components/admin/modals/LeadDetailsModal.tsx" "file"
check_path "src/components/admin/modals/UserDetailsModal.tsx" "file"
check_path "src/components/admin/modals/SecurityAlertModal.tsx" "file"
check_path "src/components/admin/modals/ExportModal.tsx" "file"

# Layouts
check_path "src/components/admin/layouts/AdminSidebar.tsx" "file"
check_path "src/components/admin/layouts/AdminHeader.tsx" "file"
check_path "src/components/admin/layouts/AdminFooter.tsx" "file"
check_path "src/components/admin/layouts/DashboardLayout.tsx" "file"

echo ""
echo "🔧 Checking Library Files..."
echo "----------------------------"
# Analytics
check_path "src/lib/admin/analytics/googleAnalytics.ts" "file"
check_path "src/lib/admin/analytics/facebookAnalytics.ts" "file"
check_path "src/lib/admin/analytics/linkedinAnalytics.ts" "file"
check_path "src/lib/admin/analytics/customAnalytics.ts" "file"
check_path "src/lib/admin/analytics/aggregator.ts" "file"

# Database
check_path "src/lib/admin/database/queries.ts" "file"
check_path "src/lib/admin/database/models.ts" "file"
check_path "src/lib/admin/database/migrations.ts" "file"
check_path "src/lib/admin/database/seeders.ts" "file"

# Auth
check_path "src/lib/admin/auth/adminAuth.ts" "file"
check_path "src/lib/admin/auth/middleware.ts" "file"
check_path "src/lib/admin/auth/permissions.ts" "file"
check_path "src/lib/admin/auth/roles.ts" "file"

# Realtime
check_path "src/lib/admin/realtime/websocket.ts" "file"
check_path "src/lib/admin/realtime/liveData.ts" "file"
check_path "src/lib/admin/realtime/notifications.ts" "file"
check_path "src/lib/admin/realtime/events.ts" "file"

# Export
check_path "src/lib/admin/export/csv.ts" "file"
check_path "src/lib/admin/export/pdf.ts" "file"
check_path "src/lib/admin/export/excel.ts" "file"
check_path "src/lib/admin/export/json.ts" "file"

echo ""
echo "📝 Checking Types..."
echo "--------------------"
check_path "src/types/admin/analytics.ts" "file"
check_path "src/types/admin/conversions.ts" "file"
check_path "src/types/admin/traffic.ts" "file"
check_path "src/types/admin/users.ts" "file"
check_path "src/types/admin/leads.ts" "file"
check_path "src/types/admin/security.ts" "file"
check_path "src/types/admin/reports.ts" "file"

echo ""
echo "🪝 Checking Hooks..."
echo "--------------------"
check_path "src/hooks/admin/useAnalytics.ts" "file"
check_path "src/hooks/admin/useRealtime.ts" "file"
check_path "src/hooks/admin/useConversions.ts" "file"
check_path "src/hooks/admin/useTraffic.ts" "file"
check_path "src/hooks/admin/useLeads.ts" "file"
check_path "src/hooks/admin/useSecurity.ts" "file"
check_path "src/hooks/admin/useExport.ts" "file"
check_path "src/hooks/admin/useFilters.ts" "file"

echo ""
echo "🌐 Checking Context..."
echo "----------------------"
check_path "src/context/admin/AdminContext.tsx" "file"
check_path "src/context/admin/RealtimeContext.tsx" "file"
check_path "src/context/admin/FilterContext.tsx" "file"
check_path "src/context/admin/NotificationContext.tsx" "file"

echo ""
echo "⚙️  Checking Config..."
echo "---------------------"
check_path "src/config/admin/dashboardConfig.ts" "file"
check_path "src/config/admin/metricsConfig.ts" "file"
check_path "src/config/admin/chartsConfig.ts" "file"
check_path "src/config/admin/navigationConfig.ts" "file"

echo ""
echo "🛠️  Checking Utils..."
echo "--------------------"
check_path "src/utils/admin/dateRanges.ts" "file"
check_path "src/utils/admin/formatters.ts" "file"
check_path "src/utils/admin/calculations.ts" "file"
check_path "src/utils/admin/validators.ts" "file"
check_path "src/utils/admin/helpers.ts" "file"

echo ""
echo "🎨 Checking Styles..."
echo "---------------------"
check_path "src/styles/admin/dashboard.css" "file"
check_path "src/styles/admin/charts.css" "file"
check_path "src/styles/admin/tables.css" "file"
check_path "src/styles/admin/sidebar.css" "file"

echo ""
echo "🔌 Checking API Routes..."
echo "-------------------------"
check_path "src/app/api/admin/analytics/overview/route.ts" "file"
check_path "src/app/api/admin/analytics/realtime/route.ts" "file"
check_path "src/app/api/admin/analytics/sources/route.ts" "file"
check_path "src/app/api/admin/analytics/pageviews/route.ts" "file"
check_path "src/app/api/admin/conversions/goals/route.ts" "file"
check_path "src/app/api/admin/conversions/funnels/route.ts" "file"
check_path "src/app/api/admin/conversions/events/route.ts" "file"
check_path "src/app/api/admin/traffic/live/route.ts" "file"
check_path "src/app/api/admin/traffic/geographic/route.ts" "file"
check_path "src/app/api/admin/traffic/devices/route.ts" "file"
check_path "src/app/api/admin/traffic/sources/route.ts" "file"
check_path "src/app/api/admin/users/active/route.ts" "file"
check_path "src/app/api/admin/users/sessions/route.ts" "file"
check_path "src/app/api/admin/users/behavior/route.ts" "file"
check_path "src/app/api/admin/leads/contacts/route.ts" "file"
check_path "src/app/api/admin/leads/quotes/route.ts" "file"
check_path "src/app/api/admin/leads/messages/route.ts" "file"
check_path "src/app/api/admin/leads/[id]/route.ts" "file"
check_path "src/app/api/admin/security/threats/route.ts" "file"
check_path "src/app/api/admin/security/blocked/route.ts" "file"
check_path "src/app/api/admin/security/logs/route.ts" "file"
check_path "src/app/api/admin/security/summary/route.ts" "file"
check_path "src/app/api/admin/reports/generate/route.ts" "file"
check_path "src/app/api/admin/reports/export/route.ts" "file"
check_path "src/app/api/admin/reports/schedule/route.ts" "file"

echo ""
echo "🆕 Checking Additional Features..."
echo "----------------------------------"
# Content
check_path "src/app/admin/content/page.tsx" "file"
check_path "src/app/admin/content/pages/page.tsx" "file"
check_path "src/app/admin/content/translations/page.tsx" "file"
check_path "src/app/admin/content/media/page.tsx" "file"
check_path "src/app/admin/content/seo/page.tsx" "file"

# Translations
check_path "src/app/admin/translations/page.tsx" "file"
check_path "src/app/admin/translations/manage/page.tsx" "file"
check_path "src/app/admin/translations/missing/page.tsx" "file"
check_path "src/app/admin/translations/export/page.tsx" "file"
check_path "src/app/admin/translations/import/page.tsx" "file"

# Experiments
check_path "src/app/admin/experiments/page.tsx" "file"
check_path "src/app/admin/experiments/tests/page.tsx" "file"
check_path "src/app/admin/experiments/variants/page.tsx" "file"
check_path "src/app/admin/experiments/results/page.tsx" "file"

# Marketing
check_path "src/app/admin/marketing/page.tsx" "file"
check_path "src/app/admin/marketing/campaigns/page.tsx" "file"
check_path "src/app/admin/marketing/emails/page.tsx" "file"
check_path "src/app/admin/marketing/automation/page.tsx" "file"
check_path "src/app/admin/marketing/subscribers/page.tsx" "file"

# Performance
check_path "src/app/admin/performance/page.tsx" "file"
check_path "src/app/admin/performance/speed/page.tsx" "file"
check_path "src/app/admin/performance/lighthouse/page.tsx" "file"
check_path "src/app/admin/performance/errors/page.tsx" "file"
check_path "src/app/admin/performance/uptime/page.tsx" "file"

# SEO
check_path "src/app/admin/seo/page.tsx" "file"
check_path "src/app/admin/seo/keywords/page.tsx" "file"
check_path "src/app/admin/seo/rankings/page.tsx" "file"
check_path "src/app/admin/seo/backlinks/page.tsx" "file"
check_path "src/app/admin/seo/sitemap/page.tsx" "file"

# CRM
check_path "src/app/admin/crm/page.tsx" "file"
check_path "src/app/admin/crm/contacts/page.tsx" "file"
check_path "src/app/admin/crm/deals/page.tsx" "file"
check_path "src/app/admin/crm/pipeline/page.tsx" "file"
check_path "src/app/admin/crm/tasks/page.tsx" "file"

# Projects
check_path "src/app/admin/projects/page.tsx" "file"
check_path "src/app/admin/projects/active/page.tsx" "file"
check_path "src/app/admin/projects/archive/page.tsx" "file"
check_path "src/app/admin/projects/tasks/page.tsx" "file"
check_path "src/app/admin/projects/timeline/page.tsx" "file"

# Additional features (sampling - add more as needed)
check_path "src/app/admin/team/page.tsx" "file"
check_path "src/app/admin/social/page.tsx" "file"
check_path "src/app/admin/billing/page.tsx" "file"
check_path "src/app/admin/backup/page.tsx" "file"
check_path "src/app/admin/ai/page.tsx" "file"
check_path "src/app/admin/forms/page.tsx" "file"
check_path "src/app/admin/blog/page.tsx" "file"
check_path "src/app/admin/reviews/page.tsx" "file"

echo ""
echo "=================================="
echo "📈 SUMMARY"
echo "=================================="
echo -e "Total files checked: ${YELLOW}$total${NC}"
echo -e "Files present: ${GREEN}$present${NC}"
echo -e "Files missing: ${RED}$missing${NC}"
echo ""

if [ $missing -eq 0 ]; then
    echo -e "${GREEN}✅ All files and folders are created successfully!${NC}"
else
    echo -e "${RED}❌ $missing files are missing. Please create them.${NC}"
fi