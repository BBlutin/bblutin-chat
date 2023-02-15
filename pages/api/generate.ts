import { NextRequest } from "next/server";
import { OpenAIStream, OpenAIStreamPayload } from "../../lib/OpenAIStream";

export const config = {
  runtime: "edge",
};

const handler = async (req: NextRequest): Promise<Response> => {
  const { prompt, chatId, model, session } = await req.json();

  if (!prompt) {
    return new Response("Aucun déclencheur dans la requête", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "text-davinci-003",
    prompt,
    temperature: 0.4,
    top_p: 1,
    max_tokens: 300,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
