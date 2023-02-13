import Chat from "../../../components/Chat";
import ChatInput from "../../../components/ChatInput";

type Props = {
  params: {
    id: string;
  };
};

const MessagePage = ({ params: { id } }: Props) => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Chat chatId={id} />
      <ChatInput chatId={id} />
    </div>
  );
};

export default MessagePage;
