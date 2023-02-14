import { DocumentData } from "firebase/firestore";
import Image from "next/image";

type Props = {
  message: DocumentData;
};

const UserMessage = ({ message }: Props) => {
  return (
    <div className="self-end flex items-start space-x-3">
      <div className="bg-neutral-800 text-neutral-100 text-sm py-2 px-5 rounded-b-3xl rounded-l-3xl ">
        {message.text}
      </div>
      <Image
        src={message.user.avatar}
        alt=""
        width={40}
        height={40}
        className="rounded-full"
      />
    </div>
  );
};

export default UserMessage;
