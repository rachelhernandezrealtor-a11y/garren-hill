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

def update_property(prop_id, prop_name):
    resp = requests.get(f"{BASE_API}?limit=500&property_id={prop_id}", headers=HEADERS)
    records = resp.json()
    print(f"{prop_name}: {len(records)} records fetched")

    to_update = []
    already_good = 0
    for r in records:
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

    print(f"  Already correct: {already_good} | To update: {len(to_update)}")

    ok = 0
    errors = []
    for i, (record_id, new_url, fname) in enumerate(to_update):
        for attempt in range(4):
            r = requests.put(f"{BASE_API}/{record_id}", headers=HEADERS, json={"enhanced_url": new_url})
            if r.status_code == 200:
                ok += 1
                break
            elif r.status_code == 429:
                wait = 2 ** attempt
                print(f"  Rate limit on {fname}, waiting {wait}s...")
                time.sleep(wait)
            else:
                errors.append((fname, r.status_code))
                break
        else:
            errors.append((fname, 429))

        if (i+1) % 50 == 0:
            print(f"  Progress: {i+1}/{len(to_update)} ({ok} ok, {len(errors)} errors)")

        time.sleep(0.2)  # gentler pace

    print(f"  {prop_name} DONE: updated={ok}, errors={len(errors)}")
    if errors:
        print(f"  Sample errors: {errors[:3]}")
    return ok, len(errors)

print("=== Fixing GH ===")
update_property("69e437375f1b701c20f9d509", "Garren Hill")

print("\n=== Fixing Flow Farm ===")
update_property("69e4406f90bbe19ad72108ab", "Flow Farm")

print("\nALL DONE.")
