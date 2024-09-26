import { atom, selector } from "recoil";
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

export const userMapSelector = selector<Record<string, UserType>>({
    key: "userMapSelector",
    get: ({ get }) => {
        const userList = get(userListAtom);
        return userList.reduce((map, user) => {
            map[user.user_id] = user;
            return map;
        }, {} as Record<string, UserType>);
    },
});

export const selectedRoomAtom = atom<string>({
    key: "selectedRoomAtom",
    default: "",
});
export const roomListAtom = atom<RoomType[]>({
    key: "roomListAtom",
    default: [],
});

export const messageListAtom = atom<{
    [key: string]: { messages: ChatMessageType[] };
}>({
    key: "messageListAtom",
    default: {
        admin_room_1: {
            messages: [],
        },
    },
});
