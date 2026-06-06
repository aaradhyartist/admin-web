import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader2, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { loginUser } from "../services/authService";
import { setUser } from "../store/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Enter your email and password");
      return;
    }
    setLoading(true);
    try {
      const data = await loginUser(form); // { ...user, accessToken, refreshToken }
      if (data?.role !== "admin") {
        toast.error("This account doesn't have admin access.");
        setLoading(false);
        return;
      }
      dispatch(
        setUser({
          user: data,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })
      );
      toast.success("Welcome back, Admin");
      navigate("/dashboard");
    } catch (err) {
      toast.error(typeof err === "string" ? err : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      {/* soft red glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#DC2626]/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Brand */}
        <div className="flex flex-col items-center mb-8">
          <img src="/Logo-A/3.png" alt="AaradhyArtist" className="w-16 h-16 rounded-2xl object-cover mb-4" />
          <h1 className="text-2xl font-black uppercase tracking-tighter text-white">
            Aaradhy<span className="text-[#DC2626]">Artist</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">Admin Panel</p>
        </div>

        <form onSubmit={onSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-5 shadow-2xl shadow-black/30">
          <h2 className="text-xl font-bold text-white mb-1">Sign in</h2>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder="admin@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-slate-200 placeholder:text-slate-500 focus:border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                name="password"
                type={showPw ? "text" : "password"}
                value={form.password}
                onChange={onChange}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-11 py-3 text-slate-200 placeholder:text-slate-500 focus:border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors text-white ${loading ? "bg-[#DC2626]/70 cursor-not-allowed" : "bg-[#DC2626] hover:bg-[#b91c1c]"}`}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-center text-slate-600 text-xs mt-6 uppercase tracking-widest font-bold">
          Authorized personnel only
        </p>
      </div>
    </div>
  );
}
