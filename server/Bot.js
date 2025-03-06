const Groq = require("groq-sdk"); 

const groq = new Groq({ apiKey: "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" }); 

async function get_suggestion(prompt) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
    });

    const response = completion.choices[0]?.message?.content || "No response received.";

  } catch (error) {
    console.error("Error fetching AI response:", error);
  }
}
module.exports={get_suggestion}