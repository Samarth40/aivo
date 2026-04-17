import json
import traceback
import google.generativeai as genai
from google.generativeai.types import HarmCategory, HarmBlockThreshold

def run_llmstxt_generation(page_content, url):
    """
    Uses Gemini to analyze a crawled website and generate structured
    llms.txt data: brand, tagline, description, and categorized page sections.
    """
    try:
        model = genai.GenerativeModel(model_name='models/gemini-2.5-flash')

        # Extract domain for context
        try:
            from urllib.parse import urlparse
            parsed = urlparse(url if url.startswith('http') else f'https://{url}')
            domain = parsed.netloc or url
            base_url = f"{parsed.scheme}://{parsed.netloc}"
        except Exception:
            domain = url
            base_url = url

        prompt = f"""
You are an expert at creating llms.txt files — a standard format that helps AI language models understand, cite, and summarize websites accurately.

Analyze the website content below and generate a complete, structured llms.txt data object.

WEBSITE URL: {url}
DOMAIN: {domain}

Your task:
1. Extract the real brand name from the content
2. Write a concise, factual tagline (1 sentence, no marketing fluff)
3. Write a comprehensive description (2-3 paragraphs) explaining what the site is, who it's for, what content it offers, and any important context for LLMs
4. Discover and organize page sections with real or inferred links based on the content

Return ONLY a single valid JSON object:

{{
  "brandName": "Extracted brand/site name",
  "domain": "{domain}",
  "tagline": "One-sentence factual description of what the site does",
  "description": "2-3 paragraph description for LLMs. First paragraph: what the site is and does. Second paragraph: who it's for and what they get. Third paragraph: any important context or caveats for AI models.",
  "sections": [
    {{
      "title": "Section Category Name",
      "links": [
        {{"label": "Page Name", "url": "https://full-url.com/path"}},
        {{"label": "Another Page", "url": "https://full-url.com/path2"}}
      ]
    }}
  ]
}}

Guidelines for sections:
- Create 4-8 sections based on what the site actually has (e.g., Main Pages, Documentation, Blog, Products, Legal, etc.)
- Use real URLs inferred from the base URL and content structure
- Include 2-5 links per section
- Always include a "Legal" section with Privacy Policy and Terms of Service URLs

Base URL for constructing links: {base_url}

--- WEBSITE CONTENT ---
{page_content[:12000]}
--- END CONTENT ---
"""

        response = model.generate_content(
            prompt,
            generation_config=genai.types.GenerationConfig(
                response_mime_type="application/json",
                temperature=0.3,
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
