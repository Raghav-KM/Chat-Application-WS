import { atom } from "recoil";

export type UserType = {
    userId: string;
    userName: string;
};

export const userAtom = atom<UserType>({
    key: "userAtom",
    default: {
        userId: "",
        userName: "",
    },
});
