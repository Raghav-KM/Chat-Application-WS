import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { useRecoilState } from "recoil";
import { socketAtom } from "./atoms/atoms";
import { useEffect } from "react";

function App() {
    const [socket, setSocket] = useRecoilState(socketAtom);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:3000");
        socket.onopen = () => {
            console.log("WebSocket Connetion Successfull");
            setSocket(socket);
        };
        socket.onmessage = (message) => {
            console.log(`Received Message : ${message.data}`);
        };
        socket.onclose = () => {
            console.log("Disconnected from server");
        };
    }, []);

    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </>
    );
}

export default App;
