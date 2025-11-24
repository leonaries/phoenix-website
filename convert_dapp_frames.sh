#!/bin/bash

# Convert PNG frames to WebP for iOS Safari mobile compatibility
# Directory: public/frames/last_webp_dapp_frames
# Naming: xh_000.png -> xh_000.webp

SOURCE_DIR="/Users/leon/Desktop/phoenix/phoenix_website/public/frames/last_webp_dapp_frames"
cd "$SOURCE_DIR" || exit 1

echo "Starting PNG to WebP conversion..."
echo "Source directory: $SOURCE_DIR"
echo "Total PNG files: $(ls xh_*.png 2>/dev/null | wc -l)"
echo ""

converted=0
skipped=0

for png_file in xh_*.png; do
  if [ ! -f "$png_file" ]; then
    echo "No PNG files found"
    exit 1
  fi

  webp_file="${png_file%.png}.webp"

  if [ -f "$webp_file" ]; then
    echo "✓ Skipping $png_file (WebP already exists)"
    skipped=$((skipped + 1))
  else
    echo "→ Converting $png_file to $webp_file..."
    cwebp -q 85 -m 6 "$png_file" -o "$webp_file" 2>&1 | grep -E "(Saving|error)"

    if [ -f "$webp_file" ]; then
      original_size=$(stat -f%z "$png_file" 2>/dev/null || stat -c%s "$png_file")
      webp_size=$(stat -f%z "$webp_file" 2>/dev/null || stat -c%s "$webp_file")

      original_mb=$(awk "BEGIN {printf \"%.2f\", $original_size/1024/1024}")
      webp_mb=$(awk "BEGIN {printf \"%.2f\", $webp_size/1024/1024}")
      savings=$(awk "BEGIN {printf \"%.1f\", (1-$webp_size/$original_size)*100}")

      echo "  ✓ Success: $original_mb MB → $webp_mb MB (saved $savings%)"
      converted=$((converted + 1))
    else
      echo "  ✗ Failed to convert $png_file"
    fi
  fi
done

echo ""
echo "======================================"
echo "Conversion Summary:"
echo "  Converted: $converted files"
echo "  Skipped: $skipped files"
echo "======================================"

# Calculate total savings
if [ $converted -gt 0 ]; then
  total_png_size=$(du -sh . | awk '{print $1}')
  echo "Total directory size: $total_png_size"
fi
