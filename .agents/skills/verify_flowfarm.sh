#!/bin/bash
# Pre-push verification for Flow Farm landing page
# ALL locked values must pass -- push is blocked if any fail

FILE="${1:-/app/.agents/FlowFarmLanding2_MASTER.jsx}"
ERRORS=0

check() {
  local label="$1"
  local pattern="$2"
  if grep -qF "$pattern" "$FILE"; then
    echo "  OK    $label"
  else
    echo "  FAIL  $label"
    ERRORS=$((ERRORS + 1))
  fi
}

check_absent() {
  local label="$1"
  local pattern="$2"
  if grep -qF "$pattern" "$FILE"; then
    echo "  FAIL  $label (should NOT be present)"
    ERRORS=$((ERRORS + 1))
  else
    echo "  OK    $label"
  fi
}

echo ""
echo "=== FLOW FARM PRE-PUSH VERIFICATION ==="
echo "File: $FILE"
echo "Time: $(date)"
echo ""

echo "--- LOCKED COPY ---"
check "Subhead locked"           "The farm unlocks everything. Three miles from Pinehurst."
check "Headline: Agritourism"    "Agritourism"
check "Headline: Legacy Ready"   "Legacy Ready."
check "Address: 107 Linden"      "107 Linden Trail"
check "Address: Pinehurst ETJ"   "Pinehurst ETJ"
check "Stats: 15 USDA ACRES"     "15 USDA ACRES"
check "Stats: price 5.25"        "5.25,"
check "CTA: Enter Flow Farm"     "Enter Flow Farm"

echo ""
echo "--- LOCKED VIDEO IDs ---"
check "Hero bg video ID present"   "VIDEO_BG_ID = '5d06a3b0e25b768ac6dc681dbf4f5b81'"
check "Tour video ID present"      "VIDEO_TOUR_ID = 'de1885d159ae310508174f03f775c797'"
check "CF_STREAM const present"    "CF_STREAM = 'https://customer-qqzxuq43g9w49ny2.cloudflarestream.com'"

echo ""
echo "--- VIDEO PLAYER SAFETY ---"
check_absent "No raw m3u8 in <video> tag"  "<source src"
check_absent "No Vimeo URLs"               "vimeo.com"
check_absent "No Base44 video hosting"     "base44.app/api/apps"

echo ""
echo "--- BUILD SAFETY ---"
# Non-ASCII check
NON_ASCII=$(python3 -c "
content = open('$FILE').read()
bad = [(i, c) for i, c in enumerate(content) if ord(c) > 127]
if bad:
    for i, c in bad[:3]:
        print(f'pos {i}: {repr(c)}')
    exit(1)
" 2>&1)
if [ $? -eq 0 ]; then
  echo "  OK    No non-ASCII characters"
else
  echo "  FAIL  Non-ASCII chars found: $NON_ASCII"
  ERRORS=$((ERRORS + 1))
fi

echo ""
echo "======================================="
if [ $ERRORS -eq 0 ]; then
  echo "  ALL CHECKS PASSED -- safe to push"
  echo "======================================="
  echo ""
  exit 0
else
  echo "  BLOCKED: $ERRORS check(s) failed"
  echo "  Fix above before pushing to GitHub"
  echo "======================================="
  echo ""
  exit 1
fi
