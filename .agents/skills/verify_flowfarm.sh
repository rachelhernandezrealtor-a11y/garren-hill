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
