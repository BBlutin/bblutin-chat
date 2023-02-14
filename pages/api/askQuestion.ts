import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import query from "../../lib/queryApi";
import { adminDb } from "../../firebaseAdmin";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;
  if (!prompt) {
    res.status(400).json({ answer: "Aucune question valide n'as été fournie" });
  }
  if (!chatId) {
    res
      .status(400)
      .json({ answer: "Aucun ID de discussion valide n'as été fourni" });
  }

  const response = await query(prompt, chatId, model);

  const message: Message = {
    text: response || "BB.Chat n'as pas réussi a trouvé de réponse",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "BB.Chat",
      name: "BB.Chat",
      avatar: "",
    },
  };

  await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  res.status(200).json({ answer: message.text });
}
