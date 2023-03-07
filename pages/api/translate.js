const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function handler(req, res) {

  const { text } = req.body

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: "Repeat back everything that is said to you as if a pirate said it." }, { role: "user", content: text }],
  });

  let textResponse = completion.data.choices[0].message.content;

  res.status(200).json({ text: textResponse })
}
