/**
 * ══════════════════════════════════════════════════════════════════════════════
 * FIREWALL CAREER ROADMAP & GUIDANCE ENGINE
 * 
 * Provides for any target job:
 * 1. 🚀 How to easily get the job (ATS hacks, cold outreach, portfolio rules, interviews, negotiation)
 * 2. ⚡ What kind of skills to learn (Foundations, in-demand toolstack, pro differentiators, soft skills)
 * 3. 🎓 What type of courses to study (Free courses, certified credentials, practice labs, study routine)
 * 4. 🛣️ Step-by-step 0-to-Hero roadmap timeline
 * ══════════════════════════════════════════════════════════════════════════════
 */

(function () {
  'use strict';

  // ════════════════════════════════════════════════════════════════════════════
  // 1. COMPREHENSIVE CAREER DATABASE
  // ════════════════════════════════════════════════════════════════════════════
  const CAREER_DATABASE = {
    'ai': {
      title: 'AI & Machine Learning Engineer',
      tagline: 'Design, fine-tune, and deploy neural networks, foundational LLMs, and real-time inference systems.',
      duration: '6 to 9 Months (15-20 hrs/week)',
      difficulty: 'Advanced / High-Yield',
      salary: '$135,000 - $210,000 / INR 18 - 45 LPA',

      howToGetJobEasily: {
        headline: 'Fast-Track Playbook to Land an AI/ML Role Easily',
        summary: 'Because thousands of applicants submit generic certificates, companies look for candidates who prove they can take models from Jupyter Notebooks to live production web endpoints.',
        steps: [
          {
            title: '1. The ATS Resume Keyword Strategy',
            text: 'Bypass automated filters by including specific high-intent keywords: "PyTorch", "LoRA Fine-tuning", "vLLM", "Vector Databases (Pinecone/Milvus)", "RAG Pipeline", "P99 Latency Optimization", and "Docker CUDA". Frame every bullet point around business outcome: "Reduced inference latency by 42% using quantization (AWQ/GGUF) on AWS EC2 GPU instances."'
          },
          {
            title: '2. Direct Outreach & Cold Referral Hack',
            text: 'Skip the 1,000+ public job portal queue. Find Engineering Managers or Lead ML Engineers at Series A/B AI startups on LinkedIn or Twitter/X. Send this exact message:\n\n"Hi [Name], loved your team\'s recent deployment of [Product Feature]. I noticed [specific bottleneck, e.g., token latency or search accuracy] and built a lightweight open-source prototype using hybrid dense-sparse retrieval that benchmarks 35ms faster. Here is the 60-second video demo: [Loom Link]. Would love 5 minutes of your feedback if you have a moment!"'
          },
          {
            title: '3. Proof of Work (The 3-Project Rule)',
            text: 'Hiring managers rarely download code repos. Host 3 live, clickable demos on Hugging Face Spaces or Vercel:\n• Project 1: Enterprise RAG search engine with hybrid reranking and hallucination evaluation.\n• Project 2: Fine-tuned domain LLM (using LoRA/QLoRA) with streaming FastAPI endpoints.\n• Project 3: Real-time multimodal computer vision or speech classifier deployed in Docker.'
          },
          {
            title: '4. Cracking the AI Technical Interview',
            text: 'Focus 70% of your prep on ML System Design (e.g., "Design a Recommendation Engine for Netflix" or "Design a Streaming RAG Pipeline"). In coding rounds, practice LeetCode Medium (Arrays, Hash Maps, Dynamic Programming) and PyTorch tensor manipulation.'
          },
          {
            title: '5. High-Paying Salary Negotiation',
            text: 'Always ask for the full compensation band before sharing your current numbers: "Based on market research and the specialized production requirements of this role, I am targeting between [Top Band]. What is the budgeted range for this position?"'
          }
        ]
      },

      skillsToLearn: [
        {
          tier: 'Level 1: Core Foundations (Months 0-2)',
          color: '#38bdf8',
          items: [
            { name: 'Python 3 Mastery', desc: 'OOP, generators, decorators, asynchronous programming (asyncio), memory profiling.' },
            { name: 'Applied Mathematics', desc: 'Linear Algebra (eigenvalues, SVD), Multivariable Calculus (gradients, chain rule), Statistics (Bayes, hypothesis testing).' },
            { name: 'Data Manipulation', desc: 'NumPy vectorized broadcasting, Pandas data wrangling, data hygiene, and leak prevention.' }
          ]
        },
        {
          tier: 'Level 2: Classical ML & Deep Learning (Months 2-5)',
          color: '#22c55e',
          items: [
            { name: 'Scikit-Learn Algorithms', desc: 'Random Forests, XGBoost, LightGBM, SVMs, PCA dimensionality reduction, ROC-AUC evaluation.' },
            { name: 'PyTorch Deep Learning', desc: 'Custom layers, autograd mechanics, loss functions, learning rate schedules, DataLoader optimization.' },
            { name: 'Transformers & NLP', desc: 'Self-attention mechanism, Hugging Face transformers library, BERT, RoBERTa, tokenizers.' }
          ]
        },
        {
          tier: 'Level 3: Generative AI & Production MLOps (Months 5-8)',
          color: '#a855f7',
          items: [
            { name: 'LLM Fine-Tuning', desc: 'LoRA, QLoRA, Unsloth, PEFT, Dataset curation, RLHF/DPO alignment.' },
            { name: 'Advanced RAG Systems', desc: 'Vector databases (Pinecone, Chroma), hybrid search, Cross-Encoder rerankers, LangChain & LlamaIndex.' },
            { name: 'Model Serving & Inference', desc: 'vLLM, TensorRT-LLM, Ollama, FastAPI streaming endpoints, Docker containerization with CUDA.' }
          ]
        },
        {
          tier: 'Level 4: Essential Soft Skills',
          color: '#f59e0b',
          items: [
            { name: 'Stakeholder Translation', desc: 'Explaining model trade-offs (accuracy vs latency vs GPU compute cost) to business leadership.' },
            { name: 'Technical Storytelling', desc: 'Writing clean GitHub README documentation and technical design docs.' }
          ]
        }
      ],

      coursesToStudy: [
        {
          category: 'Best Free Courses (High-Yield)',
          icon: '🎁',
          courses: [
            { title: 'Machine Learning Specialization by Andrew Ng', platform: 'Coursera (Audit Free)', badge: 'Free / Gold Standard', desc: 'The most revered foundational ML course covering linear regression, neural networks, and decision trees.' },
            { title: 'Fast.ai: Practical Deep Learning for Coders', platform: 'Fast.ai', badge: '100% Free', desc: 'Hands-on top-down deep learning using PyTorch, ideal for practical builders.' },
            { title: 'Hugging Face Official NLP & Audio Course', platform: 'HuggingFace.co', badge: '100% Free', desc: 'Official step-by-step interactive labs for modern Transformer models, pipelines, and fine-tuning.' },
            { title: 'Stanford CS224N: Natural Language Processing with Deep Learning', platform: 'YouTube / Stanford', badge: 'Free University Lectures', desc: 'Deep theoretical dive into modern language models and attention mechanics.' }
          ]
        },
        {
          category: 'Best Certified & Industry-Recognized Courses',
          icon: '🏆',
          courses: [
            { title: 'Deep Learning Specialization (DeepLearning.AI)', platform: 'Coursera', badge: 'Official Certificate', desc: 'Covers CNNs, Sequence Models, Transformers, and hyperparameter tuning.' },
            { title: 'Generative AI with Large Language Models', platform: 'Coursera & AWS', badge: 'Certified Track', desc: 'Covers the full generative AI lifecycle, parameter-efficient fine-tuning, and model evaluation.' },
            { title: 'AWS Certified Machine Learning - Specialty', platform: 'AWS Certification', badge: 'Industry Accredited', desc: 'Strong resume filter-passer for enterprise cloud ML engineering.' }
          ]
        },
        {
          category: 'Recommended Practice Labs & Platforms',
          icon: '🛠️',
          courses: [
            { title: 'Kaggle Competitions & Datasets', platform: 'Kaggle.com', badge: 'Competitive Practice', desc: 'Solve tabular and vision competitions to benchmark your models against top practitioners.' },
            { title: 'NeetCode 150 (Python Algorithms)', platform: 'NeetCode.io', badge: 'Interview Prep', desc: 'Master data structures & algorithms required for big tech screening calls.' }
          ]
        }
      ],

      timeline: [
        { phase: 'Phase 1: Months 0-2', title: 'Math, Python & Data Foundations', desc: 'Master Python OOP, Linear Algebra, Multivariable Calculus, NumPy, and Pandas.' },
        { phase: 'Phase 2: Months 2-4', title: 'Classical ML & PyTorch Deep Learning', desc: 'Build regression/classification models with Scikit-Learn, master neural networks in PyTorch.' },
        { phase: 'Phase 3: Months 4-6', title: 'Generative AI, RAG & LLMs', desc: 'Deploy production RAG search engines and fine-tune models with LoRA/QLoRA.' },
        { phase: 'Phase 4: Months 6-8', title: 'MLOps, 3 Portfolio Demos & Outreach', desc: 'Deploy models via FastAPI and Docker, launch live demos, and execute direct outreach to hiring leads.' }
      ]
    },

    'fullstack': {
      title: 'Full Stack Web & AI Developer',
      tagline: 'Build interactive frontend user interfaces, resilient backend microservices, and AI integrations.',
      duration: '4 to 6 Months (15-20 hrs/week)',
      difficulty: 'High-Demand / Fast Hiring',
      salary: '$110,000 - $165,000 / INR 12 - 28 LPA',

      howToGetJobEasily: {
        headline: 'Fast-Track Playbook to Land a Full Stack Role Easily',
        summary: 'Full Stack hiring has shifted away from basic todo-apps. Employers urgently want developers who write clean TypeScript, understand database schemas, and can integrate AI APIs.',
        steps: [
          {
            title: '1. The ATS Resume Keyword Strategy',
            text: 'Ensure these keywords are prominently listed in your skills section: "TypeScript", "React 18/19", "Next.js (App Router)", "Node.js", "PostgreSQL", "Prisma/Drizzle ORM", "Redis", "Docker", "Tailwind CSS", and "REST / GraphQL APIs". Mention unit test coverage and Lighthouse performance benchmarks (95+ score).'
          },
          {
            title: '2. Direct Outreach & Cold Referral Hack',
            text: 'Search for "Founder", "CTO", or "Engineering Lead" at high-growth startups on LinkedIn. Send this high-converting message:\n\n"Hi [Name], loved your product\'s latest update. I audited your web app and built a 1-minute video demo showing how optimizing your bundle size and implementing optimistic UI updates could improve your initial page load by ~35%. Here is the Loom link: [Link]. No worries if you\'re busy, just wanted to share!"'
          },
          {
            title: '3. Proof of Work (The 3-Project Rule)',
            text: 'Never present generic tutorial clones (like standard clones of Twitter or Netflix). Instead build:\n• Project 1: Full-stack SaaS application with Stripe billing, user authentication (Supabase/Clerk), and database migrations.\n• Project 2: Real-time collaborative workspace with WebSockets, optimistic UI updates, and conflict resolution.\n• Project 3: AI-assisted workflow dashboard with streaming HTTP responses and vector search.'
          },
          {
            title: '4. Cracking the Full Stack Interview',
            text: 'Prepare for live pair programming (building a small feature in React/TypeScript in 45 minutes) and basic Full Stack System Design (designing a scalable rate-limited API with Redis and PostgreSQL).'
          },
          {
            title: '5. High-Paying Salary Negotiation',
            text: 'When an offer arrives, counter respectfully: "I am extremely excited about this mission. However, given my full-stack capabilities across both modern frontend and cloud backend architectures, I was targeting [15% above offer]. If you can meet me at [target], I am ready to sign today."'
          }
        ]
      },

      skillsToLearn: [
        {
          tier: 'Level 1: Modern Web Core (Months 0-1.5)',
          color: '#38bdf8',
          items: [
            { name: 'Strict TypeScript & ES6+', desc: 'Generics, union types, type guards, async/await, closures, event loop, Promises.' },
            { name: 'Semantic HTML5 & Modern CSS3', desc: 'CSS Flexbox, CSS Grid, custom properties (variables), responsive layout design, accessibility (WCAG).' },
            { name: 'Git & Command Line', desc: 'Branching strategies, merge conflict resolution, rebase workflows, GitHub pull requests.' }
          ]
        },
        {
          tier: 'Level 2: Frontend & Server-Side Rendering (Months 1.5-3)',
          color: '#22c55e',
          items: [
            { name: 'React 18/19 & Hooks', desc: 'useState, useEffect, useMemo, custom hooks, context API, component lifecycle.' },
            { name: 'Next.js App Router', desc: 'Server Components (RSC), Client Components, Server Actions, Dynamic Routing, Metadata SEO.' },
            { name: 'Tailwind CSS & Styling', desc: 'Utility-first styling, design system tokens, responsive variants, dark mode toggling.' },
            { name: 'State Management & Fetching', desc: 'Zustand, TanStack Query (React Query) for caching, optimistic UI updates, and pagination.' }
          ]
        },
        {
          tier: 'Level 3: Backend, Databases & Cloud (Months 3-5)',
          color: '#a855f7',
          items: [
            { name: 'Node.js & Express / Fastify', desc: 'RESTful API routing, middleware, JWT & OAuth2 auth, rate limiting, error handling.' },
            { name: 'PostgreSQL & ORMs', desc: 'Relational schema modeling, foreign keys, indexes, joins, Prisma ORM / Drizzle ORM.' },
            { name: 'Caching & Queues', desc: 'Redis in-memory caching, session storage, BullMQ background job processing.' },
            { name: 'Docker & Deployment', desc: 'Containerizing full-stack apps, multi-stage Dockerfiles, deployment to Vercel, Railway, or AWS.' }
          ]
        },
        {
          tier: 'Level 4: Essential Soft Skills',
          color: '#f59e0b',
          items: [
            { name: 'Product Empathy', desc: 'Understanding business requirements and user friction before writing code.' },
            { name: 'Code Review & Teamwork', desc: 'Giving constructive PR reviews and writing clear commit messages.' }
          ]
        }
      ],

      coursesToStudy: [
        {
          category: 'Best Free Courses (Top Rated)',
          icon: '🎁',
          courses: [
            { title: 'The Odin Project: Full Stack JavaScript', platform: 'TheOdinProject.com', badge: '100% Free / Best Foundation', desc: 'Hands-on project-based curriculum covering JavaScript, React, Node.js, and databases from scratch.' },
            { title: 'Full Stack Open by University of Helsinki', platform: 'FullStackOpen.com', badge: 'Free University Course', desc: 'World-class modern course covering React, Redux, Node.js, Express, MongoDB/PostgreSQL, TypeScript, and CI/CD.' },
            { title: 'Next.js Learn (Official Interactive Tutorial)', platform: 'Nextjs.org/learn', badge: '100% Free', desc: 'Official interactive course created by Vercel covering App Router, Server Actions, and database integration.' },
            { title: 'freeCodeCamp: Responsive Web Design & JavaScript', platform: 'freeCodeCamp.org', badge: '100% Free', desc: 'Self-paced coding challenges to master browser fundamentals.' }
          ]
        },
        {
          category: 'Best Certified & Masterclass Tracks',
          icon: '🏆',
          courses: [
            { title: 'Meta Front-End & Back-End Developer Professional Certificate', platform: 'Coursera', badge: 'Industry Accredited', desc: 'Created by Meta engineers covering React, version control, API creation, and coding interview prep.' },
            { title: 'The Complete 2026 Web Development Bootcamp', platform: 'Udemy (Angela Yu)', badge: 'Comprehensive Bootcamp', desc: 'Great for beginners wanting all pieces in one structured video format.' }
          ]
        },
        {
          category: 'Practice & Coding Interview Platforms',
          icon: '🛠️',
          courses: [
            { title: 'Frontend Mentor', platform: 'FrontendMentor.io', badge: 'Real Figma Designs', desc: 'Build professional websites from real Figma design specs to build your portfolio.' },
            { title: 'LeetCode (Blind 75 / NeetCode)', platform: 'LeetCode.com', badge: 'Coding Interview Prep', desc: 'Master the top 75 recurring algorithm questions asked by technology companies.' }
          ]
        }
      ],

      timeline: [
        { phase: 'Phase 1: Months 0-1.5', title: 'TypeScript & JavaScript Foundations', desc: 'Master JavaScript ES6+, strict TypeScript, HTML5 semantics, and CSS layout engines.' },
        { phase: 'Phase 2: Months 1.5-3', title: 'React & Next.js App Architecture', desc: 'Build dynamic web applications with React, Next.js Server Components, and Tailwind CSS.' },
        { phase: 'Phase 3: Months 3-4.5', title: 'Backend APIs, PostgreSQL & Auth', desc: 'Build Node.js APIs, design relational databases with Prisma/Drizzle, and implement secure auth.' },
        { phase: 'Phase 4: Months 4.5-6', title: '3 Flagship Projects, Portfolio & Job Hunt', desc: 'Deploy 3 live SaaS apps with custom domains, optimize resume keywords, and reach out to engineering leads.' }
      ]
    },

    'cybersecurity': {
      title: 'Cybersecurity Analyst & Ethical Hacker',
      tagline: 'Defend enterprise infrastructure, investigate threats, conduct penetration tests, and secure cloud environments.',
      duration: '5 to 8 Months (15-20 hrs/week)',
      difficulty: 'High-Demand / Security Clearance',
      salary: '$120,000 - $180,000 / INR 14 - 36 LPA',

      howToGetJobEasily: {
        headline: 'Fast-Track Playbook to Land a Cybersecurity Role Easily',
        summary: 'Cybersecurity has a severe talent shortage, but HR filters automatically reject junior resumes without industry credentials or demonstrable hands-on lab experience.',
        steps: [
          {
            title: '1. The ATS Certification Filter Rule',
            text: 'Unlike standard software engineering, cybersecurity recruiters heavily filter by certifications. Obtain CompTIA Security+ or Blue Team Level 1 (BTL1). Having one of these guarantees your resume passes the initial automated HR filter.'
          },
          {
            title: '2. Publish Incident Post-Mortems & Lab Writeups',
            text: 'Set up an isolated home lab (Kali Linux + pfSense + Active Directory). Document your attacks and defensive configurations as formal incident reports on GitHub. Hiring managers love seeing professional, structured writeups.'
          },
          {
            title: '3. Compete in CTFs & Responsible Disclosure',
            text: 'Participate in TryHackMe, HackTheBox, or National Cyber League (NCL). Submitting even 1 valid vulnerability to a responsible disclosure program (Bugcrowd or HackerOne) sets you apart from 99% of degree-only applicants.'
          },
          {
            title: '4. Network at Local BSides & OWASP Meetups',
            text: 'Over 60% of junior security roles are filled through community networking. Attend local OWASP or BSides security conferences, meet senior SOC managers, and ask about their defensive challenges.'
          },
          {
            title: '5. Technical Interview Mastery',
            text: 'Be prepared for scenario-based questions: "A user clicked a phishing link and malware is spreading across the subnet. Walk me through your first 15 minutes of response." Practice log analysis using Wireshark and Splunk.'
          }
        ]
      },

      skillsToLearn: [
        {
          tier: 'Level 1: Networking & Systems (Months 0-2)',
          color: '#38bdf8',
          items: [
            { name: 'TCP/IP & Networking Protocols', desc: 'OSI 7-layer model, packet headers, DNS, DHCP, HTTP/S, ARP, routing tables.' },
            { name: 'Linux & Bash Scripting', desc: 'Permissions, systemd services, log locations (/var/log), automated shell scripts.' },
            { name: 'Packet Analysis', desc: 'Wireshark traffic capture, Tshark, identifying unencrypted credentials and anomalous beacons.' }
          ]
        },
        {
          tier: 'Level 2: Defensive Security & SOC Operations (Months 2-5)',
          color: '#22c55e',
          items: [
            { name: 'SIEM Operations', desc: 'Splunk, Microsoft Sentinel, Elastic SIEM, querying security logs, building alert dashboards.' },
            { name: 'Endpoint Detection & Response (EDR)', desc: 'CrowdStrike, Defender for Endpoint, memory forensics, process tree inspection.' },
            { name: 'MITRE ATT&CK Framework', desc: 'Mapping adversary tactics, techniques, and procedures (TTPs) to defensive controls.' }
          ]
        },
        {
          tier: 'Level 3: Offensive Security & Cloud Defense (Months 5-8)',
          color: '#a855f7',
          items: [
            { name: 'Web App Pentesting (OWASP Top 10)', desc: 'SQLi, XSS, SSRF, IDOR, authentication bypass using Burp Suite Professional.' },
            { name: 'Active Directory Attacks & Defense', desc: 'Kerberoasting, AS-REP Roasting, Pass-the-Hash, BloodHound privilege graph auditing.' },
            { name: 'Cloud Security Posture', desc: 'AWS IAM privilege auditing, misconfigured S3 buckets, cloud trail forensics.' }
          ]
        },
        {
          tier: 'Level 4: Essential Soft Skills',
          color: '#f59e0b',
          items: [
            { name: 'Technical Report Writing', desc: 'Writing executive-level risk summaries and developer-friendly remediation guides.' },
            { name: 'Calm Incident Triage', desc: 'Methodical troubleshooting under high pressure during active security incidents.' }
          ]
        }
      ],

      coursesToStudy: [
        {
          category: 'Best Free Courses & Hands-on Labs',
          icon: '🎁',
          courses: [
            { title: 'Professor Messer CompTIA Security+ (SY0-701)', platform: 'YouTube', badge: '100% Free Video Course', desc: 'The most popular free video course covering every objective of the Security+ exam.' },
            { title: 'PortSwigger Web Security Academy', platform: 'PortSwigger.net', badge: '100% Free / Industry Gold Standard', desc: 'Created by the makers of Burp Suite. Free interactive labs on every modern web vulnerability.' },
            { title: 'TryHackMe Pre-Security & SOC Level 1 Path', platform: 'TryHackMe.com', badge: 'Interactive Virtual Labs', desc: 'Gamified hands-on virtual machines to learn Linux, networking, and incident response.' }
          ]
        },
        {
          category: 'Best Industry-Recognized Certifications',
          icon: '🏆',
          courses: [
            { title: 'CompTIA Security+ (SY0-701)', platform: 'CompTIA', badge: 'Top HR Filter Passer', desc: 'The most requested baseline security certification by corporate and defense recruiters.' },
            { title: 'Blue Team Level 1 (BTL1)', platform: 'Security Blue Team', badge: 'Hands-on Practical Exam', desc: 'A 24-hour practical defense exam covering SIEM, phishing analysis, forensics, and threat intel.' },
            { title: 'Practical Network Penetration Tester (PNPT)', platform: 'TCM Security', badge: 'Practical Pentest Cert', desc: 'Real-world penetration testing exam including external OSINT, Active Directory compromise, and debrief.' }
          ]
        }
      ],

      timeline: [
        { phase: 'Phase 1: Months 0-2', title: 'Networking, Linux & Security Fundamentals', desc: 'Master TCP/IP, Wireshark packet capture, Linux commands, and pass CompTIA Security+.' },
        { phase: 'Phase 2: Months 2-4', title: 'SOC Defense & SIEM Log Analysis', desc: 'Set up an Elastic/Splunk home lab and learn to detect malware, brute force, and privilege escalation.' },
        { phase: 'Phase 3: Months 4-6', title: 'Web App Pentesting & Active Directory', desc: 'Complete PortSwigger labs, attack and defend an Active Directory forest, and write reports.' },
        { phase: 'Phase 4: Months 6-8', title: 'Portfolio Writeups, BSides Networking & Hiring', desc: 'Publish 5 security reports on GitHub, attend local security meetups, and apply for SOC Analyst roles.' }
      ]
    },

    'data': {
      title: 'Data Scientist & Machine Learning Specialist',
      tagline: 'Transform messy data into strategic business intelligence, predictive models, and executive insights.',
      duration: '4 to 7 Months (15-20 hrs/week)',
      difficulty: 'High-Demand / Analytical',
      salary: '$115,000 - $175,000 / INR 12 - 30 LPA',

      howToGetJobEasily: {
        headline: 'Fast-Track Playbook to Land a Data Science Role Easily',
        summary: 'Companies don\'t just hire data scientists for theoretical algorithms — they hire problem solvers who can translate messy business questions into quantifiable revenue and cost savings.',
        steps: [
          {
            title: '1. Master Advanced SQL First',
            text: 'Over 80% of data science interviews begin with an SQL test. Master Window Functions (ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD), Common Table Expressions (CTEs), and complex aggregations. Passing the SQL screen is your gateway.'
          },
          {
            title: '2. Frame Every Project in Business Dollars',
            text: 'Never say: "Built a Random Forest model with 87% accuracy." Instead say: "Developed a customer churn prediction engine that identified 12,000 high-risk subscribers, enabling targeted retention campaigns that preserved an estimated $420,000 in Annual Recurring Revenue (ARR)."'
          },
          {
            title: '3. Host Interactive Streamlit Web Apps',
            text: 'Recruiters do not read raw Jupyter Notebooks. Wrap your predictive models in an interactive Streamlit or Gradio dashboard, deploy it free on Streamlit Cloud, and place the clickable URL directly on your resume.'
          },
          {
            title: '4. The Modern Data Stack Advantage',
            text: 'Companies are replacing legacy pipelines with the modern data stack. Adding dbt (data build tool) and Snowflake / BigQuery to your resume instantly elevates you above candidate pools who only know basic Pandas.'
          },
          {
            title: '5. A/B Testing & Experimentation Mastery',
            text: 'Tech companies rely heavily on experimentation. Be ready to explain sample size calculation, p-values, statistical power (beta), Type I/II errors, and how to deal with metric variance.'
          }
        ]
      },

      skillsToLearn: [
        {
          tier: 'Level 1: SQL, Python & Statistics (Months 0-2)',
          color: '#38bdf8',
          items: [
            { name: 'Advanced SQL', desc: 'Window functions, CTEs, subqueries, self-joins, query optimization, indexing.' },
            { name: 'Python for Analytics', desc: 'Pandas data wrangling, NumPy vectorized math, data cleaning, outlier imputation.' },
            { name: 'Statistical Inference', desc: 'Hypothesis testing, A/B experiment design, probability distributions, confidence intervals.' }
          ]
        },
        {
          tier: 'Level 2: BI & Exploratory Modeling (Months 2-4)',
          color: '#22c55e',
          items: [
            { name: 'Tableau / PowerBI', desc: 'Interactive dashboards, DAX / calculated fields, executive KPIs, visual storytelling.' },
            { name: 'Machine Learning (Scikit-Learn)', desc: 'Linear/Logistic regression, Decision Trees, Random Forests, XGBoost, Cross-Validation.' },
            { name: 'Feature Engineering', desc: 'One-hot encoding, feature scaling, correlation analysis, handling class imbalance (SMOTE).' }
          ]
        },
        {
          tier: 'Level 3: Modern Warehouses & Deployment (Months 4-6)',
          color: '#a855f7',
          items: [
            { name: 'Cloud Data Warehouses', desc: 'Snowflake or Google BigQuery, querying large enterprise datasets, cost optimization.' },
            { name: 'dbt (Data Build Tool)', desc: 'Modular SQL transformations, automated data testing, documentation generation.' },
            { name: 'Model Serving', desc: 'Streamlit interactive web apps, FastAPI endpoints, Docker containerization.' }
          ]
        },
        {
          tier: 'Level 4: Essential Soft Skills',
          color: '#f59e0b',
          items: [
            { name: 'Executive Presentation', desc: 'Distilling complex statistical models into 3 clear executive bullet points.' },
            { name: 'Product Sense', desc: 'Connecting metrics (DAU, CAC, LTV) to strategic business growth levers.' }
          ]
        }
      ],

      coursesToStudy: [
        {
          category: 'Best Free Courses & Guides',
          icon: '🎁',
          courses: [
            { title: 'Google Data Analytics Professional Certificate', platform: 'Coursera (Audit Free)', badge: 'Free Audit Available', desc: 'Comprehensive introduction to SQL, data cleaning, analysis, and visualization.' },
            { title: 'Mode Analytics: Advanced SQL School', platform: 'Mode.com', badge: '100% Free Interactive', desc: 'The best interactive guide for mastering SQL joins, aggregations, and window functions.' },
            { title: 'Kaggle: Intro to Machine Learning & Pandas', platform: 'Kaggle.com/learn', badge: '100% Free Micro-Courses', desc: 'Bite-sized interactive coding exercises in browser notebooks.' }
          ]
        },
        {
          category: 'Best Certified & Industry Credential Tracks',
          icon: '🏆',
          courses: [
            { title: 'IBM Data Science Professional Certificate', platform: 'Coursera', badge: 'Certified Program', desc: 'Covers Python, SQL, data visualization, and applied machine learning capstones.' },
            { title: 'dbt Fundamentals Certification', platform: 'dbt Learn', badge: 'Free Industry Certificate', desc: 'Learn the modern data transformation tool used across high-growth tech companies.' }
          ]
        }
      ],

      timeline: [
        { phase: 'Phase 1: Months 0-2', title: 'Advanced SQL, Python & Statistics', desc: 'Solve 50+ SQL queries on StrataScratch and master statistical hypothesis testing.' },
        { phase: 'Phase 2: Months 2-4', title: 'Predictive Modeling & Streamlit Apps', desc: 'Build 2 machine learning models (churn prediction & pricing forecasting) with Streamlit UIs.' },
        { phase: 'Phase 3: Months 4-5.5', title: 'Snowflake, dbt & Modern Analytics', desc: 'Build a production data pipeline in dbt transforming raw events into clean reporting tables.' },
        { phase: 'Phase 4: Months 5.5-7', title: 'Portfolio Presentation, Referrals & Interviews', desc: 'Package 3 projects with dollar ROI summaries, practice product sense cases, and apply for roles.' }
      ]
    },

    'cloud_devops': {
      title: 'Cloud & DevOps Solutions Architect',
      tagline: 'Design, provision, and automate resilient multi-cloud infrastructure, CI/CD pipelines, and container meshes.',
      duration: '5 to 7 Months (15-20 hrs/week)',
      difficulty: 'High-Demand / Mission-Critical',
      salary: '$130,000 - $195,000 / INR 16 - 40 LPA',

      howToGetJobEasily: {
        headline: 'Fast-Track Playbook to Land a Cloud & DevOps Architect Role Easily',
        summary: 'Cloud recruiters prioritize candidates who show live Infrastructure-as-Code (Terraform) repos with automated GitHub Actions deployments, rather than multiple generic paper certificates.',
        steps: [
          {
            title: '1. The ATS Resume Keyword Strategy for Cloud & DevOps',
            text: 'Pack your resume with verified tooling nouns: "Kubernetes (EKS/GKE)", "Terraform IaC", "Docker Containerization", "GitHub Actions CI/CD", "AWS (IAM, VPC, S3, ECS)", "ArgoCD GitOps", "Prometheus & Grafana Observability", and "SOC 2 Security Hardening". Highlight business uptime and cost reduction: "Reduced monthly AWS cloud compute expenditure by 34% via Karpenter auto-scaling and spot instances."'
          },
          {
            title: '2. Direct Outreach to Infrastructure Directors & VP of Eng',
            text: 'Target Engineering Managers and DevOps Leads at fast-growing SaaS startups on LinkedIn. Message template:\n\n"Hi [Name], huge fan of your engineering team\'s work scaling [Product]. I noticed many teams struggle with CI/CD deployment flakiness and high AWS egress costs. I created an open-source, production-ready Terraform blueprint for automated zero-downtime Blue/Green deployments on Kubernetes with live Grafana monitoring: [GitHub Link]. Would love to share a 3-minute walkthrough if you find it helpful!"'
          },
          {
            title: '3. Proof of Work (The 3 Multi-Cloud Projects)',
            text: 'Host complete reproducible IaC repositories on GitHub with architectural Mermaid diagrams:\n• Project 1: Multi-region Kubernetes cluster managed with Terraform, Helm, and ArgoCD GitOps.\n• Project 2: High-throughput microservices CI/CD pipeline with automated Docker builds, Trivy security scanning, and automated staging rollouts.\n• Project 3: Production observability stack with Prometheus metrics, PromQL alerting rules, and custom Grafana dashboards.'
          },
          {
            title: '4. Cracking Cloud Architecture & Whiteboard Interviews',
            text: 'Master Systems Design questions: "Design a fault-tolerant, auto-scaling backend that handles 50,000 requests/sec with 99.99% uptime." Be prepared to explain trade-offs between VPC peering vs Transit Gateway, managed databases vs self-hosted, and secret management strategies (HashiCorp Vault vs AWS Secrets Manager).'
          },
          {
            title: '5. High-Impact Salary Negotiation',
            text: 'Cloud architects are high-leverage roles. State your target compensation firmly backed by industry data and emphasize your ability to cut cloud bills and eliminate outage risks for the company.'
          }
        ]
      },

      skillsToLearn: [
        {
          tier: 'Level 1: Core Linux & Networking Foundations (Months 0-2)',
          color: '#38bdf8',
          items: [
            { name: 'Linux System Administration', desc: 'Process management, systemd, bash scripting, file permissions, SSH key management, cron automation.' },
            { name: 'TCP/IP & Cloud Networking', desc: 'DNS routing, CIDR subnetting, NAT gateways, load balancers, SSL/TLS termination, firewalls.' },
            { name: 'Git & Version Control Workflows', desc: 'Trunk-based development, semantic versioning, pull request reviews, and branch protection.' }
          ]
        },
        {
          tier: 'Level 2: Containers & Cloud Platforms (Months 2-4)',
          color: '#22c55e',
          items: [
            { name: 'Docker Mastery', desc: 'Multi-stage builds, rootless containers, image layer optimization, vulnerability scanning with Trivy.' },
            { name: 'AWS / GCP Core Services', desc: 'EC2, VPC, S3, IAM role policies, Route 53, CloudFront CDN, RDS, and ECS container orchestration.' },
            { name: 'CI/CD Automation', desc: 'GitHub Actions, GitLab CI, artifact registries, automated unit & integration testing pipelines.' }
          ]
        },
        {
          tier: 'Level 3: Kubernetes, Terraform & Observability (Months 4-6)',
          color: '#a855f7',
          items: [
            { name: 'Kubernetes (K8s) Orchestration', desc: 'Pods, Deployments, Services, Ingress controllers, ConfigMaps/Secrets, Helm charts, HPA.' },
            { name: 'Terraform & Infrastructure-as-Code', desc: 'Modular HCL scripting, remote state locking in S3/DynamoDB, Terraform Cloud workspaces.' },
            { name: 'Observability & Monitoring', desc: 'Prometheus metrics scrapers, Grafana dashboards, ELK/Loki log aggregation, distributed tracing.' }
          ]
        },
        {
          tier: 'Level 4: Essential Soft Skills & Incident Management',
          color: '#f59e0b',
          items: [
            { name: 'Blameless Post-Mortems', desc: 'Conducting constructive outage analyses and identifying root causes without finger-pointing.' },
            { name: 'Architectural Documentation', desc: 'Creating clean C4-model infrastructure diagrams and Runbooks for on-call teams.' }
          ]
        }
      ],

      coursesToStudy: [
        {
          category: 'Best Free High-Yield Courses',
          icon: '🎁',
          courses: [
            { title: 'TechWorld with Nana: DevOps Bootcamp', platform: 'YouTube / TechWorld', badge: '100% Free Gold Standard', desc: 'The most comprehensive free overview of Docker, Kubernetes, CI/CD, and Terraform.' },
            { title: 'Learn Kubernetes Basics by The Linux Foundation', platform: 'Kubernetes.io / edX', badge: 'Official Free Labs', desc: 'Interactive hands-on sandbox tutorials provided directly by the official Kubernetes documentation team.' },
            { title: 'AWS Cloud Practitioner Essentials', platform: 'AWS Skill Builder', badge: 'Official Free Course', desc: 'Official overview of fundamental AWS cloud compute, storage, security, and pricing models.' }
          ]
        },
        {
          category: 'Best Certifications for Resume Filtering',
          icon: '🏆',
          courses: [
            { title: 'AWS Certified Solutions Architect - Associate (SAA-C03)', platform: 'AWS Certification', badge: 'Top Tier Industry Credential', desc: 'The gold standard certification recognized worldwide for cloud engineering roles.' },
            { title: 'Certified Kubernetes Administrator (CKA)', platform: 'Cloud Native Computing Foundation (CNCF)', badge: 'Hands-on Performance Exam', desc: 'Strict practical terminal-based test that indisputably proves real Kubernetes deployment capability.' },
            { title: 'HashiCorp Certified: Terraform Associate', platform: 'HashiCorp', badge: 'IaC Verified', desc: 'Demonstrates deep mastery of cloud infrastructure as code automation.' }
          ]
        }
      ],

      timeline: [
        { phase: 'Phase 1: Months 0-1.5', title: 'Linux, Bash & Cloud Networking', desc: 'Master CLI navigation, bash automation scripts, and foundational TCP/IP networking.' },
        { phase: 'Phase 2: Months 1.5-3', title: 'Docker, AWS Foundations & CI/CD', desc: 'Containerize multi-tier web apps, configure AWS VPCs, and build GitHub Actions pipelines.' },
        { phase: 'Phase 3: Months 3-5', title: 'Kubernetes, Terraform IaC & GitOps', desc: 'Deploy resilient K8s clusters using Terraform and set up ArgoCD GitOps workflows.' },
        { phase: 'Phase 4: Months 5-6.5', title: 'Observability, Security Hardening & Job Outreach', desc: 'Deploy Grafana monitoring, harden cloud IAM roles, build 3 portfolio case studies, and apply.' }
      ]
    },

    'uiux_designer': {
      title: 'UI/UX & Product Experience Designer',
      tagline: 'Craft intuitive user interfaces, scalable design systems, and delightful digital product journeys.',
      duration: '4 to 6 Months (15-20 hrs/week)',
      difficulty: 'High-Demand / Creative & Analytical',
      salary: '$100,000 - $155,000 / INR 10 - 26 LPA',

      howToGetJobEasily: {
        headline: 'Fast-Track Playbook to Land a UI/UX & Product Design Role Easily',
        summary: 'Design managers care 90% about your case studies and interactive Figma prototypes. Showing the problem-solving journey with business metrics beats 100 pretty dribbble screenshots.',
        steps: [
          {
            title: '1. The High-Converting Case Study Formula',
            text: 'Structure every case study with 5 clear chapters: (1) Problem Statement & Business Opportunity, (2) User Research & Pain Points, (3) Wireframing & Iterations, (4) Final High-Fidelity Interactive Prototype, and (5) Quantifiable Impact: "Redesigned onboarding flow, boosting day-7 conversion by 28% and reducing drop-offs by 40%."'
          },
          {
            title: '2. Cold Outreach to Product Leads & Founders',
            text: 'Find Head of Design or Product Managers on LinkedIn. Review their live product, identify 1 UX friction point, and send a polite Loom video:\n\n"Hi [Name], love the vision behind [Product]. While using your app, I noticed users might encounter friction in the checkout stepper. I took the initiative to mock up a cleaner 2-step variant in Figma with micro-interactions: [Figma Link / 60s Loom]. Would love to hear your thoughts if you have a quick moment!"'
          },
          {
            title: '3. Proof of Work (The 3-Portfolio Showcase)',
            text: 'Build your personal portfolio site (e.g., using Framer or Webflow) featuring:\n• Project 1: Complex B2B SaaS web app with dense data tables and design token system.\n• Project 2: Mobile native iOS/Android consumer experience with polished micro-animations.\n• Project 3: Complete Design System in Figma (components, variants, autolayout, dark mode tokens).'
          },
          {
            title: '4. Cracking Design App Critiques & Whiteboard Challenges',
            text: 'In interviews, you will be given whiteboard design challenges (e.g., "Design an app to help dog owners find trustworthy walkers in 30 minutes"). Always start by asking clarifying questions about target personas, core constraints, and success metrics before sketching UI.'
          },
          {
            title: '5. Salary Negotiation for Product Designers',
            text: 'Position yourself as a strategic business partner who drives user retention and conversion revenue, not just someone who "makes screens look nice".'
          }
        ]
      },

      skillsToLearn: [
        {
          tier: 'Level 1: UX Research & Information Architecture (Months 0-1.5)',
          color: '#38bdf8',
          items: [
            { name: 'User Research & Personas', desc: 'Conducting user interviews, empathy mapping, identifying friction points, competitive audits.' },
            { name: 'Information Architecture (IA)', desc: 'User flows, sitemaps, card sorting, low-fidelity wireframing, and content hierarchy.' },
            { name: 'Usability Principles', desc: 'Nielsen Norman heuristics, Gestalt visual perception, Fitts\'s Law, Hick\'s Law.' }
          ]
        },
        {
          tier: 'Level 2: Figma Mastery & Visual Hierarchy (Months 1.5-3)',
          color: '#22c55e',
          items: [
            { name: 'Advanced Figma Skills', desc: 'Auto-layout 5.0, component variants, interactive component states, nested properties, variables.' },
            { name: 'Typography & Grid Systems', desc: '8pt spatial grid system, modular typographic scale, readability, responsive fluid scaling.' },
            { name: 'Design Systems & Tokens', desc: 'Semantic color tokens, spacing tokens, atom-to-organism component libraries.' }
          ]
        },
        {
          tier: 'Level 3: Prototyping, Micro-Interactions & Handoff (Months 3-5)',
          color: '#a855f7',
          items: [
            { name: 'High-Fidelity Prototyping', desc: 'Smart animate transitions, variable-based prototyping in Figma, scroll animations, micro-delights.' },
            { name: 'Developer Handoff Standards', desc: 'Annotating specs, exporting SVG/WebP assets, understanding CSS flexbox/grid for seamless engineering collaboration.' },
            { name: 'Accessibility (WCAG 2.2)', desc: 'Color contrast ratio compliance (AA/AAA), screen reader accessibility labels, focus states.' }
          ]
        },
        {
          tier: 'Level 4: Essential Product Sense & Communication',
          color: '#f59e0b',
          items: [
            { name: 'Design Presentation & Storytelling', desc: 'Defending design decisions clearly to cross-functional product managers and executives.' },
            { name: 'Data-Informed UX', desc: 'Measuring success through Google Analytics, Hotjar heatmaps, and A/B test split results.' }
          ]
        }
      ],

      coursesToStudy: [
        {
          category: 'Best Free High-Yield UX Courses',
          icon: '🎁',
          courses: [
            { title: 'Google UX Design Professional Certificate Course Materials', platform: 'Coursera (Audit Free) / YouTube', badge: 'Industry Standard Curriculum', desc: 'Comprehensive 7-course program covering the complete UX design process from research to prototyping.' },
            { title: 'Figma for Beginners & Advanced Figma by Figma Official', platform: 'YouTube (Figma Channel)', badge: '100% Free Official', desc: 'Official video masterclasses teaching Auto-layout, Variables, and Design System architecture.' },
            { title: 'Laws of UX (Interactive Reference Guide)', platform: 'LawsofUX.com', badge: '100% Free Resource', desc: 'Beautiful interactive visual guide to cognitive psychology principles in product design.' }
          ]
        },
        {
          category: 'Best Certified & Industry Credential Tracks',
          icon: '🏆',
          courses: [
            { title: 'Google UX Design Professional Certificate', platform: 'Coursera & Google', badge: 'Verified Career Certificate', desc: 'World-recognized entry-level credential that validates full portfolio completion.' },
            { title: 'Interaction Design Foundation (IxDF) Membership', platform: 'Interaction-Design.org', badge: 'Accredited Academic Courses', desc: 'Deep courses on Enterprise Design Thinking, Mobile UX, and Gestalt psychology.' }
          ]
        }
      ],

      timeline: [
        { phase: 'Phase 1: Months 0-1.5', title: 'UX Research, Mental Models & Wireframes', desc: 'Learn user empathy, conduct usability interviews, and create low-fi wireframes.' },
        { phase: 'Phase 2: Months 1.5-3', title: 'Figma Mastery & Visual Design Systems', desc: 'Master Auto-layout, typography, color theory, and build a reusable 30-component design system.' },
        { phase: 'Phase 3: Months 3-4.5', title: 'Building 2 Flagship End-to-End Case Studies', desc: 'Execute and document 2 complete product redesigns with interactive Figma prototypes.' },
        { phase: 'Phase 4: Months 4.5-6', title: 'Portfolio Website Launch & Outreach', desc: 'Publish portfolio on Framer/Webflow, send video audits to design leaders, and secure interviews.' }
      ]
    }
  };

  /**
   * Adaptive Procedural Generator: Builds high-value 4-pillar roadmap for ANY custom job
   */
  function synthesizeCustomRoadmap(jobTitle) {
    const titleClean = (jobTitle || '').trim();
    const tLower = titleClean.toLowerCase();

    // Specific matching without false positives
    if (tLower.includes('ui') || tLower.includes('ux') || tLower.includes('product design') || tLower.includes('designer') || tLower.includes('figma')) {
      return CAREER_DATABASE['uiux_designer'];
    }
    if (tLower.includes('cloud') || tLower.includes('devops') || tLower.includes('solutions architect') || tLower.includes('kubernetes') || tLower.includes('docker') || tLower.includes('aws') || tLower.includes('terraform')) {
      return CAREER_DATABASE['cloud_devops'];
    }
    if (tLower.includes('data scientist') || tLower.includes('data science') || tLower.includes('analytics') || tLower.includes('business intelligence') || tLower.includes('data analyst')) {
      return CAREER_DATABASE['data'];
    }
    if (tLower.includes('cyber') || tLower.includes('security') || tLower.includes('pentest') || tLower.includes('hack') || tLower.includes('soc')) {
      return CAREER_DATABASE['cybersecurity'];
    }
    if (tLower.includes('full stack') || tLower.includes('frontend') || tLower.includes('backend') || tLower.includes('software engineer') || tLower.includes('web developer') || tLower.includes('react') || tLower.includes('javascript') || tLower.includes('node')) {
      return CAREER_DATABASE['fullstack'];
    }
    if (tLower.includes('ai') || tLower.includes('machine learning') || tLower.includes('deep learning') || tLower.includes('llm') || tLower.includes('nlp')) {
      return CAREER_DATABASE['ai'];
    }

    // Procedural generation tailored specifically to the user's role
    return {
      title: titleClean || 'Custom Career Specialist',
      tagline: `Accelerated 0-to-Hero engineering roadmap to become a high-impact, verified ${titleClean || 'Specialist'}.`,
      duration: '4 to 6 Months (15-20 hrs/week)',
      difficulty: 'High-Demand Role',
      salary: '$105,000 - $165,000 / INR 12 - 28 LPA',

      howToGetJobEasily: {
        headline: `Fast-Track Playbook to Land a ${titleClean} Role Easily`,
        summary: `Companies hiring for ${titleClean} prioritize candidates who demonstrate practical execution, clear communication, and verified problem-solving ability over generic credentials.`,
        steps: [
          {
            title: `1. The ATS Resume Keyword Strategy for ${titleClean}`,
            text: `Audit 10 current job postings for "${titleClean}". Extract recurring technical nouns and software tools. Ensure these appear in your resume's Skills block and within bullet points formatted with measurable results: "Engineered [Solution] using [Core Tool], improving efficiency by [X]% and reducing operational costs."`
          },
          {
            title: '2. Direct Outreach & Cold Referral Hack',
            text: `Never submit blind applications on generic job boards. Search LinkedIn for Department Heads or Hiring Managers at target companies. Send a short, value-focused note:\n\n"Hi [Name], I noticed your team is scaling its ${titleClean} capacity. I recently completed an end-to-end case study addressing [industry bottleneck] with documented architecture and benchmarks here: [Link]. Would love 5 minutes of your feedback if you're open to it!"`
          },
          {
            title: '3. Proof of Work (The 3-Project Rule)',
            text: `Build and publish 3 distinctive projects that hiring managers can evaluate in 30 seconds:\n• Project 1: Complete end-to-end production solution with clean architecture and live demo.\n• Project 2: High-efficiency tool or automation script solving a real pain point.\n• Project 3: Well-documented case study comparing performance trade-offs.`
          },
          {
            title: `4. Cracking the ${titleClean} Technical Interview`,
            text: 'Prepare for both technical depth and behavioral problem solving. Use the STAR framework (Situation, Task, Action, Result) for behavioral questions, and explain your technical design trade-offs aloud during live evaluations.'
          },
          {
            title: '5. High-Paying Salary Negotiation',
            text: 'Do not accept the first offer immediately. Express enthusiasm, ask for 48 hours to review the compensation package, and negotiate respectfully citing market data and specialized skills.'
          }
        ]
      },

      skillsToLearn: [
        {
          tier: 'Level 1: Industry First Principles (Months 0-1.5)',
          color: '#38bdf8',
          items: [
            { name: `${titleClean} Foundations`, desc: `Core theoretical mental models, terminology, and baseline mechanics of ${titleClean}.` },
            { name: 'Tooling & Environment Setup', desc: 'Configuring standard IDEs, command line utilities, version control, and development environments.' },
            { name: 'Problem Decomposition', desc: 'Breaking complex business requests into structured, executable technical phases.' }
          ]
        },
        {
          tier: 'Level 2: Modern Toolstack & Production Standards (Months 1.5-3)',
          color: '#22c55e',
          items: [
            { name: 'Primary Industry Software & Frameworks', desc: `Mastering the top 2-3 standard platforms and libraries used daily by ${titleClean} teams.` },
            { name: 'Quality Assurance & Testing', desc: 'Writing automated test suites, validating edge cases, and verifying reproducibility.' },
            { name: 'Workflow Automation', desc: 'Scripting repetitive tasks and integrating modern productivity utilities.' }
          ]
        },
        {
          tier: 'Level 3: Pro Differentiating Skills (Months 3-5)',
          color: '#a855f7',
          items: [
            { name: 'Performance & Optimization', desc: 'Auditing bottlenecks, reducing execution latency, and improving resource efficiency.' },
            { name: 'System Architecture & Scalability', desc: 'Designing resilient workflows that maintain integrity under high load or volume.' },
            { name: 'Security & Compliance Standards', desc: 'Implementing privacy, access control, and industry best practices.' }
          ]
        },
        {
          tier: 'Level 4: Essential Soft Skills',
          color: '#f59e0b',
          items: [
            { name: 'Stakeholder Communication', desc: 'Articulating technical trade-offs clearly to non-technical partners and managers.' },
            { name: 'Documentation Polish', desc: 'Creating structured, readable technical documentation and README guides.' }
          ]
        }
      ],

      coursesToStudy: [
        {
          category: 'Best Free Courses & Recommended Learning',
          icon: '🎁',
          courses: [
            { title: `Complete Foundations of ${titleClean}`, platform: 'Coursera / edX (Audit Free)', badge: 'Free Audit', desc: 'Introductory courses covering first principles, syntax, and foundational theory.' },
            { title: 'Harvard CS50: Computer Science & Problem Solving', platform: 'edX / YouTube', badge: '100% Free Gold Standard', desc: 'The world\'s most acclaimed introduction to computational thinking and software engineering.' },
            { title: 'Official Documentation & Community Sandboxes', platform: 'Official Docs', badge: '100% Free', desc: 'Reading the official documentation and completing guided getting-started tutorials.' }
          ]
        },
        {
          category: 'Best Certified & Industry Credential Tracks',
          icon: '🏆',
          courses: [
            { title: `Professional Practitioner Certificate in ${titleClean}`, platform: 'Coursera / Industry Bodies', badge: 'Verified Credential', desc: 'Structured professional track that helps validate capability on resumes and LinkedIn.' },
            { title: 'Applied Masterclass & Capstone Specialization', platform: 'Udemy / edX', badge: 'Hands-on Certificate', desc: 'Comprehensive project-heavy course culminating in portfolio-worthy deliverables.' }
          ]
        }
      ],

      timeline: [
        { phase: 'Phase 1: Months 0-1.5', title: 'Core Prerequisites & Tooling Setup', desc: `Master the foundational concepts and configure development environments for ${titleClean}.` },
        { phase: 'Phase 2: Months 1.5-3', title: 'Applied Skill Deep Dive & Core Projects', desc: 'Build foundational modules, practice real-world workflows, and learn the modern toolstack.' },
        { phase: 'Phase 3: Months 3-4.5', title: 'Flagship Portfolio & Architecture', desc: 'Create 2-3 production-grade portfolio projects with live demos and clean documentation.' },
        { phase: 'Phase 4: Months 4.5-6', title: 'Outreach, Referrals & Interview Mastery', desc: 'Reach out to hiring managers directly, practice interview questions, and secure offers.' }
      ]
    };
  }

  // ════════════════════════════════════════════════════════════════════════════
  // 2. UI CONTROLLER & VIEWPORT INTEGRATION
  // ════════════════════════════════════════════════════════════════════════════
  let activeRoadmapData = null;

  function handleGenerateRoadmap(jobTitle) {
    const jobInput = document.getElementById('career-job-input');
    const emptyState = document.getElementById('roadmap-empty-state');
    const activeState = document.getElementById('roadmap-active-state');

    if (!jobTitle) return;
    if (jobInput) jobInput.value = jobTitle;

    // Synthesize roadmap data
    activeRoadmapData = synthesizeCustomRoadmap(jobTitle);

    // Hide empty state slot, reveal active roadmap
    if (emptyState) emptyState.style.display = 'none';
    if (activeState) {
      activeState.style.display = 'block';
      activeState.style.opacity = '1';
      // Smooth scroll into view
      setTimeout(() => {
        activeState.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }

    // Render the dedicated 3-Pillar Dashboard below the text box
    renderCareerDashboard(activeRoadmapData);
  }

  function initCareerRoadmapUI() {
    const jobInput = document.getElementById('career-job-input');
    const btnGenerate = document.getElementById('btn-generate-roadmap');
    const presetPills = document.querySelectorAll('.career-preset-pill');

    if (!jobInput || !btnGenerate) {
      return;
    }

    // Preset Pill Click / Tap Handler
    presetPills.forEach(pill => {
      const onPillTrigger = function (e) {
        if (e && e.type === 'click') {
          e.preventDefault();
        }
        
        // Remove active class from all pills and set on current
        presetPills.forEach(p => p.classList.remove('active', 'is-active'));
        pill.classList.add('active', 'is-active');

        const query = pill.getAttribute('data-job') || pill.textContent.replace('✦', '').trim();
        handleGenerateRoadmap(query);
      };

      pill.addEventListener('click', onPillTrigger);
      pill.addEventListener('pointerup', onPillTrigger);
    });

    // Button Generate Click
    btnGenerate.addEventListener('click', function (e) {
      if (e) e.preventDefault();
      const query = jobInput.value.trim();
      if (!query) {
        jobInput.focus();
        jobInput.classList.add('shake');
        setTimeout(() => jobInput.classList.remove('shake'), 600);
        return;
      }
      handleGenerateRoadmap(query);
    });

    // Enter key press in text box
    jobInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const query = jobInput.value.trim();
        if (query) {
          handleGenerateRoadmap(query);
        }
      }
    });
  }

  // Expose globally so inline onclick or external components can invoke it directly
  window.handleGenerateRoadmap = handleGenerateRoadmap;
  window.initCareerRoadmapUI = initCareerRoadmapUI;

  /**
   * Renders the complete 3-pillar breakdown:
   * 1. 🚀 How to easily get the job
   * 2. ⚡ What kind of skills to learn
   * 3. 🎓 What type of courses to study
   * 4. 🛣️ Step-by-step timeline
   */
  function renderCareerDashboard(data) {
    // Header summary card
    const titleEl = document.getElementById('roadmap-job-title');
    const tagEl = document.getElementById('roadmap-job-tagline');
    const durationEl = document.getElementById('roadmap-duration-pill');
    const salaryEl = document.getElementById('roadmap-salary-pill');
    const difficultyEl = document.getElementById('roadmap-difficulty-pill');

    if (titleEl) titleEl.textContent = data.title;
    if (tagEl) tagEl.textContent = data.tagline;
    if (durationEl) durationEl.textContent = `⏱️ ${data.duration}`;
    if (salaryEl) salaryEl.textContent = `💰 ${data.salary}`;
    if (difficultyEl) difficultyEl.textContent = `🎯 ${data.difficulty}`;

    // Update Deep Dive Link to Counselor with job prefilled
    const linkCounselor = document.getElementById('link-counselor-deepdive');
    if (linkCounselor) {
      linkCounselor.href = `counselor.html?q=${encodeURIComponent('How can I easily get a job as a ' + data.title + ', what skills to master, and what courses are best?')}`;
    }

    // Render into container
    const container = document.getElementById('roadmap-milestones-grid');
    if (!container) return;

    container.innerHTML = `
      <!-- TAB NAVIGATION FOR FAST BROWSING -->
      <div class="career-pillar-tabs" style="grid-column: 1 / -1; display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">
        <button type="button" class="pillar-tab-btn active" data-target="all">✦ All in One Guide</button>
        <button type="button" class="pillar-tab-btn" data-target="get-job">🚀 How to Get Job Easily</button>
        <button type="button" class="pillar-tab-btn" data-target="skills">⚡ Skills to Learn</button>
        <button type="button" class="pillar-tab-btn" data-target="courses">🎓 Courses to Study</button>
        <button type="button" class="pillar-tab-btn" data-target="timeline">🛣️ 0-to-Hero Timeline</button>
      </div>

      <!-- PILLAR 1: HOW TO GET THIS JOB EASILY -->
      <div class="career-pillar-card pillar-get-job" id="pillar-get-job" style="grid-column: 1 / -1;">
        <div class="pillar-header">
          <div class="pillar-tag-badge get-job-badge">PILLAR 01 // FAST-TRACK HIRING SECRETS</div>
          <h3 class="pillar-title">🚀 ${data.howToGetJobEasily.headline}</h3>
          <p class="pillar-sub">${data.howToGetJobEasily.summary}</p>
        </div>

        <div class="hiring-steps-grid">
          ${data.howToGetJobEasily.steps.map(step => `
            <div class="hiring-step-item">
              <div class="hiring-step-title">
                <span class="hiring-step-dot"></span>
                <span>${step.title}</span>
              </div>
              <p class="hiring-step-text" style="white-space: pre-line;">${step.text}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- PILLAR 2: WHAT KIND OF SKILLS WE CAN LEARN -->
      <div class="career-pillar-card pillar-skills" id="pillar-skills" style="grid-column: 1 / -1;">
        <div class="pillar-header">
          <div class="pillar-tag-badge skills-badge">PILLAR 02 // TECHNICAL & SOFT SKILLS TREE</div>
          <h3 class="pillar-title">⚡ What Kind of Skills to Learn (0 to Job-Ready)</h3>
          <p class="pillar-sub">The prioritized hierarchy of foundational concepts, in-demand modern tools, and advanced pro capabilities employers look for.</p>
        </div>

        <div class="skills-levels-grid">
          ${data.skillsToLearn.map(level => `
            <div class="skill-level-card">
              <div class="skill-level-title" style="color: ${level.color}; border-left: 3px solid ${level.color}; padding-left: 10px;">
                ${level.tier}
              </div>
              <div class="skill-items-list">
                ${level.items.map(item => `
                  <div class="skill-item-block">
                    <span class="skill-item-name">${item.name}</span>
                    <span class="skill-item-desc">${item.desc}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- PILLAR 3: WHAT TYPE OF COURSES TO STUDY -->
      <div class="career-pillar-card pillar-courses" id="pillar-courses" style="grid-column: 1 / -1;">
        <div class="pillar-header">
          <div class="pillar-tag-badge courses-badge">PILLAR 03 // RECOMMENDED CURRICULUM (0 TO END)</div>
          <h3 class="pillar-title">🎓 What Type of Courses to Study (Free & Certified)</h3>
          <p class="pillar-sub">Curated high-yield study programs, official documentation tracks, and accredited certifications that pass screening filters.</p>
        </div>

        <div class="courses-sections-grid">
          ${data.coursesToStudy.map(sec => `
            <div class="course-category-card">
              <div class="course-category-header">
                <span class="course-cat-icon">${sec.icon}</span>
                <span class="course-cat-title">${sec.category}</span>
              </div>
              <div class="courses-cards-list">
                ${sec.courses.map(c => `
                  <div class="course-detail-row">
                    <div class="course-detail-head">
                      <span class="course-title-text">${c.title}</span>
                      <span class="course-platform-badge">${c.badge}</span>
                    </div>
                    <div class="course-provider">Platform: <strong>${c.platform}</strong></div>
                    <p class="course-desc-text">${c.desc}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- PILLAR 4: STEP-BY-STEP 0-TO-HERO TIMELINE -->
      <div class="career-pillar-card pillar-timeline" id="pillar-timeline" style="grid-column: 1 / -1;">
        <div class="pillar-header">
          <div class="pillar-tag-badge timeline-badge">PILLAR 04 // MONTH-BY-MONTH ROADMAP</div>
          <h3 class="pillar-title">🛣️ Step-by-Step 0-to-Offer Roadmap Timeline</h3>
          <p class="pillar-sub">A clear, phased execution blueprint designed to take you from total beginner to hired professional.</p>
        </div>

        <div class="timeline-phases-grid">
          ${data.timeline.map((ph, idx) => `
            <div class="timeline-phase-card">
              <div class="phase-number-chip">PHASE 0${idx + 1}</div>
              <div class="phase-time-pill">${ph.phase}</div>
              <h4 class="phase-card-title">${ph.title}</h4>
              <p class="phase-card-desc">${ph.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Setup interactive filter tab clicks
    setupPillarTabs();
  }

  function setupPillarTabs() {
    const tabBtns = document.querySelectorAll('.pillar-tab-btn');
    const cards = document.querySelectorAll('.career-pillar-card');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        tabBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const target = this.getAttribute('data-target');

        cards.forEach(card => {
          if (target === 'all') {
            card.style.display = 'block';
          } else if (card.id === `pillar-${target}`) {
            card.style.display = 'block';
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCareerRoadmapUI);
  } else {
    initCareerRoadmapUI();
  }

})();
