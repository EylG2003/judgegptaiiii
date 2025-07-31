import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyse = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse('');

    const publicCases = ['luigi mangione', 'post office scandal', 'chris dawson', 'oscar pistorius'];
    const inputLower = input.toLowerCase();
    const publicCase = publicCases.find(name => inputLower.includes(name));

    let systemPrompt = \`You are JudgeGPT AI — a legal prediction assistant trained on UK law and precedent. 
Respond using IRAC format (Issue, Rule, Application, Conclusion).
Start with empathy. Then use Justice Scanner™, probability, and cite UK law when relevant.\`;

    if (publicCase) {
      systemPrompt += \`\n\n📰 Public Case Detected: \${publicCase.toUpperCase()}
This is a high-profile case. Simulate how a UK court might handle it based on public facts. Prediction is provisional until full evidence is available.\`;
    }

    try {
      const result = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: input }
        ],
        temperature: 0.7
      }, {
        headers: {
          'Authorization': \`Bearer \${import.meta.env.VITE_OPENAI_API_KEY}\`,
          'Content-Type': 'application/json'
        }
      });

      const content = result.data.choices?.[0]?.message?.content;
      setResponse(content || "⚠️ GPT returned an empty response.");
    } catch (err) {
      console.error(err);
      setResponse("⚠️ Error: Could not reach JudgeGPT AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>⚖️ JudgeGPT UK</h1>
      <textarea
        rows="6"
        placeholder="📝 Describe your legal issue..."
        style={{ width: '100%', padding: '1rem', fontSize: '1rem', marginBottom: '1rem' }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleAnalyse}
        disabled={loading}
        style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', backgroundColor: '#10b981', color: 'white', border: 'none' }}
      >
        {loading ? 'Analysing...' : '⚖️ Analyse My Case'}
      </button>
      {response && (
        <pre style={{ background: '#111', color: '#0f0', padding: '1rem', marginTop: '2rem', whiteSpace: 'pre-wrap' }}>
          {response}
        </pre>
      )}
    </div>
  );
}
