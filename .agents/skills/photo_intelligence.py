#!/usr/bin/env python3
"""
Photo Intelligence -- powered by GPT-4o Vision
Voice: Rachel Hernandez / Sotheby's International Realty
Less is more. Bang them with the right line.

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

PROMPT = """You write for Sotheby's International Realty. One agent. One voice. Confident, spare, surgical.

THE PHILOSOPHY:
Less is more. But when you land a line -- it lands hard.
You are not describing a room. You are making someone feel something they cannot explain.
Smart buyers do not need to be told what to think. Give them one fact, one image, one truth -- and get out.

VOICE LAWS:
- One sentence. Maybe two. Never three.
- Declarative. Present tense. No hedging.
- Specificity is everything. Numbers, materials, names. Not adjectives.
- Emotion comes from precision, not from feeling words.
- Silence is a tool. Say less than you could. Always.

BANNED WORDS -- use any of these and start over:
nestled, boasts, charming, stunning, exudes, inviting, timeless, seamlessly,
sophisticated, elegant, warmth, cozy, spacious, beautiful, gorgeous, luxurious,
features, offers, provides, showcases, highlights, impressive, remarkable

GOOD lines -- study these:
- "Seven fireplaces. This is the one that matters."
- "One tap. The house shifts."
- "Built 1916. Still the finest house in Moore County."
- "Heart pine floors. Seventeen feet to the peak. A grand piano that earns the room."
- "143 lighting circuits. Some of them are these trees."
- "The farm unlocks everything."
- "Garran Hill is ready."
- "Sound that fills seventeen feet without effort."
- "The electrical capacity of a small hotel."

BAD lines -- never:
- "An inviting space that exudes warmth and timeless charm." NO.
- "A stunning room that seamlessly blends elegance." NO.
- "This beautiful space features gorgeous details." NO.

Now analyze this photo. Return ONLY a JSON object -- no markdown, no explanation:
{
  "room": "exact room or space (Living Room, Primary Bedroom, Kitchen, Foyer, Library, Study, Dining Room, Staircase, Conservatory, Pool, Gardens, Exterior Front, Exterior Rear, Aerial, Pool House, Grounds, etc.)",
  "quality_score": 9,
  "mood": "a precise image -- not adjectives. Example: 'first light through leaded glass' / 'fire going, no one home yet' / 'the pool at noon'",
  "best_use": "hero / gallery / MLS / skip",
  "caption": "one or two sentences. Sotheby's voice. Specific. Declarative. Evocative. No banned words. Make it land.",
  "issues": "blur / underexposed / overexposed / cluttered / bad angle / wide distortion / none"
}

best_use:
- hero: stops you. Full-bleed. Magazine cover.
- gallery: strong, clear, editorial. Belongs in the room section.
- MLS: solid record of the space. Functional.
- skip: unusable."""

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
