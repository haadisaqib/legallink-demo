import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, ArrowRight, Shield, Sparkles } from "lucide-react";
import { useState } from "react";

const AuthPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-950 via-blue-950 to-black font-['Montserrat',sans-serif]">
      {/* Animated Northern Lights Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Long Streaky Aurora - Primary */}
        <div 
          className="absolute top-1/4 left-0 w-[200%] h-40"
          style={{
            animation: 'streakAurora1 20s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            transform: 'rotate(-15deg)',
            transformOrigin: 'center'
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-300/40 to-transparent blur-xl"></div>
        </div>

        {/* Long Streaky Aurora - Secondary with Wave */}
        <div 
          className="absolute top-1/3 left-0 w-[180%] h-32"
          style={{
            animation: 'streakAurora2 25s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            transform: 'rotate(-20deg)',
            animationDelay: '3s',
            transformOrigin: 'center'
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent blur-lg"></div>
        </div>

        {/* Wavy Vertical Streaks */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-screen w-1.5"
              style={{
                left: `${20 + i * 15}%`,
                animation: `verticalStreak ${12 + i * 2}s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
                animationDelay: `${i * 1.5}s`,
                background: 'linear-gradient(to bottom, transparent, rgba(191, 219, 254, 0.25), transparent)',
                filter: 'blur(8px)',
                transformOrigin: 'center'
              }}
            />
          ))}
        </div>

        {/* Wavy Diagonal Fast Streaks */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute h-[200%] w-2.5"
              style={{
                left: `${30 + i * 25}%`,
                top: '-50%',
                transform: 'rotate(-45deg)',
                animation: `diagonalStreak ${15 + i * 2}s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
                animationDelay: `${i * 2}s`,
                background: 'linear-gradient(to bottom, transparent, rgba(147, 197, 253, 0.3), transparent)',
                filter: 'blur(4px)',
                transformOrigin: 'center'
              }}
            />
          ))}
        </div>

        {/* Additional Diagonal Wave Elements */}
        <div className="absolute inset-0">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="absolute h-[180%] w-4"
              style={{
                left: `${45 + i * 20}%`,
                top: '-40%',
                transform: 'rotate(-35deg)',
                animation: `diagonalStreak ${20 + i * 3}s infinite ease-in-out reverse, diagonalWave ${12 + i * 2}s infinite ease-in-out`,
                animationDelay: `${i * 3}s, ${i * 2}s`,
                background: 'linear-gradient(to bottom, transparent, rgba(147, 197, 253, 0.25), transparent)',
                filter: 'blur(6px)',
                transformOrigin: 'center'
              }}
            >
              {/* Inner wavy gradient */}
              <div 
                className="absolute inset-0"
                style={{
                  animation: `waveFlow ${12 + i * 2}s infinite ease-in-out`,
                  animationDelay: `${i * 1.5}s`,
                  background: 'linear-gradient(to bottom, transparent, rgba(191, 219, 254, 0.15), transparent)',
                  filter: 'blur(4px)'
                }}
              />
            </div>
          ))}
        </div>

        {/* Additional Wavy Element */}
        <div 
          className="absolute top-1/2 left-0 w-[150%] h-24"
          style={{
            animation: 'waveFlow 18s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            transform: 'rotate(-10deg)',
            transformOrigin: 'center'
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-200/60 to-transparent blur-lg"></div>
        </div>
        
        {/* Aurora Line 3 - Undulating ribbon */}
        <div 
          className="absolute bottom-1/3 left-0 w-[150%] h-20"
          style={{
            animation: 'aurora3 18s infinite ease-in-out',
            animationDelay: '10s'
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-500/45 to-transparent blur-sm transform origin-center"></div>
        </div>
        
        {/* Additional flowing waves for depth */}
        <div 
          className="absolute top-1/6 left-0 w-[120%] h-16"
          style={{
            animation: 'wave 15s infinite ease-in-out'
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-300/30 to-transparent blur-xl transform origin-left"></div>
        </div>
        
        <div 
          className="absolute bottom-1/6 left-0 w-[120%] h-28"
          style={{
            animation: 'wave 15s infinite ease-in-out',
            animationDelay: '8s'
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-cyan-500/35 to-transparent blur-md transform origin-right"></div>
        </div>
        
        {/* Subtle shimmering particles */}
        <div 
          className="absolute top-2/5 left-0 w-[130%] h-12"
          style={{
            animation: 'aurora1 20s infinite ease-in-out',
            animationDelay: '3s'
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-400/25 to-transparent blur-2xl transform origin-center"></div>
        </div>
        
        <div 
          className="absolute bottom-2/5 left-0 w-[130%] h-8"
          style={{
            animation: 'aurora2 25s infinite ease-in-out',
            animationDelay: '7s'
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent blur-xl transform origin-left"></div>
        </div>

        {/* Background subtle glow with wave */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-blue-950/20"
          style={{
            animation: 'waveFlow 30s infinite ease-in-out',
            transformOrigin: 'center'
          }}
        ></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-4">
        <div className="w-full max-w-sm">
          {/* Main Card */}
          <div 
            className="relative p-6 space-y-4 bg-gradient-to-b from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 transition-all duration-500 hover:shadow-blue-500/10 hover:shadow-3xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Glowing Border Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            
            {/* Header Section */}
            <div className="relative text-center space-y-2">
              <div className="flex justify-center mb-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-xl animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 p-2.5 rounded-2xl">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <h1 className="text-2xl font-semibold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent leading-tight tracking-wide">
                  LegalLink
                </h1>
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />
                  <p className="text-slate-300 text-xs font-normal tracking-wider uppercase">
                    Secure Authentication Portal
                  </p>
                  <Sparkles className="w-3 h-3 text-blue-400 animate-pulse delay-500" />
                </div>
              </div>
            </div>
            
            {/* Form Section */}
            <div className="space-y-3">
              <div className="space-y-2.5">
                {/* Email Input */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          <div className="relative">
            <input
              type="email"
                      placeholder="Enter your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-slate-700/50 backdrop-blur-sm focus:bg-slate-600/50 text-white placeholder-slate-400 hover:border-blue-500/50 text-sm"
            />
          </div>
                </div>
                
                {/* Password Input */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          <div className="relative">
            <input
              type="password"
                      placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-slate-700/50 backdrop-blur-sm focus:bg-slate-600/50 text-white placeholder-slate-400 hover:border-blue-500/50 text-sm"
            />
          </div>
                </div>
              </div>
              
              {/* Sign In Button */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          <button
            type="button"
                  className="relative w-full flex items-center justify-center gap-2 py-2.5 px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-medium shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-blue-500/25 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 tracking-wide"
            disabled
          >
                  <LogIn size={18} /> 
                  <span>Sign In</span>
                  <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </button>
              </div>
            </div>
            
            {/* Animated Divider */}
            <div className="relative py-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent relative overflow-hidden">
                  {/* Animated flowing light */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent w-1/3 animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent w-1/4 animate-ping"></div>
                </div>
              </div>
              
              {/* Animated dots */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-200"></div>
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-400"></div>
                </div>
              </div>
              
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-600"></div>
                  <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-800"></div>
                  <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-1000"></div>
                </div>
              </div>
              
              <div className="relative flex justify-center">
                <span className="px-4 bg-gradient-to-r from-slate-800 via-slate-800 to-slate-800 text-slate-400 text-xs font-normal tracking-wider relative">
                  or continue with
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400/30 rounded-full animate-ping"></div>
                </span>
              </div>
            </div>
            
            {/* Guest Access Button */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          <button
            type="button"
                className="relative w-full flex items-center justify-center gap-2 py-2.5 px-6 border-2 border-blue-400/50 text-blue-400 rounded-xl font-semibold backdrop-blur-sm transition-all duration-300 transform hover:scale-[1.02] hover:bg-blue-400/10 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-400/20 group"
            onClick={() => navigate("/app")}
          >
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" /> 
                <span>Demo</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-cyan-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - moved to bottom right */}
      <div className="absolute bottom-4 right-4 z-20">
        <p className="text-slate-500 text-xs font-light tracking-wider">
          Powered by LegalLink AI
        </p>
      </div>
    </div>
  );
};

export default AuthPage; 