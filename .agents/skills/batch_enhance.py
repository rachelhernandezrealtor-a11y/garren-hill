#!/usr/bin/env python3
"""
batch_enhance.py — Process 25 unenhanced photos at a time through Cloudinary.
Called by the Auto-Enhance automation. Saves enhanced URLs back to PropertyPhoto entities.
"""

import subprocess, hashlib, json, time, sys, os

# Load secrets from .env
env = {}
if os.path.exists('/app/.agents/.env'):
    with open('/app/.agents/.env') as f:
        for line in f:
            if line.startswith('#') or not line.strip():
                continue
            k, v = line.strip().split('=', 1)
            env[k] = v

CLOUD = env.get('CLOUDINARY_CLOUD_NAME')
API_KEY = env.get('CLOUDINARY_API_KEY')
API_SECRET = env.get('CLOUDINARY_API_SECRET')
APP_ID = env.get('APP_ID')

if not all([CLOUD, API_KEY, API_SECRET, APP_ID]):
    print("ERROR: Missing secrets in .env")
    sys.exit(1)

def sign(params: dict) -> str:
    sorted_str = "&".join(f"{k}={v}" for k, v in sorted(params.items()))
    return hashlib.sha1((sorted_str + API_SECRET).encode()).hexdigest()

def enhance(url: str, category: str, room: str) -> str | None:
    """Call Cloudinary to enhance an image and return the enhanced URL."""
    cat = (category or '').lower()
    rm = (room or '').lower()
    is_exterior = cat == 'exterior' or any(x in rm for x in ['aerial', 'grounds', 'garden', 'outdoor', 'pool', 'tennis'])
    
    if is_exterior:
        eager = "e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_1400,c_limit"
    else:
        eager = "e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_1400,c_limit"
    
    ts = str(int(time.time()))
    sig = sign({"eager": eager, "timestamp": ts})
    
    result = subprocess.run([
        "curl", "-s", "-X", "POST",
        f"https://api.cloudinary.com/v1_1/{CLOUD}/image/upload",
        "-F", f"file={url}",
        "-F", f"timestamp={ts}",
        "-F", f"api_key={API_KEY}",
        "-F", f"eager={eager}",
        "-F", f"signature={sig}"
    ], capture_output=True, text=True, timeout=30)
    
    try:
        d = json.loads(result.stdout)
        if d.get('eager'):
            return d['eager'][0]['secure_url']
        elif d.get('secure_url'):
            return d['secure_url']
        return None
    except:
        return None

def fetch_photos(limit=25):
    """Fetch unenhanced photos from the API."""
    # Use Python's urllib since we don't have SDK access here
    import urllib.request
    try:
        # GET /entities/PropertyPhoto with ?enhanced_url=null filter
        # This is a simple read — doesn't need auth
        req = urllib.request.Request(
            f'https://app.base44.com/api/apps/{APP_ID}/entities/PropertyPhoto?limit={limit}&filter_field=enhanced_url&filter_type=empty',
            headers={'app-id': APP_ID}
        )
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read())
            return data.get('records', data if isinstance(data, list) else [])
    except Exception as e:
        print(f"ERROR fetching photos: {e}", file=sys.stderr)
        return []

def save_enhanced(photo_id: str, enhanced_url: str):
    """Save enhanced URL back to PropertyPhoto. Uses deno script since we have SDK access there."""
    # Write a tiny deno script to do the save
    script = f'''
import {{ base44 }} from "npm:@base44/sdk";
const client = base44.createClient({{ appId: "{APP_ID}" }});
await client.asServiceRole.entities.PropertyPhoto.update("{photo_id}", {{ enhanced_url: "{enhanced_url}" }});
console.log("saved");
'''
    
    result = subprocess.run([
        "deno", "eval", "--allow-net", script
    ], capture_output=True, text=True, timeout=10)
    
    return "saved" in result.stdout.lower()

def main():
    print("=== Photo Enhancement Batch ===")
    photos = fetch_photos(25)
    
    if not photos:
        print("No unenhanced photos found. Done!")
        return
    
    print(f"Found {len(photos)} unenhanced photos. Processing...")
    
    enhanced_count = 0
    failed_count = 0
    
    for i, photo in enumerate(photos):
        pid = photo.get('id')
        url = photo.get('file_url')
        cat = photo.get('category', '')
        room = photo.get('room', '')
        
        if not url:
            print(f"  [{i+1}] SKIP: no URL")
            continue
        
        print(f"  [{i+1}/{len(photos)}] {room}...", end='', flush=True)
        enhanced_url = enhance(url, cat, room)
        
        if enhanced_url:
            # Try to save
            if save_enhanced(pid, enhanced_url):
                print(" ✓")
                enhanced_count += 1
            else:
                print(" ✗ (save failed)")
                failed_count += 1
        else:
            print(" ✗ (enhancement failed)")
            failed_count += 1
        
        time.sleep(0.3)
    
    print(f"\nBatch complete: {enhanced_count} enhanced, {failed_count} failed")
    
    # Check if there are more to do
    remaining = fetch_photos(1)
    if remaining:
        print(f"Still {len(remaining)} photos to process — next batch will run automatically")
    else:
        print("All photos enhanced! ✓")

if __name__ == "__main__":
    main()
