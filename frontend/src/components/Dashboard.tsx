import { useRecoilValue } from "recoil";
import { userAtom } from "../atoms/atoms";
import { LeftPanel } from "./LeftPanel";
import { RightPanel } from "./RightPanel";

export const Dashboard = () => {
    const user = useRecoilValue(userAtom);
    return (
        <div className="w-full h-lvh bg-black flex flex-row items-center justify-center gap-4">
            <div className="w-[360px] h-[720px] bg-white">
                <LeftPanel />
            </div>
            <div className="w-[720px] h-[720px] bg-white">
                <RightPanel />
            </div>
        </div>
    );
};
