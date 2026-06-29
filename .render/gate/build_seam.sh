#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

# ── THE EPIC REVEAL: a century washing through one still gate ──────────────
# Not Ken Burns. The frame holds dead still. TIME moves: 1916 sepia develops
# through the frame like a photo blooming in developer, holds, then burns off
# as present dusk reclaims it. Depth + grain + light burn. Rendered to MP4.
#
# Plates (real, on-site):
#   then.jpg  = 1916 sepia gate (2400x1800)
#   now.jpg   = present dusk gate (2400x1610)

W=2400; H=1350          # 16:9 master crop
FPS=30
DUR=9                   # 9s seam film
TOTAL=$((FPS*DUR))

# normalize both plates to identical 16:9 frame (cover-crop, no stretch)
ffmpeg -y -loglevel error -i now.jpg  -vf "scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H}" now_c.png
ffmpeg -y -loglevel error -i then.jpg -vf "scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H}" then_c.png

# the "now" plate graded for dusk (cool, deep), the "then" plate as aged sepia
ffmpeg -y -loglevel error -i now_c.png  -vf "eq=contrast=1.06:saturation=1.02:brightness=-0.01" now_grade.png
ffmpeg -y -loglevel error -i then_c.png -vf "format=gray,eq=contrast=1.04:brightness=0.02,colorbalance=rs=0.18:gs=0.06:bs=-0.20:rm=0.12:gm=0.04:bm=-0.16" then_sepia.png

echo "plates graded:"
ls -la now_grade.png then_sepia.png
