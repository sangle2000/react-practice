import { Lock, Mail } from "lucide-react";

// ================= ĐĂNG KÝ / ĐĂNG NHẬP =================
export function AuthPage() {
  return (
    <div className="bg-white mx-auto p-6 border border-slate-200 rounded-2xl max-w-sm">
      <div className="flex bg-slate-100 mb-6 p-1 rounded-lg">
        <button className="flex-1 py-2 rounded-md text-sm font-medium bg-white shadow-sm text-slate-800">
          Đăng nhập
        </button>
        <button className="flex-1 py-2 rounded-md text-sm font-medium text-slate-500">
          Đăng ký
        </button>
      </div>

      <form className="space-y-3">
        <div className="relative">
          <Mail size={15} className="top-1/2 left-3 absolute text-slate-400 -translate-y-1/2" />
          <input
            type="email"
            placeholder="Email"
            className="py-2 pr-3 pl-9 border border-slate-200 focus:border-slate-400 rounded-lg focus:outline-none w-full text-sm"
          />
        </div>
        <div className="relative">
          <Lock size={15} className="top-1/2 left-3 absolute text-slate-400 -translate-y-1/2" />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="py-2 pr-3 pl-9 border border-slate-200 focus:border-slate-400 rounded-lg focus:outline-none w-full text-sm"
          />
        </div>

        <button
          type="submit"
          className="bg-slate-800 hover:bg-slate-700 py-2.5 rounded-lg w-full font-medium text-white transition-colors"
        >
          Đăng nhập
        </button>
      </form>

      <p className="mt-4 text-slate-400 text-xs text-center">
        Tài khoản demo: <span className="font-mono">demo@shop.vn</span> / <span className="font-mono">123456</span>
      </p>
    </div>
  );
}
