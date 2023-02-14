import { DocumentData } from "firebase/firestore";

type Props = {
  message: DocumentData;
};

const BotMessage = ({ message }: Props) => {
  return (
    <div className="font-medium text-neutral-800 text-sm">
      <p>{message.text}</p>
    </div>
  );
};

export default BotMessage;
