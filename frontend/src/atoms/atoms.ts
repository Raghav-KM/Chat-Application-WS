import { atom } from "recoil";

export type UserType = {
    userId: string;
    userName: string;
    state: {
        visibility: "online" | "offline";
    };
};
export type RoomType = {
    roomId: string;
};

export const socketAtom = atom<null | WebSocket>({
    key: "socketAtom",
    default: null,
});

export const userAtom = atom<UserType>({
    key: "userAtom",
    default: {
        userId: "",
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
    default: [
        {
            roomId: "room_id_1",
        },
        {
            roomId: "room_id_2",
        },
    ],
});
