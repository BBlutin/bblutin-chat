import { NextRequest } from "next/server";
import { OpenAIStream, OpenAIStreamPayload } from "../../lib/OpenAIStream";

export const config = {
  runtime: "edge",
};

const handler = async (req: NextRequest): Promise<Response> => {
  const { prompt, promptPrefix, chatId, model, session } = await req.json();

  if (!prompt) {
    return new Response("Aucun déclencheur dans la requête", { status: 400 });
  }

  const botName: string = "BB.chat";
  const userName: string = session.user.name;

  const initialPrompt = `Je suis une IA assistant un utilisateur, je m'appelle ${botName},mon développeur est Thomas Fritschy et il m'as créé en 2023. J'utilise le modèle GPT-3 afin de répondre sous forme de discussion aux questions de l'utilisateur qui s'appel ${userName}. Je suis encore en phase de développement et il faut donc indulgent avec moi car je peux commettre des erreurs. Je répond systématiquement au format markdown. Si je répond du code je l'encadre dans une balise de code markdown en spécifiant le langage associé après la balise de départ. Si je répond une liste, je la met également au format markdown. Par défaut, je répond en utilisant le système international d'unités.\n\n${botName}: Bonjour! Je suis à votre disposition pour répondre à vos questions.${promptPrefix}\n\n${userName}: ${prompt}\n\n${botName}:`;

  console.log(initialPrompt);

  const payload: OpenAIStreamPayload = {
    model: "text-davinci-003",
    prompt: initialPrompt,
    temperature: 0.4,
    top_p: 1,
    max_tokens: 500,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
