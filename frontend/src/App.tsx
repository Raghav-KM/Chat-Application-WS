import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { useRecoilState, useSetRecoilState } from "recoil";
import { socketAtom, userListAtom } from "./atoms/atoms";
import { useEffect } from "react";
import { GuestRoutes } from "./components/route-types/GuestRoutes";
import { ProtectedRoutes } from "./components/route-types/ProtextedRoutes";

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
            // console.log(`Received Message : ${message.data}`);
            const parsed_message = JSON.parse(message.data);
            console.log(parsed_message);
            if (parsed_message.type == "state") {
                setUserList(parsed_message.state_body.users);
            }
        };

        socket.onclose = () => {
            console.log("Disconnected from server");
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
            </Routes>
        </>
    );
}

export default App;
