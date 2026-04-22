#!/bin/bash
# OFFICIAL PUSH SCRIPT for Flow Farm landing page
# This is the ONLY way to push -- verification is mandatory
# Usage: bash /app/.agents/skills/push_flowfarm.sh "commit message"

set -e

FILE="/app/.agents/FlowFarmLanding2_MASTER.jsx"
VERIFY="/app/.agents/skills/verify_flowfarm.sh"
COMMIT_MSG="${1:-update}"

echo ""
echo "======================================="
echo "  FLOW FARM PUSH PIPELINE"
echo "  $(date)"
echo "======================================="
echo ""

# STEP 1: VERIFY -- hard stop if anything fails
echo "STEP 1: Running verification..."
if ! bash "$VERIFY" "$FILE"; then
  echo ""
  echo "  PUSH ABORTED -- fix failures above first"
  echo ""
  exit 1
fi

# STEP 2: Push to GitHub
echo "STEP 2: Pushing to GitHub..."
source /app/.agents/.env

SHA=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
  "https://api.github.com/repos/rachelhernandezrealtor-a11y/flowfarm-landing/contents/src/FlowFarmLanding2.jsx" \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('sha',''))")

CONTENT=$(base64 -w 0 "$FILE")

RESULT=$(curl -s -X PUT \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api.github.com/repos/rachelhernandezrealtor-a11y/flowfarm-landing/contents/src/FlowFarmLanding2.jsx" \
  -d "{
    \"message\": \"$COMMIT_MSG\",
    \"content\": \"$CONTENT\",
    \"sha\": \"$SHA\"
  }")

COMMIT_SHA=$(echo "$RESULT" | python3 -c "import sys,json; r=json.load(sys.stdin); print(r.get('commit',{}).get('sha','ERROR')[:10])")

if [ "$COMMIT_SHA" = "ERROR" ]; then
  echo "  PUSH FAILED"
  echo "$RESULT" | python3 -c "import sys,json; r=json.load(sys.stdin); print(r.get('message','unknown error'))"
  exit 1
fi

echo "  Pushed: $COMMIT_SHA"

# STEP 3: Update master backup timestamp
echo "STEP 3: Backing up master..."
cp "$FILE" "${FILE}.bak"
echo "  Backed up to ${FILE}.bak"

echo ""
echo "======================================="
echo "  DONE -- $COMMIT_SHA live on Cloudflare"
echo "  Build deploys in ~60 seconds"
echo "======================================="
echo ""
