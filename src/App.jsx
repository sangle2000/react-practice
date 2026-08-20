import { useState } from "react";
import { NavBar } from "./components/NavBar";
import { HomePage } from "./pages/HomePage";
import { AuthPage } from "./pages/AuthPage";
import { ShopPage } from "./pages/ShopPage";
import { OrdersPage } from "./pages/OrdersPage";
import { OrderDetailPage } from "./pages/OrderDetailPage";
import { INITIAL_USERS, INITIAL_ORDERS } from "./data/mockData";

export default function App() {
  const [page, setPage] = useState("home");
  const [users, setUsers] = useState(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState(null);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [cartItems, setCartItems] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const goTo = (p) => {
    setPage(p);
    window?.scrollTo?.(0, 0);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCartItems([]);
    goTo("home");
  };

  const requireAuth = (targetPage) => {
    if (!currentUser) {
      goTo("auth");
    } else {
      goTo(targetPage);
    }
  };

  // ---------- Giỏ hàng ----------
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const cartSubtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartDiscount = cartSubtotal > 1000000 ? cartSubtotal * 0.1 : 0;
  const cartTotal = cartSubtotal - cartDiscount;

  const handleCheckout = () => {
    if (!currentUser) {
      goTo("auth");
      return;
    }
    if (cartItems.length === 0) return;
    const newOrder = {
      id: `DH${1000 + orders.length + 1}`,
      userEmail: currentUser.email,
      date: new Date().toISOString().slice(0, 10),
      status: "Đang xử lý",
      items: cartItems,
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    setSelectedOrderId(newOrder.id);
    goTo("order-detail");
  };

  const myOrders = currentUser ? orders.filter((o) => o.userEmail === currentUser.email) : [];
  const selectedOrder = orders.find((o) => o.id === selectedOrderId);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      <NavBar
        page={page}
        goTo={goTo}
        requireAuth={requireAuth}
        currentUser={currentUser}
        handleLogout={handleLogout}
        cartCount={cartItems.reduce((s, i) => s + i.quantity, 0)}
      />

      <main className="mx-auto px-4 py-8 max-w-5xl">
        {page === "home" && <HomePage goTo={goTo} />}

        {page === "auth" && (
          <AuthPage
            users={users}
            setUsers={setUsers}
            setCurrentUser={setCurrentUser}
            goTo={goTo}
          />
        )}

        {page === "shop" && (
          <ShopPage
            cartItems={cartItems}
            onAdd={handleAddToCart}
            onUpdateQty={handleUpdateQuantity}
            onRemove={handleRemoveItem}
            subtotal={cartSubtotal}
            discount={cartDiscount}
            total={cartTotal}
            onCheckout={handleCheckout}
            currentUser={currentUser}
          />
        )}

        {page === "orders" && (
          <OrdersPage
            orders={myOrders}
            onSelect={(id) => {
              setSelectedOrderId(id);
              goTo("order-detail");
            }}
            goTo={goTo}
          />
        )}

        {page === "order-detail" && selectedOrder && (
          <OrderDetailPage order={selectedOrder} goTo={goTo} />
        )}
      </main>
    </div>
  );
}
