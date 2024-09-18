import { useRecoilValue } from "recoil";
import { roomListAtom, RoomType, userAtom } from "../atoms/atoms";

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
    const user = useRecoilValue(userAtom);
    return (
        <div className="w-full h-full border border-black p-2 flex flex-col justify-center">
            <UserDetails heading="Id:" value={user.userId} />
            <UserDetails heading="Name:" value={user.userName} />
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
        <div className="flex flex-row p-1 gap-2 items-center">
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
