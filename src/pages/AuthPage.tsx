import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import { useState } from "react";

const AuthPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-10 space-y-8 bg-slate-800 rounded-2xl shadow-xl border border-slate-700">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            LegalLink
          </h2>
          <p className="text-slate-300 text-sm">
            Sign in to your LegalLink account
          </p>
        </div>
        
        <form className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-slate-700 focus:bg-slate-600 text-white placeholder-slate-400"
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-slate-700 focus:bg-slate-600 text-white placeholder-slate-400"
              />
            </div>
          </div>
          
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 px-6 bg-blue-700 text-white rounded-xl hover:bg-blue-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 opacity-60 cursor-not-allowed"
            disabled
          >
            <LogIn size={20} /> 
            Sign In (Disabled)
          </button>
        </form>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-slate-800 text-slate-400">or</span>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button
            type="button"
            className="flex items-center gap-3 px-6 py-3 border-2 border-blue-400 text-blue-400 rounded-xl hover:bg-blue-400 hover:text-slate-800 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
            onClick={() => navigate("/app")}
          >
            <ArrowRight size={20} /> 
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;