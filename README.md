# Portfolio Nguyễn Huỳnh Minh Duy

Website portfolio song ngữ Anh–Việt, dành cho nhà tuyển dụng trong lĩnh vực marketing và giáo dục đại học. Nội dung được biên soạn từ hai CV cập nhật do chủ hồ sơ cung cấp.

## Xem trước trên máy tính

Mở `index.html` bằng Chrome, Edge, Firefox hoặc Safari. Giữ nguyên các tệp `styles.css`, `app.js`, `translations.js` và thư mục `assets` cùng với `index.html`. Website hoạt động khi mở trực tiếp trên máy; không cần cài ứng dụng hay chạy lệnh.

Nếu dùng bản xuất một tệp `Portfolio-Minh-Duy.html`, chỉ cần mở chính tệp đó. Font, ảnh, nội dung và CV đã được nhúng trong tệp xem trước này. Bản gồm nhiều tệp trong repository là bản nên dùng để đăng website vì trình duyệt có thể tải từng tài nguyên khi cần.

## Đưa website lên GitHub Pages

Tài khoản GitHub đã xác định: **Duynguyen140800**. Repository portfolio hiện có: **Duynguyen140800/nguyenhuynhminhduy.github.io**.

1. Mở repository `nguyenhuynhminhduy.github.io` trong tài khoản của bạn. Vào **Settings**, sau đó chọn **Pages** trong thanh bên trái.
2. Trong **Build and deployment**, đặt **Source** thành **Deploy from a branch**.
3. Chọn nhánh **main** và thư mục **/(root)**. Bấm **Save**.
4. Chờ quy trình triển khai hoàn tất. GitHub cho biết thay đổi có thể cần tới 10 phút để được công bố. Quay lại **Settings → Pages** và mở địa chỉ ở dòng **Your site is live at**. Địa chỉ hiển thị tại đây là địa chỉ chính thức cần dùng.
5. Kiểm tra trên máy tính và điện thoại: chọn EN/VI, mở từng mục dự án, tải cả hai CV, thử email và liên kết LinkedIn/ResearchGate.

Repository hiện mang tên khác với tên tài khoản, nên đây là một **project site**. Địa chỉ dự kiến có đường dẫn `/nguyenhuynhminhduy.github.io/` sau tên miền `Duynguyen140800.github.io`. Không cần đổi tên repository để sử dụng bản này. Website sử dụng đường dẫn tương đối và đã được kiểm tra cho kiểu đường dẫn này.

Nếu muốn tạo một repository khác từ bản ZIP: giải nén trước, tải **các tệp bên trong** thư mục website lên repository. `index.html` phải ở cấp ngoài cùng, bên cạnh `assets`, `styles.css`, `app.js` và `translations.js`. Không chỉ tải tệp ZIP lên và không đặt toàn bộ website trong một thư mục con rồi chọn `/(root)`.

Tệp `.nojekyll` đã có sẵn để phục vụ website trực tiếp. Không cần chọn Jekyll theme, cài package hoặc chạy bước build. Khi tải tệp bằng giao diện GitHub trên Windows, nếu không thấy `.nojekyll`, tạo một tệp trống tên `.nojekyll` tại thư mục gốc bằng **Add file → Create new file**.

## Cập nhật nội dung

| Muốn thay đổi | Tệp cần chỉnh |
| --- | --- |
| Nội dung tiếng Anh và tiếng Việt | `translations.js`, các mục tương ứng trong `en` và `vi` |
| Nội dung tiếng Anh hiển thị khi JavaScript bị tắt | `index.html`, tại phần có `data-i18n` tương ứng |
| Thêm hoặc đổi cấu trúc mục | `index.html` |
| Màu, font, khoảng cách và bố cục | `styles.css` |
| Thời gian hiện dần khi cuộn | `.reveal` trong `styles.css` |
| Mức zoom ảnh khi rê chuột | `.image-zoom:hover img` trong `styles.css`, hiện là `scale(1.035)` |
| Ảnh chân dung và ảnh hoạt động | `assets/images` |
| CV tải về | Hai tệp PDF trong `assets/documents`; giữ nguyên tên tệp để các nút tải vẫn hoạt động |
| Email và các liên kết cá nhân | `index.html`; email sao chép cũng cần đổi trong `app.js` |

Sau khi cập nhật `translations.js`, giữ nội dung dự phòng tương ứng trong `index.html` đồng nhất. Commit thay đổi lên nhánh `main`; GitHub Pages sẽ triển khai lại theo cấu hình đã chọn.

## Thiết kế và tương tác

Font Manrope hỗ trợ tiếng Việt, được lưu cùng website. Bảng màu gồm navy `#102c42`, teal `#08766f`, nền trắng và nền xám nhạt `#f3f6f8`. Icon dùng Lucide với một độ dày nét thống nhất.

Nội dung hiện dần một lần khi cuộn, với thời gian 0,65 giây. Ảnh zoom 3,5% khi rê chuột trên thiết bị có chuột. Khi thiết bị bật **Reduce motion**, website tắt các hiệu ứng này. Không có carousel tự chạy, nhạc tự phát hoặc hiệu ứng chạy liên tục.

Menu hỗ trợ bàn phím và phím Escape. Có liên kết bỏ qua điều hướng, mô tả ảnh, focus rõ ràng và trạng thái nút chuyển ngôn ngữ. Khi JavaScript bị tắt, toàn bộ nội dung tiếng Anh, liên kết, các mục mở rộng và CV vẫn sử dụng được.

Hai CV PDF là bản dùng cho website công khai, được chuyển từ CV người dùng gửi. Địa chỉ nhà chi tiết, ngày sinh và thông tin của người tham chiếu được lược khỏi bản công khai. Các tệp DOCX gốc không bị thay đổi. Nội dung còn lại và tên người dùng được giữ nguyên.

Ảnh được chọn từ ảnh người dùng cung cấp; không tạo lại hoặc thay đổi khuôn mặt. Hai tên bài nghiên cứu giữ nguyên tên công bố tiếng Anh ở cả hai ngôn ngữ. Thông tin bài nghiên cứu và thành tích được trình bày theo CV; không tự thêm số liệu kết quả, kỹ năng ở mức phần trăm hoặc chứng thực của bên thứ ba.

Tài nguyên dùng đường dẫn tương đối, phù hợp cả user site và project site. Website không có CDN hoặc dịch vụ máy chủ cần cài thêm.

## Nguồn hướng dẫn và giấy phép

- [GitHub Docs — Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub Docs — Quickstart for GitHub Pages](https://docs.github.com/en/pages/quickstart)
- [GitHub Docs — Troubleshooting 404 errors](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites)
- Font Manrope: SIL Open Font License, xem `assets/fonts/OFL.txt`.
- Icon Lucide: ISC License, xem `assets/ICONS-LICENSE.txt`.

Ảnh, CV và nội dung hồ sơ cá nhân thuộc chủ hồ sơ. Các giấy phép của font và icon không cấp quyền tái sử dụng ảnh hoặc CV.
