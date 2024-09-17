import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";

function App() {
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
