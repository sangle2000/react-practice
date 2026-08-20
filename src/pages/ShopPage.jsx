import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { PRODUCTS, formatVND } from "../data/mockData";

// ================= TRANG MUA HÀNG =================
export function ShopPage({ cartItems, onAdd, onUpdateQty, onRemove, subtotal, discount, total, onCheckout, currentUser }) {
  return (
    <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
      <div className="lg:col-span-2 bg-white p-5 border border-slate-200 rounded-xl">
        <h2 className="mb-4 font-semibold text-slate-700">Sản phẩm</h2>
        <div className="space-y-3">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="flex justify-between items-center p-3 border border-slate-100 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{product.icon}</span>
                <div>
                  <p className="font-medium text-slate-800">{product.name}</p>
                  <p className="text-slate-500 text-sm">{formatVND(product.price)}</p>
                </div>
              </div>
              <button
                onClick={() => onAdd(product)}
                className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-white text-sm"
              >
                <Plus size={14} /> Thêm
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-5 border border-slate-200 rounded-xl h-fit">
        <h2 className="flex items-center gap-2 mb-4 font-semibold text-slate-700">
          <ShoppingCart size={18} /> Giỏ hàng
        </h2>

        {cartItems.length === 0 ? (
          <p className="py-8 text-slate-400 text-sm text-center">Giỏ hàng đang trống</p>
        ) : (
          <div className="space-y-3 mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-700 truncate">{item.name}</p>
                  <p className="text-slate-400">{formatVND(item.price)}</p>
                </div>
                <div className="flex items-center gap-1.5 ml-2">
                  <button onClick={() => onUpdateQty(item.id, -1)} className="flex justify-center items-center hover:bg-slate-100 border border-slate-200 rounded w-6 h-6">
                    <Minus size={12} />
                  </button>
                  <span className="w-5 text-center">{item.quantity}</span>
                  <button onClick={() => onUpdateQty(item.id, 1)} className="flex justify-center items-center hover:bg-slate-100 border border-slate-200 rounded w-6 h-6">
                    <Plus size={12} />
                  </button>
                  <button onClick={() => onRemove(item.id)} className="flex justify-center items-center hover:bg-red-50 ml-1 rounded w-6 h-6 text-red-400">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-1.5 pt-3 border-slate-100 border-t text-sm">
          <div className="flex justify-between text-slate-500">
            <span>Tạm tính</span>
            <span>{formatVND(subtotal)}</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Giảm giá</span>
            <span className="text-emerald-600">{discount > 0 ? `- ${formatVND(discount)}` : formatVND(0)}</span>
          </div>
          <div className="flex justify-between pt-1.5 border-slate-100 border-t font-semibold text-slate-800 text-base">
            <span>Tổng cộng</span>
            <span>{formatVND(total)}</span>
          </div>
        </div>

        <button
          onClick={onCheckout}
          disabled={cartItems.length === 0}
          className="bg-slate-800 hover:bg-slate-700 disabled:opacity-40 mt-4 py-2.5 rounded-lg w-full font-medium text-white transition-colors disabled:cursor-not-allowed"
        >
          {currentUser ? "Đặt hàng" : "Đăng nhập để đặt hàng"}
        </button>
      </div>
    </div>
  );
}
