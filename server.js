/**
 * Firewall Education AI - Direct Backend Proxy Service
 * Connects the Education AI platform to external Google Gemini AI backend.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Configuration
const PORT = process.env.PORT || 3000;
const DEFAULT_API_KEY = 'AQ.Ab8RN6LkKt2XYsOJow3zYlu33Lrl-Dey5gkrMPXkP4MLIzUMgA';
const PRIMARY_MODEL = process.env.GEMINI_MODEL || 'gemini-3.8-flash';
const FALLBACK_MODELS = [
  'gemini-3.5-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
  'gemini-3.6-flash',
  'gemini-3-flash-preview'
];

const SYSTEM_PROMPT = `You are an expert, encouraging Educational AI Tutor designed strictly for academic learning.

Your Core Directives:
1. Direct Focus: Answer ONLY questions related to education, science, mathematics, computer science, history, languages, literature, and general academics.
2. Structure: Break down complex concepts step-by-step.
   - Start with a direct, 1-2 sentence core definition or summary.
   - Use clear bullet points, formulas, or short code blocks where relevant.
   - Provide a simple real-world example to illustrate the concept.
3. Tone & Clarity: Keep your tone academic, precise, engaging, and clear. Avoid filler phrases like "Sure! Here is the answer."
4. Off-Topic Filtering: If a user asks something unrelated to learning or education (such as entertainment gossip, casual banter, or off-topic chat), politely decline by stating: "I am designed specifically as an educational assistant. Please ask an academic, scientific, or conceptual question to continue!"`;

// MIME types for static file serving
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4'
};

/**
 * Forward question to external Gemini AI backend using provided API key
 */
async function callExternalGemini(question, history = [], customApiKey = null) {
  const activeKey = (customApiKey && String(customApiKey).trim()) || process.env.GEMINI_API_KEY || DEFAULT_API_KEY;
  const modelsToTry = [PRIMARY_MODEL, ...FALLBACK_MODELS];

  const contents = [];
  if (Array.isArray(history) && history.length > 0) {
    for (const item of history.slice(-6)) {
      if (item.role && item.text) {
        contents.push({
          role: item.role === 'ai' || item.role === 'model' ? 'model' : 'user',
          parts: [{ text: String(item.text) }]
        });
      }
    }
  }
  contents.push({
    role: 'user',
    parts: [{ text: String(question) }]
  });

  const requestPayload = {
    system_instruction: {
      parts: [{ text: SYSTEM_PROMPT }]
    },
    contents: contents,
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95
    }
  };

  let lastError = null;

  for (const model of modelsToTry) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${activeKey}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload)
      });

      const data = await response.json();

      if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
        const text = data.candidates[0].content.parts.map(p => p.text || '').join('').trim();
        if (text) {
          console.log(`[Gemini API] Successfully generated answer for question "${question.slice(0, 40)}..." using model: ${model}`);
          return {
            success: true,
            modelUsed: model,
            reply: text
          };
        }
      }

      if (data && data.error) {
        lastError = data.error.message || JSON.stringify(data.error);
        console.warn(`[Gemini API] Model ${model} returned error: ${lastError}`);
        continue;
      }
    } catch (err) {
      lastError = err.message;
      console.warn(`[Gemini API] Network error on model ${model}: ${err.message}`);
    }
  }

  // If Gemini API fails across all models, return explicit error notice rather than random templates
  console.error(`[Gemini API] All models exhausted. Last error: ${lastError}`);
  return {
    success: false,
    modelUsed: 'gemini-service-notice',
    reply: `### Notice: Unable to Generate Response\n\nGoogle Gemini AI could not complete this request at this moment.\n\n**Reason:** ${lastError || 'Service temporarily unavailable or rate limited'}.\n\nPlease ensure your API Key has active permissions, or provide a custom Gemini API Key using the API Key settings.`
  };
}

/**
 * Intelligent high-fidelity counseling generator adhering to the exact system prompt
 */
