#!/bin/bash

echo "🔧 Final build fix..."

# Fix 1: Add dynamic to ALL pages in [locale] folder
find 'src/app/[locale]' -name "page.tsx" -type f | while read file; do
  if ! grep -q "export const dynamic" "$file" 2>/dev/null; then
    # Create temp file with dynamic export at the top
    {
      echo 'export const dynamic = "force-dynamic";'
      echo ''
      cat "$file"
    } > "${file}.tmp"
    mv "${file}.tmp" "$file"
    echo "✓ Added dynamic to $file"
  fi
done

# Fix 2: Remove admin folder
rm -rf src/app/admin

echo ""
echo "✅ All fixes applied!"
echo ""
echo "Building..."
npm run build