#!/usr/bin/env python3
"""
Batch AI analysis of PropertyPhoto records using GPT-4o vision.
Reads photos with missing ai_room/ai_category, analyzes enhanced_url, saves results.
"""

import json
import sys
import os
from datetime import datetime

try:
    import requests
    from openai import OpenAI
except ImportError:
    print("Installing dependencies...")
    os.system("pip install -q requests openai")
    import requests
    from openai import OpenAI

# Setup
API_KEY = os.getenv("OPENAI_API_KEY", "")
if not API_KEY:
    print("ERROR: OPENAI_API_KEY not set")
    sys.exit(1)

client = OpenAI(api_key=API_KEY)

def analyze_photo(enhanced_url: str, file_name: str) -> dict:
    """Use GPT-4o vision to analyze a photo."""
    try:
        response = client.messages.create(
            model="gpt-4o",
            max_tokens=500,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image_url",
                            "image_url": {"url": enhanced_url}
                        },
                        {
                            "type": "text",
                            "text": """Analyze this real estate photo. Return ONLY valid JSON with no markdown:
{
  "room": "Room name (e.g., Living Room, Kitchen, Foyer, Master Bedroom)",
  "quality_score": 8.5,
  "best_use": "Hero shot for listing" or "Detail/secondary",
  "caption": "One sentence Sotheby's-style caption about what we're seeing"
}

Voice: Precise, no adjectives. Specific materials/details only. No words like 'stunning', 'beautiful', 'elegant', 'cozy'.
"""
                        }
                    ]
                }
            ]
        )
        
        text = response.content[0].text.strip()
        # Remove markdown code blocks if present
        if text.startswith("```"):
            text = text.split("```")[1]
            if text.startswith("json"):
                text = text[4:]
            text = text.strip()
        
        result = json.loads(text)
        return {
            "ai_room": result.get("room"),
            "ai_category": "Interior" if "interior" in enhanced_url.lower() else "Exterior",
            "quality_score": result.get("quality_score", 7.0),
            "best_use": result.get("best_use", "Secondary"),
            "caption": result.get("caption", ""),
            "success": True
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

def main():
    # In a real automation, this would read from the database via Base44 SDK
    # For now, we're just showing the pattern
    print("Batch AI analysis starting...")
    print(f"Timestamp: {datetime.now().isoformat()}")
    print("Ready for integration with Base44 automation system.")

if __name__ == "__main__":
    main()
