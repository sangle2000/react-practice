import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { PRODUCTS, formatVND } from "../data/mockData";

const CART_ITEMS = [
  { ...PRODUCTS[0], quantity: 1 },
  { ...PRODUCTS[2], quantity: 1 },
];

// ================= TRANG MUA HÀNG =================
export function ShopPage() {
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
              <button className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-white text-sm">
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

        <div className="space-y-3 mb-4">
          {CART_ITEMS.map((item) => (
            <div key={item.id} className="flex justify-between items-center text-sm">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-700 truncate">{item.name}</p>
                <p className="text-slate-400">{formatVND(item.price)}</p>
              </div>
              <div className="flex items-center gap-1.5 ml-2">
                <button className="flex justify-center items-center hover:bg-slate-100 border border-slate-200 rounded w-6 h-6">
                  <Minus size={12} />
                </button>
                <span className="w-5 text-center">{item.quantity}</span>
                <button className="flex justify-center items-center hover:bg-slate-100 border border-slate-200 rounded w-6 h-6">
                  <Plus size={12} />
                </button>
                <button className="flex justify-center items-center hover:bg-red-50 ml-1 rounded w-6 h-6 text-red-400">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-1.5 pt-3 border-slate-100 border-t text-sm">
          <div className="flex justify-between text-slate-500">
            <span>Tạm tính</span>
            <span>{formatVND(2140000)}</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Giảm giá</span>
            <span className="text-emerald-600">- {formatVND(214000)}</span>
          </div>
          <div className="flex justify-between pt-1.5 border-slate-100 border-t font-semibold text-slate-800 text-base">
            <span>Tổng cộng</span>
            <span>{formatVND(1926000)}</span>
          </div>
        </div>

        <button className="bg-slate-800 hover:bg-slate-700 mt-4 py-2.5 rounded-lg w-full font-medium text-white transition-colors">
          Đặt hàng
        </button>
      </div>
    </div>
  );
}
