const Groq = require("groq-sdk"); 
require('dotenv').config();
const grogIP = process.env.GROG_IP;
const groq = new Groq({ apiKey: grogIP }); 

async function get_suggestion(prompt) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
    });

    const response = completion.choices[0]?.message?.content || "No response received.";
return response;
  } catch (error) {
    console.error("Error fetching AI response:", error);
  }
}
module.exports={get_suggestion}