import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { useSetRecoilState } from "recoil";
import {
    messageListAtom,
    roomListAtom,
    socketAtom,
    userListAtom,
} from "./atoms/atoms";
import { useEffect } from "react";
import { GuestRoutes } from "./components/route-types/GuestRoutes";
import { ProtectedRoutes } from "./components/route-types/ProtextedRoutes";
import { ChatMessageType, ServerMessageType } from "../../backend/src/types";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as String;

function App() {
    const setSocket = useSetRecoilState(socketAtom);
    const setUserList = useSetRecoilState(userListAtom);
    const setRoomList = useSetRecoilState(roomListAtom);
    const setMessages = useSetRecoilState(messageListAtom);

    useEffect(() => {
        const socket = new WebSocket(`${BACKEND_URL}`);
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

                if (
                    parsed_message.type == "state" &&
                    parsed_message.state_body
                ) {
                    setUserList(parsed_message.state_body.users);
                } else if (
                    parsed_message.type == "room_state" &&
                    parsed_message.state_body
                ) {
                    setRoomList(parsed_message.state_body.rooms);
                } else if (parsed_message.type == "message") {
                    if (!parsed_message.message_body) return;

                    const received_message: ChatMessageType =
                        parsed_message.message_body;

                    setMessages((message) => {
                        let updated_message = message;

                        updated_message = {
                            ...updated_message,
                            [received_message.room_id]: {
                                messages: [
                                    ...message[received_message.room_id]
                                        .messages,
                                    received_message,
                                ],
                            },
                        };
                        // console.log(updated_message);
                        return updated_message;
                    });
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
                <Route path="*" element={<Navigate to={"/login"} />} />
            </Routes>
        </>
    );
}

export default App;
