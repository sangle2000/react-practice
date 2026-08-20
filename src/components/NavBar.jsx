import { Home, ShoppingCart, User, Package } from "lucide-react";

// ================= NAVBAR =================
export function NavBar() {
  return (
    <header className="top-0 z-10 sticky bg-white border-slate-200 border-b">
      <div className="flex justify-between items-center mx-auto px-4 max-w-5xl h-16">
        <div className="font-bold text-slate-800 text-lg">🛍️ MiniShop</div>
        <nav className="flex items-center gap-1">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-slate-800 text-white">
            <Home size={16} />
            Trang chủ
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100">
            <ShoppingCart size={16} />
            Mua hàng (2)
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100">
            <Package size={16} />
            Đơn hàng
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100">
            <User size={16} />
            Đăng nhập
          </button>
        </nav>
      </div>
    </header>
  );
}
