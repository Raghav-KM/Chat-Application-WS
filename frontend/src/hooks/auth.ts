import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { socketAtom, userAtom, UserType } from "../atoms/atoms";

export const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const setUser = useSetRecoilState(userAtom);
    const socket = useRecoilValue(socketAtom);
    useEffect(() => {
        if (sessionStorage.getItem("active-user")) {
            setLoggedIn(true);
            const user: UserType = JSON.parse(
                sessionStorage.getItem("active-user")!
            );
            const message = {
                type: "init",
                init_body: {
                    userId: user.userId,
                    userName: user.userName,
                    state: {
                        visibility: "online",
                    },
                },
            };
            socket?.send(JSON.stringify(message));
            setUser(user);
        }
        setLoading(false);
    }, [socket]);
    return { loading, loggedIn };
};
