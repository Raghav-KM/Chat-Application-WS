import { useRecoilValue } from "recoil";
import { userAtom, userListAtom } from "../atoms/atoms";
import { UserType } from "../../../backend/src/types";

export const RightPanel = () => {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full h-24 px-2 pt-2 pb-1">
                <MemberStatus />
            </div>
            <div className="w-full flex-grow px-2 py-1">
                <ChatSection />
            </div>
            <div className="w-full h-16 px-2 pb-2 pt-1">
                <MessageSection />
            </div>
        </div>
    );
};

const MemberStatus = () => {
    const current_user = useRecoilValue(userAtom);
    const userList = useRecoilValue(userListAtom);

    return (
        <div className="w-full h-full border border-black flex flex-row gap-2">
            <div className="w-24 border-e border-black h-full flex justify-center items-center font-mono">
                Other
                <br></br>
                Members
            </div>
            <div className="flex-grow h-full flex flex-row">
                {userList
                    .filter((user) => user.user_id != current_user.user_id)
                    .map((user: UserType) => (
                        <MemberAvatar user={user} key={user.user_id} />
                    ))}
            </div>
        </div>
    );
};

const MemberAvatar = ({ user }: { user: UserType }) => {
    return (
        <div className="w-fit h-full p-2 flex flex-col justify-center">
            <div className="w-12 h-12 border border-black flex justify-center items-center bg-gray-100 mb-[2px]">
                {`${user.userName.split(" ")[0][0]}
                    ${user.userName.split(" ")[1][0]}`}
            </div>
            {user.state.visibility == "online" ? (
                <div className="text-xs w-12 flex flex-row items-center">
                    <div className="me-[2px] bg-green-500 w-2 h-2"></div>
                    <div>online</div>
                </div>
            ) : (
                <div className="text-xs w-12 flex flex-row items-center">
                    <div className="me-[2px] bg-red-500 w-2 h-2"></div>
                    <div>offline</div>
                </div>
            )}
        </div>
    );
};

const ChatSection = () => {
    return <div className="w-full h-full border border-black"></div>;
};

const MessageSection = () => {
    return (
        <div className="w-full h-full border border-black flex flex-row">
            <div className="flex-grow h-full p-2">
                <input className="w-full h-full border outline-none p-4 text-sm font-mono bg-gray-50"></input>
            </div>
            <div className="w-16 h-full hover:bg-gray-200 hover:font-semibold cursor-pointer flex justify-center items-center font-mono border-s border-black text-sm">
                Send
            </div>
        </div>
    );
};
