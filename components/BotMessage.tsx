import { DocumentData } from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import MarkdownBlock from "./MarkdownBlock";

type Props = {
  message: DocumentData;
};

const BotMessage = ({ message }: Props) => {
  return (
    <div className="text-sm font-medium text-neutral-800 response">
      <MarkdownBlock content={message.text} />
    </div>
  );
};

export default BotMessage;
