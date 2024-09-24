import { useRecoilValue, useSetRecoilState } from "recoil";
import { socketAtom, userAtom, userListAtom } from "../atoms/atoms";
import { useNavigate } from "react-router-dom";
import { UserType } from "../../../backend/src/types";

export const Login = () => {
    const socket = useRecoilValue(socketAtom);
    const userList = useRecoilValue(userListAtom);
    return (
        <div className="bg-black w-full h-lvh flex justify-center items-center">
            <div className="w-[360px] bg-white h-[360px] p-4">
                {!socket ? (
                    <div className="font-mono text-sm font-semibold">
                        Establishing WS Connection....
                    </div>
                ) : (
                    <div className="w-full h-full border border-black p-8 flex flex-col ">
                        <div className="h-fit w-full p-2 text-center font-mono font-bold text-2xl">
                            Select USER
                        </div>
                        <div className="flex-grow justify-center  w-full flex flex-col gap-2">
                            {userList
                                .filter(
                                    (user) => user.state.visibility == "offline"
                                )
                                .map((user: UserType) => (
                                    <UserSelectButton
                                        user={user}
                                        key={user.user_id}
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
        setUser({
            ...user,
            state: {
                visibility: "online",
            },
        });
        sessionStorage.setItem("active-user", JSON.stringify(user));
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
