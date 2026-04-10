const callLLM = require("./openRouter");
const cleanAIOutput = require("./cleanOutput");

const delay=(ms) => new Promise(res => setTimeout(res,ms));

const generateBlogMultiAgent = async (topic) => {

  try {
    
    //  1. PLANNER (ONLY STRUCTURE)
    const plan = await callLLM([
      {
        role: "system",
        content: "You are a content strategist. Only return a structured outline with headings and bullet points. No explanations."
      },
      {
        role: "user",
        content: `Create a structured blog outline with SEO keywords for: ${topic}`
      }
    ]);
    await delay(1000);

    //  2. WRITER (STRICT HTML ONLY)
    const draft = await callLLM([
      {
        role: "system",
        content: `
You are a professional SEO blog writer.

STRICT RULES:
- Return ONLY valid HTML
- DO NOT include explanations
- DO NOT include notes or comments
- DO NOT include "Here are..." or similar phrases
- DO NOT include markdown

FORMAT RULES:
- Start with <h1>
- Use <h2> for sections
- Use <p> for paragraphs
- Use <ul><li> for lists
- Keep clean semantic HTML

Write a complete blog.
`
      },
      {
        role: "user",
        content: `Using this outline:\n${plan}\n\nWrite a complete blog on: ${topic}`
      }
    ]);

    await delay(1000);
    if (!draft || draft.length < 200) {
  throw new Error("AI output incomplete");
}
    const trimmedDraft = draft.slice(0, 8000); // limit tokens

    //  3. EDITOR (CLEAN + STRICT OUTPUT)
    const edited = await callLLM([
      {
        role: "system",
        content: `
You are an expert editor.

STRICT RULES:
- Return ONLY clean HTML
- DO NOT add explanations
- DO NOT add meta descriptions
- DO NOT add comments
- Improve clarity, grammar, and readability
- Keep structure intact
`
      },
      {
        role: "user",
        content: `Refine and improve this blog:\n\n${trimmedDraft}`
      }
    ]);

    // FINAL CLEANING (SAFETY LAYER)
    const final = cleanAIOutput(edited);

    return final;

  } catch (err) {
    console.error("Multi-agent error:", err.response?.data || err.message);
    if (err.code === "ECONNRESET") {
    throw new Error("Network issue, please retry");
  }
    throw new Error("Multi-agent generation failed");
  }
};

module.exports = generateBlogMultiAgent;