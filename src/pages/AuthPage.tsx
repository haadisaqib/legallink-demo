import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import { useState } from "react";

const AuthPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Legal AI Suite Login
        </h2>
        <form className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            disabled
          >
            <LogIn size={18} /> Login (disabled)
          </button>
        </form>
        <div className="flex justify-center">
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 dark:hover:bg-gray-700 transition"
            onClick={() => navigate("/app")}
          >
            <ArrowRight size={18} /> Bypass Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 