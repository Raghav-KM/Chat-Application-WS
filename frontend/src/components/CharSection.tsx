import { useRecoilValue } from "recoil";
import { ChatMessageType } from "../../../backend/src/types";
import { userAtom } from "../atoms/atoms";

export const MessageSection = () => {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full flex-grow py-1 px-2">
                <MessageWindow />
            </div>
            <div className="w-full h-16 p-2 pt-1">
                <MessageInput />
            </div>
        </div>
    );
};

const MessageInput = () => {
    return (
        <div className="w-full h-full border border-black flex flex-row">
            <div className="flex-grow h-full p-2">
                <input className="w-full h-full border outline-none p-4 text-sm font-mono bg-gray-50"></input>
            </div>
            <div className="w-16 h-full hover:bg-gray-200 hover:font-semibold cursor-pointer flex justify-center items-center font-mono border-s border-black text-sm">
                Send
            </div>
        </div>
    );
};

const MessageWindow = () => {
    const user = useRecoilValue(userAtom);
    const messages: ChatMessageType[] = [
        {
            message_body: "A Normal Length Message",
            room_id: "admin_room_1",
            sender_id: "admin_user_1",
        },
        {
            message_body:
                "A Multi Line Message\nA Multi Line Message\nA Multi Line Message\nA Multi Line Message",
            room_id: "admin_room_1",
            sender_id: "admin_user_2",
        },
        {
            message_body:
                "A very long Message, A very long Messsage, A very long Message, A very long Message, A very long Message",
            room_id: "admin_room_1",
            sender_id: "admin_user_3",
        },
        {
            message_body: "A Normal Length Message",
            room_id: "admin_room_1",
            sender_id: "admin_user_1",
        },
        {
            message_body:
                "A Multi Line Message\nA Multi Line Message\nA Multi Line Message\nA Multi Line Message",
            room_id: "admin_room_1",
            sender_id: "admin_user_2",
        },
        {
            message_body:
                "A very long Message, A very long Messsage, A very long Message, A very long Message, A very long Message",
            room_id: "admin_room_1",
            sender_id: "admin_user_3",
        },
        {
            message_body: "A Normal Length Message",
            room_id: "admin_room_1",
            sender_id: "admin_user_1",
        },
        {
            message_body:
                "A Multi Line Message\nA Multi Line Message\nA Multi Line Message\nA Multi Line Message",
            room_id: "admin_room_1",
            sender_id: "admin_user_2",
        },
        {
            message_body:
                "A very long Message, A very long Messsage, A very long Message, A very long Message, A very long Message",
            room_id: "admin_room_1",
            sender_id: "admin_user_3",
        },
        {
            message_body: "A Normal Length Message",
            room_id: "admin_room_1",
            sender_id: "admin_user_1",
        },
        {
            message_body:
                "A Multi Line Message\nA Multi Line Message\nA Multi Line Message\nA Multi Line Message",
            room_id: "admin_room_1",
            sender_id: "admin_user_2",
        },
        {
            message_body:
                "A very long Message, A very long Messsage, A very long Message, A very long Message, A very long Message",
            room_id: "admin_room_1",
            sender_id: "admin_user_3",
        },
    ];

    return (
        <div className="w-full max-h-[540px] overflow-auto border border-black flex flex-col gap-3 py-2 px-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {messages.map((m) => (
                <Message message={m} isSender={m.sender_id == user.user_id} />
            ))}
        </div>
    );
};

const Message = ({
    message,
    isSender,
}: {
    message: ChatMessageType;
    isSender: boolean;
}) => {
    return (
        <div
            className={`w-full  flex ${
                isSender
                    ? "flex-row-reverse border-e-4 border-black"
                    : "flex-row"
            }  p-2 gap-1 bg-gray-50 shadow-sm`}
        >
            <div className="w-10 min-w-10 h-10 border bg-gray-50 flex justify-center items-center text-xs font-semibold">
                {"U A"}
            </div>
            <div
                className={`flex-grow px-2 h-full text-sm whitespace-pre-wrap font-mono ${
                    isSender ? "flex justify-end" : "flex justify-start"
                }`}
            >
                {message.message_body}
            </div>
        </div>
    );
};
