import json
import google.generativeai as genai

def analyze_content(page_data, llm_model_name="gemini-1.5-flash"):
    """
    Feeds the extracted website text to Gemini to generate the AIVO metrics json.
    """
    try:
        model = genai.GenerativeModel(llm_model_name, generation_config={"response_mime_type": "application/json"})
        
        prompt = f"""
        You are an elite AI Search Engine Optimization (SEO) Analyzer.
        I am going to provide you with the extracted text from a website.
        Analyze this text and grade its "AI Visibility" based on how easily an LLM (like yourself)
        can understand its entities, semantic density, and authoritative posture.

        Website Title: {page_data.get('title')}
        H1 Tags: {page_data.get('h1s')}
        Main Content:
        ---
        {page_data.get('mainTextChunk')}
        ---

        Output a strict JSON object with EXACTLY these keys:
        {{
            "aiVisibilityScore": (Integer 0-100, 100 being perfect for an AI to cite),
            "semanticDensity": (Float 0.0-10.0, grading how information-dense the content is without fluff),
            "expectedCitations": (Integer 0-10, predicting how many times an AI engine might cite this in a standard summary),
            "entitiesFound": (Array of strings, listing the top 5 most clearly defined named entities/concepts in the text)
        }}
        """

        response = model.generate_content(prompt)
        
        # Parse output ensuring it's a valid JSON dict
        result_json = json.loads(response.text)
        return { "success": True, "data": result_json }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
