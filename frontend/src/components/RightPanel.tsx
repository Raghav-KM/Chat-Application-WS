import { useRecoilValue } from "recoil";
import {
    roomListAtom,
    selectedRoomAtom,
    userAtom,
    userListAtom,
} from "../atoms/atoms";
import { UserType } from "../../../backend/src/types";
import { MessageSection } from "./ChatSection";

export const RightPanel = () => {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full h-24 px-2 pt-2 pb-1">
                <MemberStatus />
            </div>
            <div className="w-full flex-grow">
                <MessageSection />
            </div>
        </div>
    );
};

const MemberStatus = () => {
    const current_user = useRecoilValue(userAtom);
    const userList = useRecoilValue(userListAtom);
    const selecterRoomId = useRecoilValue(selectedRoomAtom);

    const roomDetails = useRecoilValue(roomListAtom).find(
        (room) => room.room_id == selecterRoomId
    );

    return selecterRoomId == "" && !roomDetails ? (
        <div className="w-full h-full border border-black "></div>
    ) : (
        <div className="w-full h-full border border-black flex flex-row gap-2">
            <div className="w-24 border-e border-black h-full flex justify-center items-center font-mono">
                Other
                <br></br>
                Members
            </div>
            <div className="flex-grow h-full flex flex-row">
                {userList
                    .filter(
                        (user) =>
                            user.user_id != current_user.user_id &&
                            roomDetails?.member_ids.includes(user.user_id)
                    )
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
