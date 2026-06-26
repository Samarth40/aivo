import os
import sys
import json
from dotenv import load_dotenv
import google.generativeai as genai

# Resolve env
script_dir = os.path.dirname(os.path.abspath(__file__))
env_path = os.path.join(script_dir, '../.env')
load_dotenv(dotenv_path=env_path)
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
if not GEMINI_API_KEY:
    print("No GEMINI_API_KEY found")
    sys.exit(1)
genai.configure(api_key=GEMINI_API_KEY)

# Import AIVO pipeline modules
sys.path.append(script_dir)
from pipeline.extractor import extract_website_content
from pipeline.analyzer import analyze_content

def optimize_content(original_text):
    """Uses Gemini to rewrite and optimize the text for Answer Engines"""
    model = genai.GenerativeModel("gemini-2.5-flash")
    prompt = f"""
    You are an expert Agentic AI Optimizer (AAIO). 
    Take the following extracted website content and optimize it for AI Visibility and Answer Engines.
    
    Guidelines for optimization:
    1. Define key entities clearly and concisely (e.g., "X is a Y that does Z").
    2. Add a clear, structured FAQ section answering direct questions.
    3. Ensure facts and claims are dense and direct, avoiding promotional fluff.
    4. Keep headings structured and semantic.
    
    Original Content:
    {original_text}
    
    Output ONLY the optimized text, nothing else. Do not use markdown code blocks like ```text around your output.
    """
    response = model.generate_content(prompt)
    return response.text.strip()

def run_multiple_tests(urls):
    all_results = {}
    for url in urls:
        print(f"\n============================")
        print(f"Testing URL: {url}")
        print(f"============================")
        
        results = {}
        print(f"1. Extracting from {url}...")
        ext_result = extract_website_content(url)
        if not ext_result['success']:
            print("Extraction failed:", ext_result.get('error'))
            all_results[url] = {"error": ext_result.get('error')}
            continue
            
        original_text = ext_result['mainTextChunk']
        page_data_before = {
            'title': ext_result.get('title', ''),
            'h1s': ext_result.get('h1s', []),
            'mainTextChunk': original_text
        }
        
        print("2. Running BEFORE Analysis...")
        before_result = analyze_content(page_data_before)
        if not before_result['success']:
            print("Before analysis failed:", before_result.get('error'))
            all_results[url] = {"error": "Before analysis failed"}
            continue
            
        results['before'] = before_result['data']
        
        print("3. Optimizing Content with AIVO principles...")
        optimized_text = optimize_content(original_text)
        
        page_data_after = {
            'title': ext_result.get('title', '') + " (Optimized)",
            'h1s': ext_result.get('h1s', []),
            'mainTextChunk': optimized_text
        }
        
        print("4. Running AFTER Analysis...")
        after_result = analyze_content(page_data_after)
        if not after_result['success']:
            print("After analysis failed:", after_result.get('error'))
            all_results[url] = {"error": "After analysis failed"}
            continue
            
        results['after'] = after_result['data']
        all_results[url] = results

    with open('multi_test_results.json', 'w') as f:
        json.dump(all_results, f, indent=2)
        
    print("\nTest complete. Results saved to multi_test_results.json")

if __name__ == "__main__":
    urls_to_test = [
        "https://rohitgajbhiye.tech"
    ]
    run_multiple_tests(urls_to_test)
