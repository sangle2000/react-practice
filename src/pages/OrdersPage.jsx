import { Clock } from "lucide-react";
import { INITIAL_ORDERS, STATUS_STYLE, formatVND } from "../data/mockData";

// ================= DANH SÁCH ĐƠN HÀNG =================
export function OrdersPage() {
  return (
    <div className="bg-white p-5 border border-slate-200 rounded-xl">
      <h2 className="mb-4 font-semibold text-slate-700">Đơn hàng của tôi</h2>
      <div className="space-y-2">
        {INITIAL_ORDERS.map((order) => {
          const total = order.items.reduce((s, i) => s + i.price * i.quantity, 0);
          const StatusIcon = STATUS_STYLE[order.status]?.icon || Clock;
          return (
            <button
              key={order.id}
              className="flex justify-between items-center p-4 border border-slate-100 hover:border-slate-300 rounded-lg w-full text-left transition-colors"
            >
              <div>
                <p className="font-medium text-slate-800">{order.id}</p>
                <p className="text-slate-400 text-sm">{order.date} · {order.items.length} sản phẩm</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLE[order.status]?.color}`}>
                  <StatusIcon size={12} /> {order.status}
                </span>
                <span className="font-semibold text-slate-800 text-sm">{formatVND(total)}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
