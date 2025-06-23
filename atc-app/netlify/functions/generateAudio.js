const fetch = require("node-fetch");

exports.handler = async (event) => {
  const { input } = JSON.parse(event.body);
  const apiKey = process.env.OPENAI_API_KEY;

  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "tts-1",
      voice: "alloy",
      input: input
    })
  });

  const arrayBuffer = await response.arrayBuffer();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "audio/mpeg"
    },
    body: Buffer.from(arrayBuffer).toString("base64"),
    isBase64Encoded: true
  };
};
