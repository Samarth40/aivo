import requests
from bs4 import BeautifulSoup
import re

def extract_website_content(url):
    """
    Downloads the URL, removes noisy HTML (scripts, styles, nav), 
    and returns a clean semantic text block optimized for the LLM.
    """
    try:
        # 1. Fetch raw HTML
        headers = { 'User-Agent': 'Mozilla/5.0 (AIVO SEO Analysis Engine; +http://aivo.com)' }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()

        # 2. Parse and Clean with BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')

        # Remove noisy elements
        for element in soup(["script", "style", "nav", "footer", "header", "noscript"]):
            element.decompose()

        # Extract textual content
        text = soup.get_text(separator=' ')

        # 3. Clean up the text (remove excessive whitespace)
        cleaned_text = re.sub(r'\s+', ' ', text).strip()

        # 4. Extract basic metadata (Title, H1s) to help Gemini
        title = soup.title.string if soup.title else ""
        h1s = [h1.get_text(strip=True) for h1 in soup.find_all('h1')]

        return {
            "success": True,
            "title": title,
            "h1s": h1s,
            "mainTextChunk": cleaned_text[:15000] # Cap at ~15k chars for Gemini token limits
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
