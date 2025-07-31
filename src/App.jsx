import React, { useState } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyse = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse('');

    // Replace this with API call to OpenAI
    setTimeout(() => {
      setResponse(
        `⚖️ Probability of Success: 76%\n\n📄 Issue: Whether the police officer’s use of force was lawful\n\n📚 Rule: UK common law allows reasonable force by police in arrest\n\n🔍 Application: Officer used a weapon for a traffic violation. No threat shown.\n\n✅ Conclusion: Excessive force. Likely breach of rights under ECHR Art. 3.\n\n📊 Out of 100 similar UK cases: 74 in favor of claimant.`
      );
      setLoading(false);
    }, 1500);
  };

  return (
    <div>
      <h1>JudgeGPT</h1>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleAnalyse} disabled={loading}>
        {loading ? 'Analysing...' : 'Analyse My Case'}
      </button>
      <pre>{response}</pre>
    </div>
  );
}
