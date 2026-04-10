const axios = require("axios");

const callLLM = async (messages, retries=3) => {
  try{ 
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "meta-llama/llama-3-8b-instruct",
      messages
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      }, timeout: 60000
    }
  );

  return response.data.choices[0].message.content;
}catch(err){
  if(retries>0){
    console.log(`Retrying... (${retries})`);
    return callLLM(messages, retries-1);
  }
  console.error("LLM Error:", err.message);
  throw err;
}
};

module.exports = callLLM;