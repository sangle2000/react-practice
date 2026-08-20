import { CheckCircle2, Clock, Truck } from "lucide-react";

// ---------- MOCK DATA ----------
export const PRODUCTS = [
  { id: 1, name: "Bàn phím cơ Akko", price: 890000, icon: "⌨️", category: "Phụ kiện" },
  { id: 2, name: "Chuột không dây Logitech", price: 450000, icon: "🖱️", category: "Phụ kiện" },
  { id: 3, name: "Tai nghe chống ồn", price: 1250000, icon: "🎧", category: "Âm thanh" },
  { id: 4, name: "Đèn bàn LED", price: 320000, icon: "💡", category: "Nội thất" },
  { id: 5, name: "Giá đỡ laptop", price: 280000, icon: "💻", category: "Nội thất" },
  { id: 6, name: "Webcam Full HD", price: 690000, icon: "📷", category: "Phụ kiện" },
];

export const INITIAL_USERS = [
  { name: "Nguyễn Văn A", email: "demo@shop.vn", password: "123456" },
];

export const INITIAL_ORDERS = [
  {
    id: "DH1001",
    userEmail: "demo@shop.vn",
    date: "2026-08-10",
    status: "Đã giao",
    items: [
      { ...PRODUCTS[0], quantity: 1 },
      { ...PRODUCTS[1], quantity: 2 },
    ],
  },
  {
    id: "DH1002",
    userEmail: "demo@shop.vn",
    date: "2026-08-16",
    status: "Đang giao",
    items: [{ ...PRODUCTS[2], quantity: 1 }],
  },
];

export const formatVND = (v) => v.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

export const STATUS_STYLE = {
  "Đang xử lý": { color: "text-amber-600 bg-amber-50", icon: Clock },
  "Đang giao": { color: "text-blue-600 bg-blue-50", icon: Truck },
  "Đã giao": { color: "text-emerald-600 bg-emerald-50", icon: CheckCircle2 },
};
