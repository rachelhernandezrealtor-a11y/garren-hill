#!/bin/bash
# Pre-push verification for both landing pages
# Run before every GitHub push

FILE=${1:-"/app/.agents/GarranHillV6_MASTER.jsx"}

echo "=== Verifying: $FILE ==="

# 1. Non-ASCII check
BAD=$(python3 -c "
with open('$FILE') as f: c = f.read()
bad = [i for i,ch in enumerate(c) if ord(ch)>127]
print(len(bad))
")
echo "Non-ASCII chars: $BAD"
[ "$BAD" != "0" ] && echo "FAIL: Non-ASCII found" && exit 1

# 2. Double-brace JSX comment check
DOUBLE=$(grep -c '\*\/}}' "$FILE" || true)
echo "Double-brace comments: $DOUBLE"
[ "$DOUBLE" != "0" ] && echo "FAIL: Double closing braces on JSX comments found" && exit 1

# 3. Curly quotes check
CURLY=$(python3 -c "
with open('$FILE') as f: c = f.read()
bad = sum(c.count(ch) for ch in ['\u2018','\u2019','\u201c','\u201d'])
print(bad)
")
echo "Curly quotes: $CURLY"
[ "$CURLY" != "0" ] && echo "FAIL: Curly quotes found" && exit 1

# 4. Export default present
EXPORT=$(grep -c "export default" "$FILE" || true)
echo "Export default: $EXPORT"
[ "$EXPORT" == "0" ] && echo "FAIL: Missing export default" && exit 1

echo "=== ALL CHECKS PASSED ==="

# 5. Check for undefined I.xxx references
MISSING=$(python3 << 'PYEOF'
import re, sys
with open('$FILE') as f:
    code = f.read()
i_uses = set(re.findall(r'\bI\.(\w+)\b', code))
i_block = re.search(r'const I\s*=\s*\{(.+?)\n\}', code, re.DOTALL)
if not i_block:
    print("CANNOT_FIND_I")
    sys.exit()
i_keys = set(re.findall(r'(\w+)\s*:', i_block.group(1)))
missing = i_uses - i_keys
print(','.join(sorted(missing)) if missing else '')
PYEOF
)
echo "Undefined I.xxx keys: ${MISSING:-none}"
[ -n "$MISSING" ] && echo "FAIL: Undefined image references: $MISSING" && exit 1

echo "=== ALL CHECKS PASSED ==="
