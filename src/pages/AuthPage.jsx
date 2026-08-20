import { useState } from "react";
import { Lock, Mail } from "lucide-react";

// ================= ĐĂNG KÝ / ĐĂNG NHẬP =================
export function AuthPage({ users, setUsers, setCurrentUser, goTo }) {
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (mode === "login") {
      const user = users.find((u) => u.email === form.email && u.password === form.password);
      if (!user) {
        setError("Email hoặc mật khẩu không đúng.");
        return;
      }
      setCurrentUser(user);
      goTo("shop");
    } else {
      if (!form.name || !form.email || !form.password) {
        setError("Vui lòng điền đầy đủ thông tin.");
        return;
      }
      if (users.some((u) => u.email === form.email)) {
        setError("Email này đã được đăng ký.");
        return;
      }
      const newUser = { name: form.name, email: form.email, password: form.password };
      setUsers((prev) => [...prev, newUser]);
      setCurrentUser(newUser);
      goTo("shop");
    }
  };

  return (
    <div className="bg-white mx-auto p-6 border border-slate-200 rounded-2xl max-w-sm">
      <div className="flex bg-slate-100 mb-6 p-1 rounded-lg">
        <button
          onClick={() => { setMode("login"); setError(""); }}
          className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
            mode === "login" ? "bg-white shadow-sm text-slate-800" : "text-slate-500"
          }`}
        >
          Đăng nhập
        </button>
        <button
          onClick={() => { setMode("register"); setError(""); }}
          className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
            mode === "register" ? "bg-white shadow-sm text-slate-800" : "text-slate-500"
          }`}
        >
          Đăng ký
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {mode === "register" && (
          <input
            type="text"
            placeholder="Họ và tên"
            value={form.name}
            onChange={update("name")}
            className="px-3 py-2 border border-slate-200 focus:border-slate-400 rounded-lg focus:outline-none w-full text-sm"
          />
        )}
        <div className="relative">
          <Mail size={15} className="top-1/2 left-3 absolute text-slate-400 -translate-y-1/2" />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={update("email")}
            className="py-2 pr-3 pl-9 border border-slate-200 focus:border-slate-400 rounded-lg focus:outline-none w-full text-sm"
          />
        </div>
        <div className="relative">
          <Lock size={15} className="top-1/2 left-3 absolute text-slate-400 -translate-y-1/2" />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={update("password")}
            className="py-2 pr-3 pl-9 border border-slate-200 focus:border-slate-400 rounded-lg focus:outline-none w-full text-sm"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-slate-800 hover:bg-slate-700 py-2.5 rounded-lg w-full font-medium text-white transition-colors"
        >
          {mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}
        </button>
      </form>

      {mode === "login" && (
        <p className="mt-4 text-slate-400 text-xs text-center">
          Tài khoản demo: <span className="font-mono">demo@shop.vn</span> / <span className="font-mono">123456</span>
        </p>
      )}
    </div>
  );
}
