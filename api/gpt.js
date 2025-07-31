export default async function handler(req, res) {
  const { prompt } = req.body;

  const apiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6
    })
  });

  const data = await apiRes.json();
  const result = data.choices?.[0]?.message?.content;
  res.status(200).json({ result });
}
