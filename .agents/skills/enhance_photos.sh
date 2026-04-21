#!/bin/bash
# enhance_photos.sh
# Processes up to 20 unenhanced photos per run through Cloudinary
# Automatically detects interior vs exterior and applies the right enhancement

source /app/.agents/.env

CLOUD_NAME="${CLOUDINARY_CLOUD_NAME}"
API_KEY="${CLOUDINARY_API_KEY}"
API_SECRET="${CLOUDINARY_API_SECRET}"
API_BASE="https://app.base44.com/api/apps/69e248a2469cc39540781cce/entities"

BATCH_SIZE=20
PROCESSED=0
FAILED=0

echo "=== Photo Enhancement Run: $(date) ==="

# Fetch unenhanced photos
PHOTOS=$(curl -s -X POST "${API_BASE}/PropertyPhoto/filter" \
  -H "Content-Type: application/json" \
  -H "app-id: 69e248a2469cc39540781cce" \
  -d '{"filters": [{"field": "enhanced_url", "operator": "is_empty"}], "limit": 20}' 2>/dev/null)

COUNT=$(echo "$PHOTOS" | python3 -c "import sys,json; d=json.load(sys.stdin); print(len(d.get('results', d if isinstance(d, list) else [])))" 2>/dev/null || echo 0)
echo "Found ${COUNT} unenhanced photos in this batch"

echo "$PHOTOS" | python3 << 'PYEOF'
import sys, json, subprocess, hashlib, urllib.request, urllib.parse, time, os

CLOUD = os.environ['CLOUDINARY_CLOUD_NAME']
API_KEY = os.environ['CLOUDINARY_API_KEY']
API_SECRET = os.environ['CLOUDINARY_API_SECRET']
APP_ID = "69e248a2469cc39540781cce"
API_BASE = f"https://app.base44.com/api/apps/{APP_ID}/entities"

raw = sys.stdin.read()
try:
    data = json.loads(raw)
    if isinstance(data, dict):
        photos = data.get('results', data.get('records', []))
    else:
        photos = data
except:
    print("Failed to parse photos")
    sys.exit(1)

print(f"Processing {len(photos)} photos...")

def sign(params: dict, secret: str) -> str:
    sorted_str = "&".join(f"{k}={v}" for k, v in sorted(params.items()))
    return hashlib.sha1((sorted_str + secret).encode()).hexdigest()

def enhance(photo: dict) -> str | None:
    url = photo.get('file_url', '')
    if not url:
        return None
    
    category = (photo.get('category') or '').lower()
    room = (photo.get('room') or '').lower()
    
    # Pick enhancement based on category/room
    if category == 'exterior' or 'exterior' in room or 'aerial' in room or 'grounds' in room:
        eager = "e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_1400,c_limit"
    else:
        eager = "e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_1400,c_limit"
    
    ts = str(int(time.time()))
    sig = sign({"eager": eager, "timestamp": ts}, API_SECRET)
    
    import subprocess
    result = subprocess.run([
        "curl", "-s", "-X", "POST",
        f"https://api.cloudinary.com/v1_1/{CLOUD}/image/upload",
        "-F", f"file={url}",
        "-F", f"timestamp={ts}",
        "-F", f"api_key={API_KEY}",
        "-F", f"eager={eager}",
        "-F", f"signature={sig}"
    ], capture_output=True, text=True)
    
    try:
        r = json.loads(result.stdout)
        if r.get('eager'):
            return r['eager'][0]['secure_url']
        elif r.get('secure_url'):
            return r['secure_url']
        else:
            print(f"  Cloudinary error: {r.get('error', 'unknown')}")
            return None
    except:
        print(f"  Parse error: {result.stdout[:100]}")
        return None

def update_photo(photo_id: str, enhanced_url: str):
    import urllib.request, json
    data = json.dumps({"enhanced_url": enhanced_url}).encode()
    req = urllib.request.Request(
        f"{API_BASE}/PropertyPhoto/{photo_id}",
        data=data,
        method="PUT",
        headers={"Content-Type": "application/json", "app-id": APP_ID}
    )
    try:
        urllib.request.urlopen(req, timeout=10)
        return True
    except Exception as e:
        print(f"  Update failed: {e}")
        return False

processed = 0
failed = 0

for photo in photos:
    pid = photo.get('id', '')
    fname = photo.get('file_name', photo.get('file_url', '')[-30:])
    print(f"Enhancing: {fname}...")
    
    enhanced_url = enhance(photo)
    if enhanced_url:
        if update_photo(pid, enhanced_url):
            print(f"  Done: {enhanced_url[-50:]}")
            processed += 1
        else:
            print(f"  Failed to save")
            failed += 1
    else:
        failed += 1
    
    time.sleep(0.5)  # be nice to the API

print(f"\n=== Batch complete: {processed} enhanced, {failed} failed ===")
PYEOF
