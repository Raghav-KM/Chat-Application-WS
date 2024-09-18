import { atom } from "recoil";

export type UserType = {
    userId: string;
    userName: string;
    status: "online" | "offline";
};
export type RoomType = {
    roomId: string;
};
export const defaultUsers: UserType[] = [
    {
        userId: "admin_user_1",
        userName: "User A",
        status: "offline",
    },
    {
        userId: "admin_user_2",
        userName: "User B",
        status: "offline",
    },
    {
        userId: "admin_user_3",
        userName: "User C",
        status: "offline",
    },
];
export const userAtom = atom<UserType>({
    key: "userAtom",
    default: {
        userId: "",
        userName: "",
        status: "offline",
    },
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
