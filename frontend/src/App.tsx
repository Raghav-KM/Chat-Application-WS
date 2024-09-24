import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { useRecoilState, useSetRecoilState } from "recoil";
import { socketAtom, userListAtom } from "./atoms/atoms";
import { useEffect } from "react";
import { GuestRoutes } from "./components/route-types/GuestRoutes";
import { ProtectedRoutes } from "./components/route-types/ProtextedRoutes";
import { ServerMessageType } from "../../backend/src/types";

function App() {
    const [socket, setSocket] = useRecoilState(socketAtom);
    const setUserList = useSetRecoilState(userListAtom);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:3000");
        socket.onopen = () => {
            console.log("WebSocket Connetion Successfull");
            setSocket(socket);
        };

        socket.onmessage = (message) => {
            try {
                const parsed_message = JSON.parse(
                    message.data
                ) as ServerMessageType;
                console.log(parsed_message);

                if (parsed_message.type == "state") {
                    setUserList(parsed_message.state_body.users);
                } else if (parsed_message.type == "message") {
                }
            } catch (ex) {
                console.log("Invalid Server Message");
            }
        };

        socket.onclose = () => {
            console.log("Disconnected from server");
            setSocket(null);
        };
    }, []);

    return (
        <>
            <Routes>
                <Route element={<GuestRoutes />}>
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route element={<ProtectedRoutes />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route path="*" element={<Login />} />
            </Routes>
        </>
    );
}

export default App;
