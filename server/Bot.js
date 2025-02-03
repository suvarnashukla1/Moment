const Groq = require("groq-sdk"); // Use require instead of import

const groq = new Groq({ apiKey: "apikey" }); 

async function main() {
  const prompt = "Explain the importance of fast language models";

  
  console.log(prompt);
  

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
    });

    const response = completion.choices[0]?.message?.content || "No response received.";

    
    console.log(response);
  } catch (error) {
    console.error("Error fetching AI response:", error);
  }
}
main();