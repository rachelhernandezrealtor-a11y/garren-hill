#!/usr/bin/env python3
"""
Batch Photo Intelligence -- runs GPT-4o vision on all photos for a property
Usage: python3 batch_photo_intelligence.py <property_id>

Reads all PropertyPhoto records for the property, analyzes each one,
and updates the ai_room, ai_category fields in the database.
"""

import sys
import os
import json
import urllib.request
import time

API_KEY = os.environ.get('OPENAI_API_KEY')
BASE44_APP_ID = '69e248a2469cc39540781cce'

PROMPT = """You are a luxury real estate photo analyst working for Sotheby's International Realty.

Analyze this property photo and return a JSON object with exactly these fields:
{
  "room": "exact room name (e.g. Living Room, Primary Bedroom, Kitchen, Exterior Front, Pool, Garden, Aerial, Staircase, Dining Room, etc.)",
  "quality_score": 8,
  "mood": "one phrase describing the emotional feel",
  "best_use": "one of: hero / gallery / MLS / skip",
  "caption": "one Sotheby's-grade caption sentence, declarative, specific, no cliches",
  "issues": "any issues: blur, dark, cluttered, bad angle, or 'none'"
}

Return ONLY the JSON. No explanation."""

def analyze_photo(image_url):
    payload = {
        "model": "gpt-4o",
        "max_tokens": 300,
        "messages": [{
            "role": "user",
            "content": [
                {"type": "text", "text": PROMPT},
                {"type": "image_url", "image_url": {"url": image_url, "detail": "high"}}
            ]
        }]
    }
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(
        'https://api.openai.com/v1/chat/completions',
        data=data,
        headers={'Authorization': f'Bearer {API_KEY}', 'Content-Type': 'application/json'}
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        result = json.loads(resp.read())
        content = result['choices'][0]['message']['content'].strip()
        if content.startswith('```'):
            content = content.split('```')[1]
            if content.startswith('json'):
                content = content[4:]
        return json.loads(content.strip())

# Read photos from entity (simple file-based approach for now)
property_id = sys.argv[1] if len(sys.argv) > 1 else None
limit = int(sys.argv[2]) if len(sys.argv) > 2 else 10

print(f"Photo Intelligence Batch Processor")
print(f"Property: {property_id or 'ALL'} | Limit: {limit}")
print("="*50)

# For now output a test with the GH photos we know about
test_photos = [
    ("fa8cec793_200HollycrestDrive-191.jpg", "https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/fa8cec793_200HollycrestDrive-191.jpg"),
    ("341c7343c_200Holycrest-1203.jpg", "https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/341c7343c_200Holycrest-1203.jpg"),
    ("5f5f87315_200HollycrestDrive-65fire.jpg", "https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/5f5f87315_200HollycrestDrive-65fire.jpg"),
    ("57352d0a9_200HollycrestDrive-208.jpg", "https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/57352d0a9_200HollycrestDrive-208.jpg"),
    ("4db7d0477_livingroom.jpg", "https://media.base44.com/images/public/69e248a2469cc39540781cce/4db7d0477_livingroom.jpg"),
]

results = []
for filename, url in test_photos[:limit]:
    print(f"\nAnalyzing: {filename}")
    try:
        analysis = analyze_photo(url)
        analysis['file'] = filename
        analysis['url'] = url
        results.append(analysis)
        print(f"  Room: {analysis['room']} | Score: {analysis['quality_score']}/10 | Use: {analysis['best_use']}")
        print(f"  Caption: {analysis['caption']}")
        if analysis['issues'] != 'none':
            print(f"  ⚠️  Issues: {analysis['issues']}")
        time.sleep(0.5)  # rate limit buffer
    except Exception as e:
        print(f"  ERROR: {e}")

print("\n" + "="*50)
print(f"COMPLETE: {len(results)} photos analyzed")
print("\nFull results:")
print(json.dumps(results, indent=2))
