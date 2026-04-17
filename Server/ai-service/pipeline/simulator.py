import json
import traceback
import google.generativeai as genai
from google.generativeai.types import HarmCategory, HarmBlockThreshold

def run_simulation(content, selected_models):
    """
    Simulates how different LLMs might evaluate and extract the provided web content.
    Returns a unified JSON response generated natively via gemini-2.5-flash.
    """
    try:
        model = genai.GenerativeModel(model_name='models/gemini-2.5-flash')
        
        prompt = f"""
You are an expert AI extraction algorithm evaluating content from a website. 
You need to simulate how the following LLM engines would extract and cite this content:
{', '.join(selected_models)}

For EACH of the selected models, provide an evaluation object. Different LLMs have different biases:
- ChatGPT values semantic density and H2 headers.
- Perplexity values verifiable claim chains and external links/citations.
- Gemini values knowledge graph entity matches and EEAT signals.
- Claude values safety, expertise, and balanced readability.

Structure your response ENTIRELY as a single valid JSON object, where the root keys are exactly: {', '.join(selected_models)}.

Schema per model:
{{
  "[model_id]": {{
    "visibilityScore": [integer 0-100],
    "citationLikelihood": ["Very High", "High", "Medium", "Low"],
    "simulatedResponse": "[A brief 2-3 sentence paragraph simulating what the assigned AI model would say in response to a user query about this content]",
    "keySignals": [Array of 3 to 5 string bullet points describing technical extraction signals or structural patterns found in the text]
  }}
}}

Return ONLY the JSON object. Do not include markdown wraps if the mime type enforces JSON.

--- CONTENT START ---
{content[:15000]}
--- CONTENT END ---
"""

        response = model.generate_content(
            prompt,
            generation_config=genai.types.GenerationConfig(
                response_mime_type="application/json",
                temperature=0.7,
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
