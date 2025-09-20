<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NutriScan - Neon PWA</title>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet">
  <style>
    /* Global Styles */
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Orbitron', sans-serif;
      background: #0a0a0a;
      color: #fff;
      line-height: 1.6;
    }
    a { color: #0ff; text-decoration: none; }
    a:hover { text-shadow: 0 0 10px #0ff, 0 0 20px #0ff; }

    /* Neon Headings */
    h1, h2, h3 {
      color: #0ff;
      text-shadow: 0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff;
      margin-bottom: 1rem;
    }

    h1 { font-size: 3rem; text-align: center; margin-top: 2rem; }
    h2 { font-size: 2rem; margin-top: 2rem; border-bottom: 1px solid #0ff; padding-bottom: 0.5rem; }
    h3 { font-size: 1.5rem; margin-top: 1.5rem; }

    /* Container */
    .container { width: 90%; max-width: 1000px; margin: auto; padding: 2rem 0; }

    /* Section Styling */
    section { margin-bottom: 3rem; }

    /* Feature List */
    ul { list-style: none; padding-left: 1rem; }
    li {
      margin-bottom: 1rem;
      padding: 0.5rem;
      border-left: 4px solid #0ff;
      transition: all 0.3s ease;
    }
    li:hover { background: rgba(0,255,255,0.05); box-shadow: 0 0 10px #0ff; }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
    th, td {
      border: 1px solid #0ff;
      padding: 0.5rem 1rem;
      text-align: left;
    }
    th {
      background: #0a0a0a;
      color: #0ff;
      text-shadow: 0 0 5px #0ff;
    }
    tr:hover td {
      background: rgba(0,255,255,0.05);
      box-shadow: 0 0 10px #0ff inset;
    }

    /* Code blocks */
    pre {
      background: #111;
      color: #0ff;
      padding: 1rem;
      border-left: 4px solid #0ff;
      overflow-x: auto;
      text-shadow: 0 0 2px #0ff;
      margin-bottom: 1rem;
    }

    code { color: #0ff; font-family: 'Courier New', monospace; }

    /* Buttons / Links */
    .btn {
      display: inline-block;
      padding: 0.5rem 1rem;
      color: #0ff;
      border: 1px solid #0ff;
      text-transform: uppercase;
      font-weight: bold;
      text-align: center;
      margin: 0.5rem 0;
      transition: 0.3s ease;
    }
    .btn:hover {
      background: #0ff;
      color: #000;
      box-shadow: 0 0 15px #0ff, 0 0 30px #0ff;
    }

    /* Blockquote */
    blockquote {
      border-left: 4px solid #0ff;
      padding-left: 1rem;
      color: #0ff;
      margin: 1rem 0;
      font-style: italic;
      text-shadow: 0 0 5px #0ff;
    }
  </style>
</head>
<body>

<div class="container">
  <h1>🌐 NutriScan</h1>
  <p style="text-align:center; font-size:1.2rem;">Your AI-powered neon nutrition companion</p>

  <!-- Project Purpose -->
  <section>
    <h2>🚀 Project Purpose</h2>
    <p>
      NutriScan empowers users to make <strong>informed dietary choices</strong> with instant, AI-driven nutrition analysis.  
      By combining barcode scanning, <strong>RAG-powered AI chat</strong>, and real-time smart feedback, NutriScan ensures that 
      <strong>healthy eating is intuitive, interactive, and futuristic</strong>, whether shopping, meal planning, or tracking daily intake.
    </p>
  </section>

  <!-- Features -->
  <section>
    <h2>✨ Features</h2>
    <ul>
      <li>📦 <strong>Barcode Scanner:</strong> Quickly scan food packaging to retrieve detailed nutritional facts.</li>
      <li>📄 <strong>Nutrition Info Lookup:</strong> Access nutrition labels, ingredients, and allergen info.</li>
      <li>🤖 <strong>AI Recommendations:</strong> Tailored suggestions using Gemini AI.</li>
      <li>💬 <strong>RAG-powered Chatbot:</strong> Instant, context-aware nutrition advice.</li>
      <li>🌐 <strong>PWA Support:</strong> Offline access, home screen shortcut, push notifications.</li>
      <li>⚡ <strong>Smart Feedback:</strong> Real-time warnings and healthier alternatives.</li>
      <li>📱 <strong>Cross-Platform:</strong> Works perfectly online and offline.</li>
    </ul>
  </section>

  <!-- Tech Stack -->
  <section>
    <h2>🛠️ Tech Stack</h2>
    <table>
      <tr><th>Layer</th><th>Technology</th></tr>
      <tr><td>Frontend</td><td>Next.js 15, TypeScript, Tailwind CSS, next-pwa</td></tr>
      <tr><td>Backend</td><td>Node.js, Express, Gemini AI API</td></tr>
      <tr><td>Deployment</td><td>Vercel (Frontend), Render (Backend)</td></tr>
      <tr><td>PWA</td><td>next-pwa, Web App Manifest, Custom Neon Icons</td></tr>
    </table>
  </section>

  <!-- Code Example -->
  <section>
    <h2>🤖 Gemini AI Example</h2>
    <pre><code>import axios from 'axios';

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function getAIRecommendation(nutritionData, userPreferences) {
  const prompt = `Given the nutrition data and user preferences, provide a recommendation.`;
  const response = await axios.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    contents: [{ role: "user", parts: [{ text: prompt }] }]
  });
  return response.data;
}</code></pre>
  </section>

  <!-- AI Prompt Example -->
  <section>
    <h2>💡 AI Prompt Example</h2>
    <blockquote>
      "Given the following nutrition label and user preferences, provide a concise health recommendation and suggest healthier alternatives if necessary. Nutrition: [nutrition_data]. Preferences: [user_preferences]."
    </blockquote>
  </section>

  <!-- Acknowledgements -->
  <section>
    <h2>🙏 Acknowledgements</h2>
    <ul>
      <li><a href="https://nextjs.org/">Next.js</a></li>
      <li><a href="https://tailwindcss.com/">Tailwind CSS</a></li>
      <li><a href="https://github.com/shadowwalker/next-pwa">next-pwa</a></li>
      <li><a href="https://ai.google.dev/gemini-api/docs">Gemini AI</a></li>
      <li><a href="https://render.com/">Render</a></li>
      <li><a href="https://vercel.com/">Vercel</a></li>
    </ul>
  </section>
</div>

</body>
</html>
