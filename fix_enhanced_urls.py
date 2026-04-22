import json, urllib.parse, os, requests, time

TOKEN = os.environ['BASE44_SERVICE_TOKEN']
APP_ID = '69e248a2469cc39540781cce'
BASE_API = f'https://base44.app/api/apps/{APP_ID}/entities/PropertyPhoto'
HEADERS = {'Authorization': f'Bearer {TOKEN}', 'Content-Type': 'application/json'}

CDN_BASE = "https://res.cloudinary.com/dghn2xpif/image/fetch/"
CDN_INT = "e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_1600,c_limit"
CDN_EXT = "e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_1600,c_limit"

def make_fetch_url(file_url, category):
    params = CDN_EXT if category and 'exterior' in str(category).lower() else CDN_INT
    encoded = urllib.parse.quote(file_url, safe='')
    return f"{CDN_BASE}{params}/{encoded}"

# ---- GARREN HILL ----
GH_ID = "69e437375f1b701c20f9d509"
resp = requests.get(f"{BASE_API}?limit=500&property_id={GH_ID}", headers=HEADERS)
gh_records = resp.json()
print(f"GH records fetched: {len(gh_records)}")

to_update = []
already_good = 0
for r in gh_records:
    enhanced = r.get('enhanced_url') or ''
    file_url = r.get('file_url') or ''
    category = r.get('category') or ''
    if not file_url:
        continue
    if '/image/fetch/' in enhanced and 'w_1600' in enhanced:
        already_good += 1
        continue
    new_enhanced = make_fetch_url(file_url, category)
    to_update.append((r['id'], new_enhanced, r.get('file_name', '')))

print(f"GH: already correct={already_good}, to update={len(to_update)}")

ok = 0
errors = []
for i, (record_id, new_url, fname) in enumerate(to_update):
    r = requests.put(f"{BASE_API}/{record_id}", headers=HEADERS, json={"enhanced_url": new_url})
    if r.status_code == 200:
        ok += 1
    else:
        errors.append((fname, r.status_code, r.text[:60]))
    if (i+1) % 50 == 0:
        print(f"  GH: {i+1}/{len(to_update)} ({ok} ok, {len(errors)} errors)")
    time.sleep(0.05)

print(f"GH DONE: updated={ok}, errors={len(errors)}")
if errors:
    print("  Errors:", errors[:3])

# ---- FLOW FARM ----
FF_ID = "69e4406f90bbe19ad72108ab"
resp2 = requests.get(f"{BASE_API}?limit=500&property_id={FF_ID}", headers=HEADERS)
ff_records = resp2.json()
print(f"\nFF records fetched: {len(ff_records)}")

to_update_ff = []
already_good_ff = 0
for r in ff_records:
    enhanced = r.get('enhanced_url') or ''
    file_url = r.get('file_url') or ''
    category = r.get('category') or ''
    if not file_url:
        continue
    if '/image/fetch/' in enhanced and 'w_1600' in enhanced:
        already_good_ff += 1
        continue
    new_enhanced = make_fetch_url(file_url, category)
    to_update_ff.append((r['id'], new_enhanced, r.get('file_name', '')))

print(f"FF: already correct={already_good_ff}, to update={len(to_update_ff)}")

ok2 = 0
errors2 = []
for i, (record_id, new_url, fname) in enumerate(to_update_ff):
    r = requests.put(f"{BASE_API}/{record_id}", headers=HEADERS, json={"enhanced_url": new_url})
    if r.status_code == 200:
        ok2 += 1
    else:
        errors2.append((fname, r.status_code))
    if (i+1) % 50 == 0:
        print(f"  FF: {i+1}/{len(to_update_ff)} ({ok2} ok, {len(errors2)} errors)")
    time.sleep(0.05)

print(f"FF DONE: updated={ok2}, errors={len(errors2)}")
print("\nALL DONE.")
