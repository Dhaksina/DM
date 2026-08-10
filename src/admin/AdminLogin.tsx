import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Shield, Key, Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdminLoginProps {
  onBack: () => void;
  onLoginSuccess: (email: string) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBack, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1. Try Firebase Authentication first
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (userCredential.user) {
          onLoginSuccess(userCredential.user.email || email);
          setLoading(false);
          return;
        }
      } catch (fbErr: any) {
        console.warn("Firebase authentication failed, attempting local fallback check:", fbErr);
      }

      // 2. Fallback to local hardcoded credentials for demo/preview
      if (email === 'dharsna2004@gmail.com' && password === 'Dhaksina0915') {
        onLoginSuccess(email);
      } else {
        setError('Invalid admin credentials. Please try again.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center p-6 relative overflow-hidden font-inter text-white">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#9c1535]/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-[#B600A8]/10 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-60" />

      {/* Back to Site Button */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-zinc-400 bg-white/5 border border-white/10 hover:border-[#E289E5]/30 hover:text-white hover:shadow-[0_0_15px_rgba(226,137,229,0.15)] rounded-full transition-all duration-300 focus:outline-none"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="tracking-widest">BACK TO SITE</span>
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-black/75 border border-white/10 backdrop-blur-2xl rounded-[32px] p-8 md:p-10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative group overflow-hidden"
      >
        {/* Glow border line top */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E289E5]/40 to-transparent group-hover:via-[#E289E5]/80 transition-all duration-500" />

        {/* Ambient Corner Accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#E289E5]/60 rounded-tl-2xl opacity-60 group-hover:scale-105 transition-transform" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#E289E5]/60 rounded-tr-2xl opacity-60 group-hover:scale-105 transition-transform" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#E289E5]/60 rounded-bl-2xl opacity-60 group-hover:scale-105 transition-transform" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#E289E5]/60 rounded-br-2xl opacity-60 group-hover:scale-105 transition-transform" />

        {/* Shield Icon Emblem */}
        <div className="flex flex-col items-center mb-8 relative">
          {/* Logo Glow Ring */}
          <div className="absolute -top-3 w-20 h-20 bg-[#E289E5]/10 rounded-full blur-xl group-hover:bg-[#E289E5]/20 transition-all" />
          
          <div className="p-4 bg-gradient-to-tr from-[#4B1013] to-[#9c1535] rounded-2xl text-white shadow-[0_10px_30px_rgba(156,21,53,0.3)] mb-4 border border-white/10 group-hover:scale-110 transition-transform duration-300">
            <Shield className="w-8 h-8 text-white/95" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-[0.25em] uppercase text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
            ADMIN ACCESS
          </h2>
          <p className="text-zinc-500 text-[9px] uppercase tracking-widest font-mono mt-2.5 flex items-center gap-1.5 border border-zinc-800/80 bg-zinc-950/80 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
            <span>SYS: AUTH_PENDING</span>
            <span className="w-1 h-2.5 bg-[#E289E5] animate-pulse inline-block" />
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs flex gap-2.5 items-start">
            <Shield className="w-4.5 h-4.5 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold block mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dharsna2004@gmail.com"
                className="w-full bg-white/5 border border-white/10 focus:border-[#E289E5]/60 text-sm text-white pl-10 pr-4 py-3 rounded-xl outline-none transition-colors duration-250"
              />
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold block mb-2">
              Security Key
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-white/5 border border-white/10 focus:border-[#E289E5]/60 text-sm text-white pl-10 pr-4 py-3 rounded-xl outline-none transition-colors duration-250"
              />
              <Key className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-4 text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 rounded-xl transition-all duration-300 shadow-lg disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authorizing Access...</span>
              </>
            ) : (
              <span>Enter Dashboard</span>
            )}
          </button>
        </form>

        {/* Local Sandbox Credentials Info */}
        <div className="mt-8 p-4 bg-[#9c1535]/10 border border-[#9c1535]/25 rounded-2xl text-[11px] text-zinc-400">
          <span className="font-bold text-[#E289E5] block mb-1">Local Sandbox Credentials:</span>
          <div className="space-y-1 font-mono">
            <div>Email: <code className="text-white bg-white/5 px-1.5 py-0.5 rounded">dharsna2004@gmail.com</code></div>
            <div>Key: <code className="text-white bg-white/5 px-1.5 py-0.5 rounded">Dhaksina0915</code></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
