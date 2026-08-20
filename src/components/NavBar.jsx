import { Home, ShoppingCart, User, Package, LogOut } from "lucide-react";

// ================= NAVBAR =================
export function NavBar({ page, goTo, requireAuth, currentUser, handleLogout, cartCount }) {
  const NavItem = ({ target, icon: Icon, label, onClick }) => (
    <button
      onClick={onClick || (() => goTo(target))}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        page === target ? "bg-slate-800 text-white" : "text-slate-600 hover:bg-slate-100"
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );

  return (
    <header className="top-0 z-10 sticky bg-white border-slate-200 border-b">
      <div className="flex justify-between items-center mx-auto px-4 max-w-5xl h-16">
        <button onClick={() => goTo("home")} className="font-bold text-slate-800 text-lg">
          🛍️ MiniShop
        </button>
        <nav className="flex items-center gap-1">
          <NavItem target="home" icon={Home} label="Trang chủ" />
          <NavItem target="shop" icon={ShoppingCart} label={`Mua hàng${cartCount ? ` (${cartCount})` : ""}`} />
          <NavItem
            target="orders"
            icon={Package}
            label="Đơn hàng"
            onClick={() => requireAuth("orders")}
          />
          {currentUser ? (
            <div className="flex items-center gap-2 ml-2 pl-2 border-slate-200 border-l">
              <span className="flex items-center gap-1 text-slate-500 text-sm">
                <User size={14} /> {currentUser.name}
              </span>
              <button
                onClick={handleLogout}
                className="hover:bg-red-50 p-2 rounded-lg text-slate-400 hover:text-red-500"
                title="Đăng xuất"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <NavItem target="auth" icon={User} label="Đăng nhập" />
          )}
        </nav>
      </div>
    </header>
  );
}
