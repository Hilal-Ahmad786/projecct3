#!/bin/bash

# Function to create placeholder page
create_placeholder() {
    local file_path=$1
    local page_name=$2
    
    cat > "$file_path" << 'EOPAGE'
export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">TITLE_PLACEHOLDER</h1>
        <p className="text-gray-600">This page is under development.</p>
      </div>
    </div>
  );
}
EOPAGE
    
    # Replace placeholder with actual title
    sed -i.bak "s/TITLE_PLACEHOLDER/$page_name/" "$file_path"
    rm "${file_path}.bak" 2>/dev/null || true
}

# Admin main pages
create_placeholder "src/app/admin/page.tsx" "Admin Dashboard"
create_placeholder "src/app/admin/dashboard/page.tsx" "Dashboard"

# Analytics
create_placeholder "src/app/admin/analytics/page.tsx" "Analytics"
create_placeholder "src/app/admin/analytics/overview/page.tsx" "Analytics Overview"
create_placeholder "src/app/admin/analytics/realtime/page.tsx" "Real-time Analytics"
create_placeholder "src/app/admin/analytics/sources/page.tsx" "Traffic Sources"
create_placeholder "src/app/admin/analytics/campaigns/page.tsx" "Campaigns"

# Conversions
create_placeholder "src/app/admin/conversions/page.tsx" "Conversions"
create_placeholder "src/app/admin/conversions/goals/page.tsx" "Goals"
create_placeholder "src/app/admin/conversions/funnels/page.tsx" "Funnels"
create_placeholder "src/app/admin/conversions/attribution/page.tsx" "Attribution"

# Traffic
create_placeholder "src/app/admin/traffic/page.tsx" "Traffic"
create_placeholder "src/app/admin/traffic/live/page.tsx" "Live Traffic"
create_placeholder "src/app/admin/traffic/geographic/page.tsx" "Geographic"
create_placeholder "src/app/admin/traffic/devices/page.tsx" "Devices"

# Users
create_placeholder "src/app/admin/users/page.tsx" "Users"
create_placeholder "src/app/admin/users/active/page.tsx" "Active Users"
create_placeholder "src/app/admin/users/behavior/page.tsx" "User Behavior"
create_placeholder "src/app/admin/users/segments/page.tsx" "User Segments"

# Leads
create_placeholder "src/app/admin/leads/page.tsx" "Leads"
create_placeholder "src/app/admin/leads/contacts/page.tsx" "Contacts"
create_placeholder "src/app/admin/leads/quotes/page.tsx" "Quotes"
create_placeholder "src/app/admin/leads/messages/page.tsx" "Messages"

# Security
create_placeholder "src/app/admin/security/page.tsx" "Security"
create_placeholder "src/app/admin/security/threats/page.tsx" "Threats"
create_placeholder "src/app/admin/security/blocked/page.tsx" "Blocked IPs"
create_placeholder "src/app/admin/security/logs/page.tsx" "Security Logs"

# Settings
create_placeholder "src/app/admin/settings/page.tsx" "Settings"
create_placeholder "src/app/admin/settings/general/page.tsx" "General Settings"
create_placeholder "src/app/admin/settings/integrations/page.tsx" "Integrations"
create_placeholder "src/app/admin/settings/notifications/page.tsx" "Notifications"

# Reports
create_placeholder "src/app/admin/reports/page.tsx" "Reports"
create_placeholder "src/app/admin/reports/custom/page.tsx" "Custom Reports"
create_placeholder "src/app/admin/reports/scheduled/page.tsx" "Scheduled Reports"
create_placeholder "src/app/admin/reports/export/page.tsx" "Export Data"

# Additional features
for page in content translations experiments marketing performance seo competitors social crm projects team notifications billing backup ai api webhooks forms blog reviews audit; do
    create_placeholder "src/app/admin/$page/page.tsx" "$(echo $page | sed 's/.*/\u&/')"
done

echo "✅ All placeholder pages created!"
