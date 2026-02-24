# Product Requirements Document (PRD): AIVO (AI Visibility Optimization)

## 1. Product Overview
**AIVO** is a next-generation SaaS platform designed to optimize web content for Answer Engine Optimization (AEO) and Agentic AI Optimization (AAIO). Unlike traditional SEO tools that focus on ranking and backlinks, AIVO ensures that content is interpretable, structured, and entity-rich so that AI answer engines (like Google AI Overviews, Perplexity, Gemini) select, paraphrase, and cite it.

## 2. Core Problem
* Search is moving from "10 blue links" to direct AI answers (often resulting in zero-click interactions).
* AI engines do not rank pages; they synthesize answers from high-quality, structured, semantically clear sources.
* Traditional SEO metrics (keyword density, backlinks) do not correlate directly with AI extraction and citation.
* Content teams lack tools to measure and simulate "AI visibility." Pages with the "right" keywords can still be ignored if they are vague or missing key entity definitions.

## 3. Target Audience
* Digital Marketers & SEO Specialists transitioning to AEO.
* Content Strategists & Writers aiming for AI citation.
* Enterprises and Publishers dependent on search traffic.

## 4. System Architecture & Tech Stack
AIVO uses a cloud-native, modular microservices architecture designed to isolate heavy AI processing from low-latency user interfaces.

* **Frontend Layer:** React + Tailwind CSS, delivered via CDN. Provides an interactive dashboard for visibility analysis, competitor comparison, and recommendation tracking.
* **API Gateway Layer:** Node.js + Express. Handles authentication (JWT), rate limiting, request validation, and routing to internal microservices.
* **Core Microservices:** Node.js pods for user management, report generation, competitor scraping workflows, and orchestrating asynchronous tasks via a queue-worker pattern.
* **AI/ML Processing Layer:** Python-based inference pods running Transformer architectures (e.g., BERT-like embeddings). Inherently computationally intensive, these scale independently. Also integrates with external LLM APIs (OpenAI, Gemini) via a unified inference interface.
* **Data Storage Layer:** 
  * **Redis:** In-memory caching, session management, and task queuing.
  * **MongoDB Atlas (Replica Sets):** Structured and semi-structured operational data.
  * **Object Storage (AWS S3 / GCP Storage):** Storage for HTML snapshots, generated reports, embeddings, and artifacts.
* **Orchestration:** Kubernetes (EKS/GKE) managing pod lifecycles, autoscaling (HPA), and load balancing via AWS ALB.

## 5. Core Engines & Methodology
The system operates through an iterative 6-step pipeline:

### 5.1 Content Extraction Engine
* **Function:** Uses DOM-based extraction and density heuristics to strip noise (navbars, ads, boilerplate, cookie banners) from URLs or text.
* **Goal:** Provide a clean, stable text view that human readers and AI models actually consume, preventing noise from muddying semantic scores.

### 5.2 Semantic Scoring Engine
* **Function:** Segments content into paragraphs/headings and uses vector embeddings to evaluate meaning density, topical comprehensiveness, and query intent match.
* **Goal:** Measure if the content truly answers the user's intent, penalizing scattered information or missing subtopics, rather than just checking keyword frequency.

### 5.3 Entity + Knowledge Graph Engine
* **Function:** Extracts named entities (NER) and maps relationships to build a lightweight content knowledge graph.
* **Goal:** Ensure key concepts are explicitly defined, consistently named, and logically interconnected. Reduces ambiguity caused by pronouns or vague references, mimicking how AI securely reasons over facts.

### 5.4 Tone & Clarity Engine
* **Function:** Uses Transformer-based sentiment analysis to evaluate tone consistency aligned with the page's purpose (e.g., technical vs. promotional). 
* **Goal:** Identify overly promotional language or vague statements and recommend concrete, factual, and concise writing that AI can safely quote.

### 5.5 AI Simulation Engine (Core Differentiator)
* **Function:** Simulates the extraction logic of generative search models to estimate a page's likelihood to be selected or paraphrased.
* **Goal:** Calculate an "AI Visibility Score" based on structural clarity (headings, FAQs), semantic match, entity coverage, and factual density.

### 5.6 Competitor Intelligence Engine
* **Function:** Scrapes top competing pages and compares them based on interpretability, entity coverage, and structural gaps (e.g., missing FAQs or definitions).
* **Goal:** Provide actionable recommendations grouped by priority and estimated impact, highlighting exactly what structure or entities competitors have that the user lacks.

## 6. User Workflow & Success Metrics (KPIs)
* **Workflow:** User submits URL -> System runs 6-engine analysis -> Dashboard presents AI visibility breakdown, competitor gaps, and prioritized recommendations -> User applies edits -> User re-runs analysis to track improvements over time (baseline vs. optimized).
* **Success Metrics:**
  * **Accuracy of Simulation:** Correlation between AIVO score and actual appearances in AI Overviews.
  * **User Engagement:** Number of URLs analyzed and iterative reports generated.
  * **Actionability:** Percentage of structural and entity recommendations successfully implemented by users resulting in score improvements.
