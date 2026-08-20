import { ArrowLeft, Clock } from "lucide-react";
import { STATUS_STYLE, formatVND } from "../data/mockData";

// ================= CHI TIẾT ĐƠN HÀNG =================
export function OrderDetailPage({ order, goTo }) {
  const subtotal = order.items.reduce((s, i) => s + i.price * i.quantity, 0);
  const discount = subtotal > 1000000 ? subtotal * 0.1 : 0;
  const total = subtotal - discount;
  const StatusIcon = STATUS_STYLE[order.status]?.icon || Clock;

  const steps = ["Đang xử lý", "Đang giao", "Đã giao"];
  const currentStepIndex = steps.indexOf(order.status);

  return (
    <div className="bg-white p-6 border border-slate-200 rounded-xl">
      <button onClick={() => goTo("orders")} className="flex items-center gap-1.5 mb-5 text-slate-500 hover:text-slate-800 text-sm">
        <ArrowLeft size={15} /> Quay lại danh sách đơn hàng
      </button>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-bold text-slate-800 text-xl">Đơn hàng {order.id}</h2>
          <p className="text-slate-400 text-sm">Đặt ngày {order.date}</p>
        </div>
        <span className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full ${STATUS_STYLE[order.status]?.color}`}>
          <StatusIcon size={14} /> {order.status}
        </span>
      </div>

      {/* Thanh tiến trình trạng thái */}
      <div className="flex items-center mb-8">
        {steps.map((step, idx) => (
          <div key={step} className="flex flex-1 last:flex-none items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                  idx <= currentStepIndex ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-400"
                }`}
              >
                {idx + 1}
              </div>
              <span className="mt-1.5 text-slate-500 text-xs whitespace-nowrap">{step}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`h-0.5 flex-1 mx-2 ${idx < currentStepIndex ? "bg-slate-800" : "bg-slate-100"}`} />
            )}
          </div>
        ))}
      </div>

      <h3 className="mb-3 font-medium text-slate-700">Sản phẩm</h3>
      <div className="space-y-3 mb-6">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between items-center pb-3 border-slate-100 last:border-0 border-b">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="font-medium text-slate-800 text-sm">{item.name}</p>
                <p className="text-slate-400 text-xs">Số lượng: {item.quantity}</p>
              </div>
            </div>
            <span className="font-medium text-slate-700 text-sm">{formatVND(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="space-y-1.5 bg-slate-50 ml-auto p-4 rounded-lg max-w-xs text-sm">
        <div className="flex justify-between text-slate-500">
          <span>Tạm tính</span>
          <span>{formatVND(subtotal)}</span>
        </div>
        <div className="flex justify-between text-slate-500">
          <span>Giảm giá</span>
          <span className="text-emerald-600">{discount > 0 ? `- ${formatVND(discount)}` : formatVND(0)}</span>
        </div>
        <div className="flex justify-between pt-1.5 border-slate-200 border-t font-semibold text-slate-800">
          <span>Tổng cộng</span>
          <span>{formatVND(total)}</span>
        </div>
      </div>
    </div>
  );
}
