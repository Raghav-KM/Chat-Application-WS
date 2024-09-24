import { atom } from "recoil";
import {
    ChatMessageType,
    RoomType,
    UserType,
} from "../../../backend/src/types";

export const socketAtom = atom<null | WebSocket>({
    key: "socketAtom",
    default: null,
});

export const userAtom = atom<UserType>({
    key: "userAtom",
    default: {
        user_id: "",
        userName: "",
        state: {
            visibility: "offline",
        },
    },
});

export const userListAtom = atom<UserType[]>({
    key: "userListAtom",
    default: [],
});

export const roomListAtom = atom<RoomType[]>({
    key: "roolListAtom",
    default: [],
});

export const messageListAtom = atom<{
    [key: string]: { messages: ChatMessageType[] };
}>({
    key: "messageListAtom",
    default: {
        admin_room_1: {
            messages: [
                {
                    message_body: "Some Random Message",
                    room_id: "admin_room_1",
                    sender_id: "admin_user_1",
                },
                {
                    message_body: "Some Random Message",
                    room_id: "admin_room_1",
                    sender_id: "admin_user_2",
                },
                {
                    message_body: "Some Random Message",
                    room_id: "admin_room_1",
                    sender_id: "admin_user_3",
                },
            ],
        },
    },
});
