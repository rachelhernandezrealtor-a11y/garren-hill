#!/usr/bin/env python3
"""
Photo Intelligence -- powered by GPT-4o Vision
Analyzes a property photo and returns:
- Room type
- Quality score (1-10)
- Mood/vibe
- Best use (hero / gallery / MLS / skip)
- Suggested caption (Sotheby's voice)
- Issues to flag

Usage: python3 photo_intelligence.py <image_url>
"""

import sys
import os
import json
import urllib.request
import urllib.parse

API_KEY = os.environ.get('OPENAI_API_KEY')
if not API_KEY:
    print(json.dumps({"error": "OPENAI_API_KEY not set"}))
    sys.exit(1)

image_url = sys.argv[1] if len(sys.argv) > 1 else None
if not image_url:
    print(json.dumps({"error": "No image URL provided"}))
    sys.exit(1)

PROMPT = """You are a luxury real estate photo analyst working for Sotheby's International Realty.

Analyze this property photo and return a JSON object with exactly these fields:
{
  "room": "exact room name (e.g. Living Room, Primary Bedroom, Kitchen, Exterior, Pool, Garden, Aerial, Staircase, etc.)",
  "quality_score": 8,
  "mood": "one phrase describing the emotional feel (e.g. warm and inviting, grand and formal, light-filled)",
  "best_use": "one of: hero / gallery / MLS / skip",
  "caption": "one Sotheby's-grade caption sentence, declarative, no adjective cliches",
  "issues": "any issues: blur, dark, cluttered, bad angle, or 'none'"
}

best_use guide:
- hero: stunning, full-bleed worthy, stops you cold
- gallery: great shot, belongs in the room gallery
- MLS: solid, functional, good for MLS listing
- skip: not usable (dark, blurry, cluttered, bad angle)

Return ONLY the JSON. No explanation."""

payload = {
    "model": "gpt-4o",
    "max_tokens": 300,
    "messages": [
        {
            "role": "user",
            "content": [
                {"type": "text", "text": PROMPT},
                {"type": "image_url", "image_url": {"url": image_url, "detail": "high"}}
            ]
        }
    ]
}

data = json.dumps(payload).encode('utf-8')
req = urllib.request.Request(
    'https://api.openai.com/v1/chat/completions',
    data=data,
    headers={
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
)

try:
    with urllib.request.urlopen(req, timeout=30) as resp:
        result = json.loads(resp.read())
        content = result['choices'][0]['message']['content'].strip()
        # Clean up markdown code blocks if present
        if content.startswith('```'):
            content = content.split('```')[1]
            if content.startswith('json'):
                content = content[4:]
        parsed = json.loads(content)
        print(json.dumps(parsed, indent=2))
except Exception as e:
    print(json.dumps({"error": str(e)}))
    sys.exit(1)
