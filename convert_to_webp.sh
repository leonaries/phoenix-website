#!/bin/bash
cd /Users/leon/Desktop/phoenix/phoenix_website/public/frames/last_webp_frames

for num in {0..227}; do
    input="cy$(printf "%03d" $num).png"
    output="../last_webp_frames_webp/cy$(printf "%03d" $num).webp"
    echo "Converting $input..."
    cwebp -q 90 "$input" -o "$output" 2>&1 | grep "^Saving"
done

echo "Conversion complete!"
