#!/usr/bin/env python3
"""Force a full Cloudflare edge-cache purge for rachelhernandez.studio.
Reads CLOUDFLARE_PURGE_TOKEN from ~/.hermes/profiles/coco/.env (token name
'coco-linux-purge', scoped to Cache Purge on the rachelhernandez.studio zone only).
Run: python3 .agents/purge.py
Note: Pages auto-builds on push and self-invalidates; this is only for FORCING a purge.
"""
import json, os, urllib.request, urllib.error

ENV = os.path.expanduser("~/.hermes/profiles/coco/.env")
ZONE = "ba9f1f552f0ee309df0b992e7e670c6f"  # rachelhernandez.studio

tok = None
for line in open(ENV):
    if line.startswith("CLOUDFLARE_PURGE_TOKEN="):
        tok = line.split("=", 1)[1].strip()
if not tok:
    raise SystemExit("CLOUDFLARE_PURGE_TOKEN not found in " + ENV)

req = urllib.request.Request(
    f"https://api.cloudflare.com/client/v4/zones/{ZONE}/purge_cache",
    data=json.dumps({"purge_everything": True}).encode(),
    headers={"Authorization": f"Bearer {tok}", "Content-Type": "application/json"},
    method="POST")
try:
    r = json.loads(urllib.request.urlopen(req, timeout=30).read())
except urllib.error.HTTPError as e:
    r = json.loads(e.read())
print("purge success:", r.get("success"), "| errors:", r.get("errors"))
raise SystemExit(0 if r.get("success") else 1)
