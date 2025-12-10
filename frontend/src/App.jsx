// App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import WelcomePage from "./pages/WelcomePage";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