function generateStructuredCounselorFallback(question) {
  const qLower = question.toLowerCase();

  // Check if non-educational/non-career
  const nonEduKeywords = ['weather', 'cook', 'recipe', 'movie', 'song', 'joke', 'dating', 'football', 'cricket score'];
  const isNonEdu = nonEduKeywords.some(k => qLower.includes(k)) && !qLower.includes('degree') && !qLower.includes('career') && !qLower.includes('study');

  if (isNonEdu) {
    return "I am an Education and Career Counselor dedicated exclusively to guiding students on academic, degree, skill, and professional career trajectories. Please ask an academic or career-related query (such as degree roadmaps, college admissions, competitive exams, or technical skill pathways) so I can help you succeed.";
  }

  if (qLower.includes('ai') || qLower.includes('machine learning') || qLower.includes('data science')) {
    return `### Comprehensive Roadmap: Becoming an AI & Machine Learning Engineer

To build a career in Artificial Intelligence and Machine Learning, you need a balanced foundation of applied mathematics, computer science fundamentals, and modern deep learning frameworks.

---

### 1. Degree & Academic Pathways
* **Undergraduate Degrees**: B.Tech / B.E. / B.S. in Computer Science, Data Science, or AI & ML; alternatively, B.Sc. in Mathematics or Statistics with a subsequent MCA/M.Sc.
* **Key Academic Coursework**: Linear Algebra, Multivariable Calculus, Discrete Mathematics, Probability & Statistics, Data Structures & Algorithms, Database Management Systems.
* **Entrance Exams**:
  * **India**: JEE Main & JEE Advanced, BITSAT, State Engineering CETs, GATE (for M.Tech).
  * **International**: SAT/ACT (Undergraduate), GRE & TOEFL/IELTS (Graduate admissions in US/EU/UK).

---

### 2. Core Skill Stack & Practical Tools
* **Programming**: Python 3 (Object-Oriented Programming, Memory Management), C++ or Rust for performance kernels.
* **Data Science Libraries**: NumPy (vector operations), Pandas (tabular transformation), Matplotlib/Seaborn.
* **Machine Learning**: Scikit-Learn (Regression, Random Forests, SVMs, PCA, Gradient Boosting/XGBoost).
* **Deep Learning Frameworks**: PyTorch (tensors, autograd, custom layers), Hugging Face Transformers.
* **Generative AI & LLMs**: Fine-tuning with LoRA/QLoRA, Retrieval-Augmented Generation (RAG) with Vector Databases (Chroma/Pinecone), LangChain/LlamaIndex.
* **Deployment & MLOps**: Docker containers, FastAPI, ONNX Runtime, MLflow, AWS SageMaker / GCP Vertex AI.

---

### 3. Progressive Step-by-Step Trajectory
* **Phase 1 (Months 1-3)**: Master Python and Vector Mathematics (Linear Algebra & Calculus).
* **Phase 2 (Months 4-6)**: Classical ML algorithms and feature engineering through Kaggle competitions.
* **Phase 3 (Months 7-10)**: Deep Learning architectures (CNNs, Transformers) and build 3 end-to-end deployed AI web apps.
* **Phase 4 (Months 11+)**: Open-source contributions, Hugging Face models, and technical portfolio presentation.

---

### 4. Career Trajectories & Compensation
* **Junior AI/ML Engineer / Junior Data Scientist**: $75,000 - $110,000 (INR 8 - 18 LPA)
* **Senior Machine Learning Engineer**: $130,000 - $190,000 (INR 25 - 45 LPA)
* **AI Research Scientist / Principal Architect**: $220,000 - $350,000+ (INR 60 LPA - 1.5 Cr+)`;
  }

  if (qLower.includes('cyber') || qLower.includes('security') || qLower.includes('hack') || qLower.includes('pentest')) {
    return `### Comprehensive Roadmap: Cybersecurity & Ethical Hacking

Cybersecurity defense and offensive security demand deep practical knowledge of networking protocols, operating systems internals, and security tooling.

---

### 1. Degree & Educational Foundation
* **Degrees**: B.Tech in Cybersecurity / Computer Science / Information Technology, BCA/MCA, or B.Sc. IT.
* **Academic Prerequisites**: Computer Networking (TCP/IP), Operating Systems (Linux/Unix & Windows Internals), Cryptography, Scripting.
* **Entrance Prerequisites**: Standard engineering entrance exams (JEE, CETs) or direct university technology admissions.

---

### 2. Industry Certifications Matrix
* **Entry-Level (Filter Passing)**: CompTIA Security+, CompTIA Network+.
* **Blue Team (Defense / SOC)**: Blue Team Level 1 (BTL1), CompTIA CySA+.
* **Red Team (Penetration Testing)**: PNPT (Practical Network Penetration Tester), OSCP (Offensive Security Certified Professional).
* **Cloud Security**: AWS Certified Security - Specialty, Microsoft Certified: SC-200.

---

### 3. Step-by-Step Career Execution
* **Months 1-3**: Master TCP/IP, Subnetting, OSI model, Wireshark packet analysis, and Linux terminal command mastery.
* **Months 4-6**: Set up home virtual labs (VirtualBox, Kali Linux, Metasploitable). Solve boxes on TryHackMe and HackTheBox.
* **Months 7-9**: Earn CompTIA Security+ or BTL1. Learn SIEM tools (Splunk / Elastic) and incident response methodologies.
* **Months 10+**: Publish detailed CTF write-ups on GitHub/LinkedIn and apply for Junior SOC Analyst roles.

---

### 4. Career Trajectory & Salaries
* **SOC Analyst Tier 1 / Junior Pentester**: $70,000 - $95,000 (INR 6 - 12 LPA)
* **Senior Security Engineer / Penetration Tester**: $115,000 - $165,000 (INR 20 - 35 LPA)
* **Security Architect / Chief Information Security Officer (CISO)**: $190,000 - $300,000+ (INR 50 LPA - 1.2 Cr+)`;
  }

  return `### Structured Academic & Career Guidance

Here is your tailored educational breakdown addressing your query:

---

### 1. Academic & Degree Foundations
* **Recommended Qualifications**: Select an accredited degree in Computer Science, Information Technology, or your core discipline. Prioritize institutions with robust campus placements, internship programs, and lab facilities.
* **Key Prerequisites**: Analytical problem solving, foundational mathematics, communication skills, and continuous self-study.

---

### 2. Core Skill Development Plan
* **Prerequisites (Phase 1)**: Understand foundational principles, core terminology, and set up your development environment.
* **Applied Learning (Phase 2)**: Build 3 non-trivial projects solving actual practical challenges. Host code publicly on GitHub.
* **Industry Credentials (Phase 3)**: Obtain accredited certifications (AWS, Google Cloud, CompTIA, or discipline-specific credentials) to validate your capabilities.

---

### 3. Career Trajectory & Milestones
* **Entry Level (Years 0-2)**: Secure graduate roles or internships; prioritize hands-on mentorship over early salary ceilings.
* **Mid-Level (Years 3-5)**: Specialize in high-demand domains, take ownership of production systems, and mentor junior peers.
* **Senior Leadership (Years 6+)**: Transition toward Architect, Principal Engineer, or Engineering Management roles.`;
}

