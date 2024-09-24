import { atom } from "recoil";
import { RoomType, UserType } from "../../../backend/src/types";

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
