import { PRODUCTS } from "../data/mockData";

// ================= TRANG CHỦ =================
export function HomePage({ goTo }) {
  return (
    <div>
      <div className="bg-gradient-to-br from-slate-800 to-slate-700 mb-8 p-10 rounded-2xl text-white">
        <h1 className="mb-2 font-bold text-3xl">Đồ dùng văn phòng cho dân công nghệ</h1>
        <p className="mb-6 max-w-md text-slate-300">
          Bàn phím, chuột, tai nghe và phụ kiện được tuyển chọn — giảm 10% cho đơn từ 1.000.000đ.
        </p>
        <button
          onClick={() => goTo("shop")}
          className="bg-white hover:bg-slate-100 px-5 py-2.5 rounded-lg font-semibold text-slate-800 transition-colors"
        >
          Mua sắm ngay
        </button>
      </div>

      <h2 className="mb-4 font-semibold text-slate-700">Danh mục nổi bật</h2>
      <div className="gap-4 grid grid-cols-2 sm:grid-cols-3">
        {["Phụ kiện", "Âm thanh", "Nội thất"].map((cat) => (
          <button
            key={cat}
            onClick={() => goTo("shop")}
            className="bg-white p-5 border border-slate-200 hover:border-slate-400 rounded-xl text-left transition-colors"
          >
            <p className="font-medium text-slate-800">{cat}</p>
            <p className="mt-1 text-slate-400 text-sm">
              {PRODUCTS.filter((p) => p.category === cat).length} sản phẩm
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
