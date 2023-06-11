import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import ChatPage from "./pages/ChatPage";
import MessagePage from "./pages/MessagePage";
import AdminPage from "./admin/AdminPage";
import SchoolAdminPage from "./admin/SchoolAdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/message" element={<MessagePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/schoolAdmin" element={<SchoolAdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
