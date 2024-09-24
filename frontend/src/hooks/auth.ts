import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { socketAtom, userAtom } from "../atoms/atoms";
import { ClientMessageType, UserType } from "../../../backend/src/types";

export const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    const setUser = useSetRecoilState(userAtom);
    const socket = useRecoilValue(socketAtom);

    useEffect(() => {
        if (sessionStorage.getItem("active-user")) {
            console.log("Authenticating User..");
            try {
                const user: UserType = JSON.parse(
                    sessionStorage.getItem("active-user")!
                );
                const message: ClientMessageType = {
                    type: "init",
                    init_body: {
                        user_id: user.user_id,
                        userName: user.userName,
                        state: {
                            visibility: "online",
                        },
                    },
                };
                socket?.send(JSON.stringify(message));
                setLoggedIn(true);
                setUser(user);
            } catch (ex) {
                sessionStorage.clear();
                setLoggedIn(true);
            }
        }
        setLoading(false);
    }, [socket]);
    return { loading, loggedIn };
};
