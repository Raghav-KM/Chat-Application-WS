import { useSetRecoilState } from "recoil";
import { userAtom, UserType } from "../atoms/atoms";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const defaultUsers: UserType[] = [
        {
            userId: "admin_user_1",
            userName: "User A",
        },
        {
            userId: "admin_user_2",
            userName: "User B",
        },
        {
            userId: "admin_user_3",
            userName: "User C",
        },
    ];

    return (
        <div className="bg-black w-full h-lvh flex justify-center items-center">
            <div className="w-[360px] bg-white h-[360px] p-8 flex flex-col">
                <div className="h-fit w-full p-2 text-center font-mono font-bold text-2xl">
                    Select USER
                </div>
                <div className="flex-grow justify-center  w-full flex flex-col gap-2">
                    {defaultUsers.map((user: UserType) => (
                        <UserSelectButton
                            user={user}
                            key={user.userId}
                        ></UserSelectButton>
                    ))}
                </div>
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
            className="p-4 border hover:bg-gray-200 hover:cursor-pointer hover:font-bold shadow-sm font-mono"
            onClick={handleOnClick}
        >
            {user.userName}
        </div>
    );
};
