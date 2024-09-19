import { useRecoilState, useRecoilValue } from "recoil";
import { roomListAtom, RoomType, socketAtom, userAtom } from "../atoms/atoms";
import { useNavigate } from "react-router-dom";

export const LeftPanel = () => {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full h-24 px-2 pt-2 pb-1">
                <UserInfo />
            </div>
            <div className="w-full flex-grow px-2 py-1">
                <RoomList />
            </div>
            <div className="w-full h-16 px-2 pb-2 pt-1">
                <Options />
            </div>
        </div>
    );
};

const UserInfo = () => {
    const [user, setUser] = useRecoilState(userAtom);
    const socket = useRecoilValue(socketAtom);
    const navigate = useNavigate();
    const handleOnLogout = () => {
        const message = {
            type: "init",
            init_body: {
                userId: user.userId,
                userName: user.userName,
                state: {
                    visibility: "offline",
                },
            },
        };
        socket?.send(JSON.stringify(message));
        setUser({
            userId: "",
            userName: "",
            state: {
                visibility: "offline",
            },
        });
        sessionStorage.removeItem("active-user");
        navigate("/login");
    };
    return (
        <div className="flex flex-row border border-black w-full h-full">
            <div className="flex-grow h-full p-2 flex flex-col justify-center">
                <UserDetails heading="Id:" value={user.userId} />
                <UserDetails heading="Name:" value={user.userName} />
            </div>
            <div
                className="w-20 h-full border-s border-black p-2 flex justify-center items-center font-mono text-sm font-bold hover:bg-gray-200 cursor-pointer"
                onClick={handleOnLogout}
            >
                Logout
            </div>
        </div>
    );
};

const UserDetails = ({
    heading,
    value,
}: {
    heading: string;
    value: string;
}) => {
    return (
        <div className="w-full flex flex-row p-1 gap-2 items-center">
            <div className="w-16 font-mono text-end font-bold text-md">
                {heading}
            </div>
            <div className="font-mono font-semibold text-md">{value}</div>
        </div>
    );
};

const RoomList = () => {
    const roomList = useRecoilValue(roomListAtom);
    return (
        <div className="w-full h-full border border-black">
            {roomList.map((room: RoomType) => (
                <RoomListItem room={room} key={room.roomId} />
            ))}
        </div>
    );
};
const RoomListItem = ({ room }: { room: RoomType }) => {
    return (
        <div className="flex flex-col px-4 py-2 border-b border-black hover:bg-gray-200 hover:cursor-pointer">
            <div className="text-lg font-mono font-semibold">{room.roomId}</div>
            <div className="font-mono">Room Description of {room.roomId}</div>
        </div>
    );
};

const Options = () => {
    return (
        <div className="w-full h-full border border-black flex flex-row">
            <div className="flex-grow h-full flex justify-center items-center font-mono text-md">
                Add Room
            </div>
            <div className="w-16 h-full border-s border-black text-2xl font-mono flex justify-center items-center hover:bg-gray-200 hover:cursor-pointer">
                +
            </div>
        </div>
    );
};
