import openai from "./chatGpt";

const query = async (prompt: string, chatId: string, model: string) => {
  const res = await openai
    .createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.4,
      top_p: 1,
      max_tokens: 300,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => res.data.choices[0].text)
    .catch(
      (err) =>
        `BB.Chat n'as pas été capable de vous répondre... (Erreur: ${err.message})`
    );

  return res;
};

export default query;
