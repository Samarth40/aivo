import json
import traceback
import google.generativeai as genai
from google.generativeai.types import HarmCategory, HarmBlockThreshold

def run_competitor_analysis(target_content, competitor_content, target_url, competitor_url):
    """
    Uses Gemini to perform a real side-by-side AI visibility comparison
    between a target page and a competitor page.
    Returns structured JSON matching the CompetitorIntelligence UI format.
    """
    try:
        model = genai.GenerativeModel(model_name='models/gemini-2.5-flash')

        prompt = f"""
You are an expert AI Visibility analyst. Compare two web pages for their ability to be cited, extracted, and summarized by AI language models (like ChatGPT, Gemini, Perplexity, Claude).

TARGET PAGE URL: {target_url}
COMPETITOR PAGE URL: {competitor_url}

Analyze each page's content deeply across these 6 dimensions:
- overall (0-100): holistic AI visibility score
- contentQuality (0-100): factual density, writing quality, expertise signals
- semanticDepth (0-100): topic coverage, semantic richness, entity chains
- entityCoverage (0-100): named entities, facts, statistics present
- structuredData (0-100): schema markup, headers, lists, FAQ presence
- aiReadability (0-100): readability for AI extraction, chunk quality, noise ratio

Return ONLY a single valid JSON object with NO markdown wrapping:

{{
  "target": {{
    "url": "{target_url}",
    "scores": {{
      "overall": 0,
      "contentQuality": 0,
      "semanticDepth": 0,
      "entityCoverage": 0,
      "structuredData": 0,
      "aiReadability": 0
    }},
    "strengths": ["3-5 specific strengths found in the content"],
    "weaknesses": ["3-5 specific weaknesses or gaps found"]
  }},
  "competitor": {{
    "url": "{competitor_url}",
    "scores": {{
      "overall": 0,
      "contentQuality": 0,
      "semanticDepth": 0,
      "entityCoverage": 0,
      "structuredData": 0,
      "aiReadability": 0
    }},
    "strengths": ["3-5 specific strengths"],
    "weaknesses": ["2-3 specific weaknesses"]
  }},
  "suggestions": [
    {{
      "priority": "High",
      "title": "Actionable title",
      "desc": "Specific actionable description referencing real gaps found in the target vs competitor"
    }}
  ]
}}

Provide 4-6 suggestions total, prioritized as High, Medium, or Low.
Base all scores and insights on the ACTUAL content provided below.

--- TARGET PAGE CONTENT ---
{target_content[:8000]}
--- END TARGET ---

--- COMPETITOR PAGE CONTENT ---
{competitor_content[:8000]}
--- END COMPETITOR ---
"""

        response = model.generate_content(
            prompt,
            generation_config=genai.types.GenerationConfig(
                response_mime_type="application/json",
                temperature=0.4,
            ),
            safety_settings={
                HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
            }
        )

        results = json.loads(response.text)
        return {"success": True, "data": results}

    except Exception as e:
        traceback.print_exc()
        return {"success": False, "error": str(e)}
