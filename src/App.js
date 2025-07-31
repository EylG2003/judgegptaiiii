import React, { useState } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyse = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/gpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input })
      });
      const data = await res.json();
      setResponse(data.result);
    } catch (err) {
      setResponse('❌ Error fetching legal prediction. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#0e1117', color: '#f1f1f1' }}>
      <h1>⚖️ JudgeGPT UK</h1>
      <textarea
        rows={6}
        style={{ width: '100%', padding: '1rem', borderRadius: '10px', backgroundColor: '#1a1d23', color: '#f1f1f1' }}
        placeholder="E.g. What happens if Luigi Mangione was tried in London for murder?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleAnalyse}
        disabled={loading}
        style={{
          marginTop: '1rem',
          padding: '1rem 2rem',
          backgroundColor: '#10b981',
          color: '#fff',
          fontSize: '1rem',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        {loading ? '🧠 Analysing...' : '⚖️ Analyse My Case'}
      </button>
      {response && (
        <pre style={{
          marginTop: '2rem',
          whiteSpace: 'pre-wrap',
          backgroundColor: '#1a1d23',
          padding: '1rem',
          borderRadius: '10px'
        }}>
          {response}
        </pre>
      )}
    </div>
  );
}
