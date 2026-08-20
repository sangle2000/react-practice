# Yêu cầu triển khai logic — Ứng dụng MiniShop

Tài liệu này mô tả các yêu cầu chức năng (functional requirements) cho từng phần logic của
ứng dụng, tách biệt với phần UI đã có sẵn. Dùng file này làm đề bài; đối chiếu với
`shop-demo-app.jsx` sau khi làm xong để kiểm tra đáp án.

Quy ước dữ liệu:

- `user`: `{ name, email, password }`
- `product`: `{ id, name, price, icon, category }`
- `cartItem`: `product` mở rộng thêm `quantity`
- `order`: `{ id, userEmail, date, status, items: cartItem[] }`

---

## 1. Đăng ký / Đăng nhập (trang `auth`)

### 1.1 Đăng nhập

- Input: `email`, `password` người dùng nhập.
- Tìm trong danh sách `users` một bản ghi có `email` **và** `password` khớp chính xác.
- Nếu tìm thấy: lưu người dùng đó vào `currentUser`, chuyển sang trang `shop`.
- Nếu không tìm thấy: hiển thị lỗi `"Email hoặc mật khẩu không đúng."`, **không** chuyển trang.
- Không được để lộ việc email tồn tại hay không (thông báo lỗi dùng chung cho cả hai trường hợp sai email/sai mật khẩu).

### 1.2 Đăng ký

- Input: `name`, `email`, `password`.
- Validate:
  - Cả 3 trường đều bắt buộc, nếu thiếu bất kỳ trường nào → báo lỗi `"Vui lòng điền đầy đủ thông tin."`
  - Email không được trùng với email đã có trong `users` → báo lỗi `"Email này đã được đăng ký."`
- Nếu hợp lệ: thêm user mới vào danh sách `users`, tự động đăng nhập (gán `currentUser`), chuyển sang trang `shop`.
- Không cần mã hoá mật khẩu (đây là mock, không phải yêu cầu bảo mật thật).

### 1.3 Đăng xuất

- Xoá `currentUser` (đặt về `null`).
- Xoá luôn giỏ hàng hiện tại (`cartItems` về rỗng).
- Điều hướng về trang `home`.

### 1.4 Bảo vệ trang cần đăng nhập

- Khi người dùng **chưa đăng nhập** bấm vào mục "Đơn hàng": phải chuyển hướng sang trang `auth` thay vì trang `orders`.
- Khi bấm "Đặt hàng" ở giỏ hàng mà chưa đăng nhập: chuyển sang trang `auth` thay vì tạo đơn.

---

## 2. Giỏ hàng (trang `shop`)

### 2.1 Thêm sản phẩm vào giỏ

- Nếu sản phẩm **chưa có** trong giỏ → thêm mới với `quantity = 1`.
- Nếu sản phẩm **đã có** trong giỏ → chỉ tăng `quantity` thêm 1, không tạo phần tử trùng.

### 2.2 Tăng / giảm số lượng

- Nút "+": tăng `quantity` của sản phẩm đó thêm 1.
- Nút "-": giảm `quantity` đi 1.
- Nếu `quantity` giảm xuống ≤ 0 → sản phẩm phải **tự động bị xoá** khỏi giỏ (không hiển thị số lượng 0).

### 2.3 Xoá sản phẩm khỏi giỏ

- Xoá hẳn sản phẩm khỏi `cartItems` bất kể `quantity` hiện tại là bao nhiêu.

### 2.4 Tính tiền

- `subtotal` = tổng của (`price` × `quantity`) trên toàn bộ `cartItems`.
- `discount`:
  - Nếu `subtotal > 1.000.000đ` → giảm 10% trên `subtotal`.
  - Ngược lại → `discount = 0`.
- `total` = `subtotal - discount`.
- Các giá trị này phải cập nhật lại ngay khi giỏ hàng thay đổi (thêm/xoá/đổi số lượng).

---

## 3. Đặt hàng / Checkout

- Điều kiện để đặt hàng thành công: đã đăng nhập **và** giỏ hàng không rỗng.
- Khi bấm "Đặt hàng":
  1. Tạo một `order` mới:
     - `id`: mã đơn hàng duy nhất, không trùng với đơn đã có (gợi ý: dựa trên số lượng đơn hiện tại, ví dụ `DH1003`).
     - `userEmail`: email của `currentUser`.
     - `date`: ngày hiện tại (định dạng `YYYY-MM-DD`).
     - `status`: mặc định là `"Đang xử lý"`.
     - `items`: snapshot toàn bộ `cartItems` tại thời điểm đặt hàng.
  2. Thêm đơn hàng mới vào danh sách `orders` (nên thêm vào đầu danh sách để đơn mới nhất hiện lên trước).
  3. Xoá sạch giỏ hàng (`cartItems` về rỗng).
  4. Điều hướng sang trang chi tiết đơn hàng (`order-detail`) của đơn vừa tạo.

---

## 4. Danh sách đơn hàng (trang `orders`)

- Chỉ hiển thị các đơn hàng có `userEmail` **trùng** với email của `currentUser` (không được lộ đơn hàng của người dùng khác).
- Với mỗi đơn, hiển thị: mã đơn, ngày đặt, số lượng sản phẩm, trạng thái, tổng tiền (tính lại từ `items`, không lưu sẵn `total` trong `order`).
- Nếu danh sách rỗng: hiển thị trạng thái trống kèm lối tắt quay lại trang mua hàng.
- Bấm vào một đơn → lưu `id` đơn đó vào `selectedOrderId` và điều hướng sang trang `order-detail`.

---

## 5. Chi tiết đơn hàng (trang `order-detail`)

- Lấy đúng đơn hàng có `id` khớp với `selectedOrderId`.
- Tính lại `subtotal`, `discount`, `total` theo đúng công thức ở mục 2.4, dựa trên `items` của đơn đó (không dùng giỏ hàng hiện tại).
- Hiển thị thanh tiến trình trạng thái gồm 3 bước: `Đang xử lý → Đang giao → Đã giao`.
  - Bước hiện tại và các bước **trước đó** phải được đánh dấu là đã hoàn thành (dựa vào vị trí của `status` hiện tại trong mảng 3 bước).
- Nút "Quay lại" phải đưa người dùng về đúng trang danh sách đơn hàng.

---

## 6. Điều hướng chung (routing bằng state)

- Ứng dụng có 5 "trang": `home`, `auth`, `shop`, `orders`, `order-detail`.
- Chỉ dùng một state duy nhất (ví dụ `page`) để biết đang ở trang nào — không dùng react-router.
- Khi chuyển trang, nên cuộn cửa sổ lên đầu trang.
- Trạng thái đăng nhập (`currentUser`) và giỏ hàng (`cartItems`) phải được giữ nguyên khi chuyển qua lại giữa các trang (không bị mất khi đổi `page`).

---

## Gợi ý thứ tự làm bài

1. Bắt đầu với giỏ hàng (mục 2) — không phụ thuộc đăng nhập, dễ test độc lập.
2. Làm đăng ký/đăng nhập/đăng xuất (mục 1).
3. Ghép checkout (mục 3) — cần cả giỏ hàng và user đã hoàn thành.
4. Làm danh sách và chi tiết đơn hàng (mục 4, 5) — có thể test ngay với mock data ban đầu mà chưa cần checkout hoạt động.
5. Kiểm tra lại toàn bộ điều hướng và các trường hợp biên (mục 6): chưa đăng nhập, giỏ hàng rỗng, số lượng về 0, v.v.