// Create HTTP Server
const server = http.createServer(async (req, res) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
  const pathname = reqUrl.pathname;

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-gemini-key, x-api-key');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API Route: POST /api/chat
  if (req.method === 'POST' && (pathname === '/api/chat' || pathname === '/api/counselor')) {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const question = payload.message || payload.question || '';
        const history = payload.history || [];
        const userApiKey = payload.apiKey || req.headers['x-gemini-key'] || req.headers['x-api-key'] || null;

        if (!question.trim()) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Message cannot be empty.' }));
          return;
        }

        const aiResponse = await callExternalGemini(question, history, userApiKey);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(aiResponse));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          error: 'Internal Server Error',
          details: err.message
        }));
      }
    });
    return;
  }

  // Validate API key endpoint
  if (req.method === 'POST' && pathname === '/api/validate-key') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const keyToTest = (payload.apiKey && payload.apiKey.trim()) || DEFAULT_API_KEY;
        const testRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${keyToTest}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: 'ping' }] }] })
        });
        const testData = await testRes.json();
        if (testData && testData.candidates && testData.candidates[0]) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ valid: true, message: 'Gemini API Key is valid and active.' }));
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ valid: false, message: testData.error ? testData.error.message : 'Invalid response from Gemini.' }));
        }
      } catch (err) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ valid: false, message: err.message }));
      }
    });
    return;
  }

  // Health check endpoint
  if (req.method === 'GET' && pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'online',
      service: 'Firewall Education AI Backend Proxy',
      modelConfigured: PRIMARY_MODEL,
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // Static File Serving
  if (req.method === 'GET' || req.method === 'HEAD') {
    let filePath = pathname === '/' ? '/index.html' : pathname;
    if (filePath === '/education-ai' || filePath === '/counselor' || filePath === '/chat') {
      filePath = '/counselor.html';
    }

    const safePath = path.normalize(filePath).replace(/^(\.\.[\/\\])+/, '');
    const absolutePath = path.join(__dirname, safePath);

    fs.stat(absolutePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('404 Not Found - Firewall Education AI Platform');
        return;
      }

      const ext = path.extname(absolutePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': stats.size
      });

      if (req.method === 'HEAD') {
        res.end();
        return;
      }

      const stream = fs.createReadStream(absolutePath);
      stream.pipe(res);
    });
    return;
  }

  res.writeHead(405, { 'Content-Type': 'text/plain' });
  res.end('Method Not Allowed');
});

// Start Server
server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`⚡ Firewall Education AI Backend Proxy is Active!`);
  console.log(`🌐 Server running at: http://localhost:${PORT}`);
  console.log(`🤖 Model Target: ${PRIMARY_MODEL} (with adaptive fallback)`);
  console.log(`🎓 System Prompt: Expert Education and Career Counselor`);
  console.log(`📡 Direct API Proxy Endpoint: http://localhost:${PORT}/api/chat`);
  console.log(`=======================================================`);
});
