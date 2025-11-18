import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Signup";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import Games from "./pages/Games";
import GameSession from "./pages/GameSession";
import GameStatistics from "./pages/GameStatistics";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 transition-colors duration-300">
      <Navbar />

      <div className="flex flex-1 ">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 p-6 min-h-[calc(100vh-128px)] bg-white shadow-sm">
          <Toaster position="top-right" reverseOrder={false} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<Users />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/games/:userId" element={<Games />} />
            <Route
              path="/games/session/:gameId/:userId"
              element={<GameSession />}
            />
            <Route path="/statistics/:userId" element={<GameStatistics />} />
          </Routes>
        </main>
      </div>
      <Analytics />
    </div>
  );
}
