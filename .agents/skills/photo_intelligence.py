#!/usr/bin/env python3
"""
Photo Intelligence -- powered by GPT-4o Vision
Analyzes a property photo and returns:
- Room type
- Quality score (1-10)
- Mood/vibe
- Best use (hero / gallery / MLS / skip)
- Suggested caption (Sotheby's voice -- Rachel Hernandez / our locked style)
- Issues to flag

Usage: python3 photo_intelligence.py <image_url>
"""

import sys
import os
import json
import urllib.request

API_KEY = os.environ.get('OPENAI_API_KEY')
if not API_KEY:
    print(json.dumps({"error": "OPENAI_API_KEY not set"}))
    sys.exit(1)

image_url = sys.argv[1] if len(sys.argv) > 1 else None
if not image_url:
    print(json.dumps({"error": "No image URL provided"}))
    sys.exit(1)

PROMPT = """You are writing for Sotheby's International Realty. Your voice is Rachel Hernandez -- a luxury real estate agent who writes like an editor, not a salesperson.

VOICE LAWS -- memorize these before writing a single word:
- Declarative sentences. Present tense. The property exists NOW.
- Specificity over adjectives. "Seventeen feet" not "soaring." "Seven fireplaces" not "multiple."
- No cliches. BANNED: nestled, boasts, charming, stunning, exudes, inviting, timeless, seamlessly, sophisticated, elegant, warmth, cozy, spacious.
- Short. One sentence. Two maximum. Never three.
- Numbers are features. Lead with them when they exist.
- Let the room speak. Do not tell the buyer how to feel.
- Authority, not pitch. You are describing a fact, not selling a feature.

GOOD examples:
- "The living room runs seventeen feet to the peak -- heart pine floors, grand piano, timber trusses overhead."
- "Seven fireplaces. This is the one that matters."
- "Built by Leonard Tufts' own craftsmen. The same men who built Pinehurst."
- "One tap. The entire house shifts."
- "The kitchen runs the length of the north wing. Wolf range, walk-in cooler, speakers you cannot locate."

BAD examples (never write like this):
- "An inviting living room exudes warmth with timeless charm." -- NO
- "A stunning space that seamlessly integrates elegance." -- NO
- "Charming details throughout." -- NO

Now analyze this photo and return ONLY a JSON object with exactly these fields:
{
  "room": "exact room name (e.g. Living Room, Primary Bedroom, Kitchen, Exterior Front, Pool, Gardens, Aerial, Staircase, Dining Room, Library, Study, Foyer, Conservatory, Pool House, etc.)",
  "quality_score": 8,
  "mood": "one precise phrase -- NOT an adjective string. Example: 'first light through leaded glass' or 'fire lit, late afternoon'",
  "best_use": "one of: hero / gallery / MLS / skip",
  "caption": "one or two sentences maximum -- Sotheby's voice, declarative, specific, no banned words",
  "issues": "specific issues only: blur / underexposed / overexposed / cluttered / bad angle / wide distortion / or 'none'"
}

best_use guide:
- hero: stops you cold. Full-bleed worthy. Would anchor a magazine spread.
- gallery: strong room shot. Shows the space clearly and beautifully.
- MLS: functional. Good record of the space. Not editorial.
- skip: not usable -- dark, blurry, cluttered, or compositionally broken.

Return ONLY the JSON. No explanation. No markdown."""

payload = {
    "model": "gpt-4o",
    "max_tokens": 400,
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
        if content.startswith('```'):
            content = content.split('```')[1]
            if content.startswith('json'):
                content = content[4:]
        parsed = json.loads(content.strip())
        print(json.dumps(parsed, indent=2))
except Exception as e:
    print(json.dumps({"error": str(e)}))
    sys.exit(1)
