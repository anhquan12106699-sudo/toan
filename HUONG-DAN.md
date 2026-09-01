# Hướng dẫn đăng bài tự động (không cần biết code)

Sau khi làm xong phần thiết lập 1 lần dưới đây, mỗi lần đăng bài bạn chỉ cần:
1. Vào địa chỉ `tenmiencuaban.netlify.app/admin/`
2. Đăng nhập bằng GitHub
3. Bấm **New**, viết tiêu đề, nội dung, upload ảnh
4. Bấm **Publish** → trang web tự cập nhật sau khoảng 1 phút.

---

## PHẦN 1 – Thiết lập ban đầu (làm 1 lần)

### Bước 1: Tạo tài khoản GitHub (nếu chưa có)
- Vào https://github.com → Sign up.

### Bước 2: Tạo 1 kho chứa (repository) chứa toàn bộ file trang web
- Trên GitHub, bấm **New repository**, đặt tên (vd `toan-kinh-te-web`), để **Public**.
- Upload toàn bộ các file/thư mục trong gói này lên đúng cấu trúc:
  ```
  index.html
  content/thong-bao.json
  content/tin-nganh.json
  admin/index.html
  admin/config.yml
  images/uploads/   (thư mục trống, để chứa ảnh sau này)
  ```

### Bước 3: Sửa file `admin/config.yml`
- Mở file này trên GitHub, sửa dòng:
  ```yaml
  repo: TEN-USER/TEN-REPO
  ```
  thành đúng tên tài khoản + tên kho của bạn, ví dụ:
  ```yaml
  repo: nguyenvana/toan-kinh-te-web
  ```

### Bước 4: Đưa trang lên Netlify (miễn phí)
- Vào https://app.netlify.com → **Add new site → Import an existing project**.
- Chọn **GitHub**, cho phép truy cập, chọn đúng kho vừa tạo.
- Để mặc định (không cần build command) → **Deploy**.
- Sau khi xong, Netlify cho bạn 1 địa chỉ dạng `ten-ngau-nhien.netlify.app` (có thể đổi tên trong Site settings).

### Bước 5: Bật đăng nhập cho trang quản trị
- Trong Netlify, vào site vừa tạo → **Site settings → General → Change site name** để đặt tên dễ nhớ.
- Vẫn trong site đó, vào mục **Identity → Enable Identity** là ĐỦ nếu bạn dùng backend GitHub qua Netlify OAuth như file `config.yml` mẫu (Netlify sẽ tự xử lý đăng nhập GitHub cho trang `/admin/`, không cần tạo OAuth App thủ công).
- Truy cập `https://ten-site-cua-ban.netlify.app/admin/` → bấm đăng nhập bằng GitHub → xong.

---

## PHẦN 2 – Đăng bài hằng ngày
1. Vào `https://ten-site-cua-ban.netlify.app/admin/`
2. Chọn mục **Thông báo** hoặc **Tin tức ngành** ở cột trái.
3. Bấm vào danh sách, bấm **+ Add "Danh sách"** để thêm bài mới (kéo lên đầu để nó hiện trước).
4. Điền tiêu đề, nội dung, ngày tháng, chọn ảnh minh hoạ (nếu có).
5. Bấm **Publish** ở góc trên bên phải → xong.

Trang chủ (mục "Tin nổi bật" & "Tin mới nhất") và trang "Tin tức" sẽ **tự động** lấy đúng những bài mới nhất từ 2 danh sách này, không cần đụng vào code nữa.

---

## Ghi chú
- Nếu ảnh không hiện, kiểm tra lại bạn đã chọn đúng ảnh trong ô "Ảnh" khi soạn bài.
- Muốn xoá 1 bài: vào admin, mở bài đó, bấm biểu tượng thùng rác, Publish lại.
- Muốn thêm mục khác (vd "Hội thảo"), báo lại để mình thêm collection tương tự trong `config.yml`.
