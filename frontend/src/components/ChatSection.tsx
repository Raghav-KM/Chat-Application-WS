import { useRecoilValue, useSetRecoilState } from "recoil";
import { ChatMessageType, ClientMessageType } from "../../../backend/src/types";
import {
    messageListAtom,
    socketAtom,
    userAtom,
    userMapSelector,
} from "../atoms/atoms";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

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
    const socket = useRecoilValue(socketAtom);
    const [input, setInput] = useState("");

    const user = useRecoilValue(userAtom);
    const setMessage = useSetRecoilState(messageListAtom);

    const handleSendMessage = () => {
        if (input == "") return;

        let new_message: ChatMessageType = {
            message_id: uuidv4(),
            body: input,
            sender_id: user.user_id,
            room_id: "admin_room_1",
        };

        setMessage((message) => {
            let updated_message = message;

            updated_message = {
                admin_room_1: {
                    messages: [
                        ...message["admin_room_1"].messages,
                        new_message,
                    ],
                },
            };
            // console.log(updated_message);
            return updated_message;
        });

        const client_message: ClientMessageType = {
            type: "message",
            message_body: new_message,
        };

        socket?.send(JSON.stringify(client_message));
        setInput("");
    };

    return (
        <div className="w-full h-full border border-black flex flex-row">
            <div className="flex-grow h-full p-2">
                <input
                    className="w-full h-full border outline-none p-4 text-sm font-mono bg-gray-50"
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                ></input>
            </div>
            <div
                className="w-16 h-full hover:bg-gray-200 hover:font-semibold cursor-pointer flex justify-center items-center font-mono border-s border-black text-sm"
                onClick={handleSendMessage}
            >
                Send
            </div>
        </div>
    );
};

const MessageWindow = () => {
    const user = useRecoilValue(userAtom);
    const messageList = useRecoilValue(messageListAtom);
    const messages: ChatMessageType[] = messageList["admin_room_1"].messages;

    return (
        <div className="w-full min-h-[550px] max-h-[550px] overflow-auto border border-black flex flex-col gap-3 py-2 px-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            {messages.map((m) => (
                <Message
                    message={m}
                    isSender={m.sender_id == user.user_id}
                    key={m.message_id}
                />
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
    const userMap = useRecoilValue(userMapSelector);
    const userName = userMap[message.sender_id]?.userName;
    const userNameShort = `${userName?.split(" ")[0][0]} ${
        userName?.split(" ")[1][0]
    }`;
    return (
        <div
            className={`w-full flex ${
                isSender
                    ? "flex-row-reverse border-e-4 border-gray-400"
                    : "flex-row"
            }  p-2 gap-1 bg-gray-100 shadow-sm`}
        >
            <div className="w-10 min-w-10 h-10 border bg-gray-50 flex justify-center items-center text-xs font-semibold">
                {userNameShort}
            </div>
            <div
                className={`flex-grow px-2 h-full text-sm whitespace-pre-wrap font-mono ${
                    isSender ? "flex justify-end" : "flex justify-start"
                }`}
            >
                {message.body}
            </div>
        </div>
    );
};
