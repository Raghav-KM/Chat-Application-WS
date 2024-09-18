import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { defaultUsers, socketAtom, userAtom, UserType } from "../atoms/atoms";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Login = () => {
    const socket = useRecoilValue(socketAtom);
    return (
        <div className="bg-black w-full h-lvh flex justify-center items-center">
            <div className="w-[360px] bg-white h-[360px] p-4">
                {!socket ? (
                    <div>Loading....</div>
                ) : (
                    <div className="w-full h-full border border-black p-8 flex flex-col ">
                        <div className="h-fit w-full p-2 text-center font-mono font-bold text-2xl">
                            Select USER
                        </div>
                        <div className="flex-grow justify-center  w-full flex flex-col gap-2">
                            {defaultUsers
                                .filter((user) => user.status == "offline")
                                .map((user: UserType) => (
                                    <UserSelectButton
                                        user={user}
                                        key={user.userId}
                                    ></UserSelectButton>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export const UserSelectButton = ({ user }: { user: UserType }) => {
    const setUser = useSetRecoilState(userAtom);
    const navigate = useNavigate();
    const handleOnClick = () => {
        setUser(user);
        navigate("/dashboard");
    };
    return (
        <div
            className="p-4 border border-black hover:bg-gray-200 hover:cursor-pointer hover:font-bold shadow-sm font-mono"
            onClick={handleOnClick}
        >
            {user.userName}
        </div>
    );
};
