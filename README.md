# 1. Cài đặt Apache web server.
# 2. Cài đặt nodejs và nodered => Dùng làm backend.
# 3. Tạo csdl tuỳ ý trên mssql (sql server 2022), nhớ các thông số kết nối: ip, port, username, password, db_name, table_name.
# 4. Cài đặt thư viện trên nodered.
# 5. Tạo api back-end bằng nodered.
# 6. Tạo giao diện front-end.
# 7. Nhận xét bài làm của mình.
# Bài Làm
## 1. Cài đặt Apache Web Server
Mục tiêu: Cài đặt Apache, cấu hình để chạy một website với domain tùy chỉnh (ví dụ anhtu.com) trỏ đến thư mục code (ví dụ D:\Apache24\anhtu), và "fake" domain này trên máy tính của bạn.
Quá trình thực hiện & Xử lý lỗi:
Cài đặt: Tải Apache, giải nén vào D:\Apache24.
Cấu hình: Sửa file httpd.conf để bật vhosts và sửa file httpd-vhosts.conf để định nghĩa domain anhtu.com trỏ đến thư mục D:\Apache24\anhtu.
<img width="886" height="425" alt="image" src="https://github.com/user-attachments/assets/0ed1a963-fc46-4d5d-9a9a-b60a98b6799c" />
Fake Domain: Sửa file c:\WINDOWS\SYSTEM32\Drivers\etc\hosts để thêm dòng 127.0.0.1 anhtu.com.
<img width="821" height="419" alt="image" src="https://github.com/user-attachments/assets/77a11c09-b26f-405a-8378-a377381c1826" />

Sau đó mở CMD với quyền Administrator.
Nếu Lỗi Port 80: Chúng ta phát hiện (qua tasklist) chính một tiến trình httpd.exe cũ đang bị kẹt.
chạy httpd.exe -k stop để dừng dứt điểm, sau đó httpd.exe -k start để khởi động thành công.

## 2. Cài đặt Node.js và Node-RED
Cài đặt: Cài đặt Node.js và Node-RED vào thư mục C:\Program Files\nodejs\nodered (đã cài từ trước)
NSSM: Tải nssm.exe (từ file zip giải nén) và copy vào thư mục C:\Program Files\nodejs\nodered.
Tạo Script: Tạo file run-nodered.cmd (đã sửa lại đường dẫn PATH và red.js cho đúng với thư mục ổ C:).
<img width="768" height="108" alt="image" src="https://github.com/user-attachments/assets/2ba3b8ee-bf2d-4abf-9632-cdd5ce38ba7a" />
Tạo Service: Dùng nssm install a1-nodered ... và nssm start a1-nodered để cài đặt và chạy service thành công.

# 3. Tạo CSDL trên MS SQL
<img width="761" height="260" alt="image" src="https://github.com/user-attachments/assets/29e00534-88f0-407f-b063-1e0c37c01fc6" />

# 4. Cài đặt thư viện và Bảo mật Node-RED
Cài đặt: Cài các thư viện từ tab Install gồm: node-red-contrib-mssql-plus, node-red-node-mysql, node-red-contrib-telegrambot, node-red-contrib-moment, node-red-contrib-influxdb, node-red-contrib-duckdns, node-red-contrib-cron-plus
<img width="1565" height="615" alt="Screenshot 2025-10-26 115853" src="https://github.com/user-attachments/assets/6481c71b-68ca-4845-9808-29d99f106ddd" />

Bảo mật: Sửa file settings.js (tại C:\Program Files\nodejs\nodered\work\settings.js). Bỏ comment (dấu //) ở khối adminAuth.
mã hoá mật khẩu có thể thiết lập bằng tool: https://tms.tnut.edu.vn/pw.php
<img width="868" height="341" alt="Screenshot 2025-10-26 120532" src="https://github.com/user-attachments/assets/47cebc3f-5c31-4a8f-8329-e879e8d83efc" />
Cập nhật và dán chuỗi hash vào settings.js.
Khởi động lại: Chạy nssm restart a1-nodered
<img width="1103" height="347" alt="Screenshot 2025-10-26 120624" src="https://github.com/user-attachments/assets/cc2c2edf-c58f-4bad-baab-0e0ffb2bbf8d" />
Chạy thử
<img width="1484" height="760" alt="Screenshot 2025-10-26 120646" src="https://github.com/user-attachments/assets/45cbd7ab-1b15-4f51-9735-034ed7b9c5bd" />

# 5. Tạo API Back-end bằng Node-RED
Tại giao diện Nodered - Flow1: Thực hiện kéo thả các node như sau: http in, http response, MSSQL, function
<img width="1771" height="628" alt="Screenshot 2025-10-26 123238" src="https://github.com/user-attachments/assets/89537a98-0b54-4d9e-9c0a-ffbf04b03593" />

Tạo một API tại GET /timkiem nhận tham số (ví dụ ?q=thị) để truy vấn bảng Thongtin và trả về kết quả JSON.
<img width="1413" height="515" alt="Screenshot 2025-10-26 121058" src="https://github.com/user-attachments/assets/56a42cbd-38c5-4aa2-832c-109ccddc5f7c" />

Function:
<img width="807" height="684" alt="image" src="https://github.com/user-attachments/assets/08ac5e4e-0e5a-4b83-9c32-134d6a9fe197" />

MSQL:
<img width="626" height="809" alt="image" src="https://github.com/user-attachments/assets/e54800be-b862-4402-8fb5-cd6d81b2af95" />

http response:
<img width="690" height="663" alt="image" src="https://github.com/user-attachments/assets/c900b3ba-c9a4-4b47-9b81-84e6fee679b3" />


# 6.  Tạo giao diện front-end.
Tạo 3 file trong thư mục D:\Apache24\anhtu
index/html + anhtu.js + anhtu.css
### Kết quả kiểm thử:
<img width="1567" height="660" alt="Screenshot 2025-10-26 143321" src="https://github.com/user-attachments/assets/f6de6c7f-f495-4a03-8842-d70a69f0a87b" />

# 2.7. Nhận xét bài làm của mình:
 1. Về quá trình cài đặt phần mềm và thư viện
Em đã hiểu rõ quá trình cài đặt và cấu hình một môi trường full-stack phức tạp từ con số 0.
Apache (Web Server): Không chỉ là cài đặt, Em đã hiểu cách cấu hình httpd.conf và httpd-vhosts.conf để tạo một virtual host (ví dụ: anhtu.com). Em cũng hiểu tầm quan trọng của file hosts trong việc "fake" DNS nội bộ. Quá trình xử lý lỗi trùng cổng 80 (lỗi OS 10048) và lỗi quyền admin (OS 5) giúp Em hiểu sâu về cách các dịch vụ (services) hoạt động trên Windows.
Node.js & Node-RED: Em đã hiểu cách cài đặt Node.js vào một thư mục tùy chỉnh và dùng npm --prefix để cài đặt Node-RED vào một thư mục con cụ thể, thay vì cài đặt toàn cục (global) một cách bừa bãi.
NSSM (Service Manager): Đây là một kiến thức mới và rất hay. Em đã hiểu cách dùng nssm để biến một script (run-nodered.cmd) thành một dịch vụ Windows (a1-nodered) chạy nền, giúp backend luôn hoạt động.
Thư viện Node-RED: Em đã hiểu cách dùng "Manage palette" để cài đặt, và quan trọng hơn, Em nhận ra rằng service cần phải khởi động lại (nssm restart) thì các node mới (như mssql-plus) mới thực sự được tải vào thanh công cụ, chỉ nhấn "Deploy" là không đủ.

2. Về cách sử dụng Node-RED để tạo API Back-end
Đây là phần Em học được nhiều nhất qua việc xử lý lỗi.
Luồng (Flow) cơ bản: Em đã hiểu cách kéo thả các node http in, function, http response và debug để tạo một luồng API hoàn chỉnh.
Node function: Em hiểu đây là "bộ não" của API, nơi Em có thể viết code JavaScript (như msg.topic = ..., msg.payload = ..., msg.mode = ...) để xử lý logic, chuẩn bị câu lệnh SQL và tham số.
Node MSSQL (Phần quan trọng nhất): Ban đầu Em rất bối rối. Qua quá trình gỡ lỗi, Em đã hiểu sâu về cách hoạt động của node MSSQL (màu xanh):
Chế độ execute của nó chỉ dành cho Stored Procedure, đó là lý do nó báo lỗi Could not find stored procedure... khi Em đưa câu SELECT.
Chế độ query của nó không hỗ trợ tham số an toàn (parameters) từ msg.payload, đó là lý do nó báo lỗi Must declare... @ten.
Giải pháp cuối cùng: Em hiểu rằng với node này, cách duy nhất là nối chuỗi SQL trực tiếp (... LIKE '%" + tuKhoa + "%') trong node function và gửi nó sang.
Gỡ lỗi (Debugging): Em đã hiểu tầm quan trọng của việc nối node debug vào cổng ra lỗi (cổng 2) của node MSSQL. Việc này đã giúp chúng ta tìm ra các lỗi SQL "âm thầm" (như lỗi @ten, lỗi execute) thay vì để trình duyệt "load mãi".
Lỗi Tiếng Việt (Unicode): Em đã học được một bài học quan trọng là khi truy vấn LIKE chuỗi Tiếng Việt có dấu trong SQL Server, bắt buộc phải thêm tiền tố N (ví dụ: ... LIKE N'%thị%').

3. Về cách Front-end tương tác với Back-end
Em đã hiểu rõ sự tách biệt vai trò giữa Client (Frontend) và Server (Backend):
Front-end (anhtu.com trên Apache): Chạy ở cổng 80, chỉ có nhiệm vụ phục vụ các file tĩnh (HTML, CSS, JS) để hiển thị giao diện người dùng.
Back-end (localhost:1880 trên Node-RED): Chạy ở cổng 1880, không có giao diện, chỉ có nhiệm vụ cung cấp dữ liệu (API /timkiem).
Tương tác (Sử dụng fetch): File anhtu.js (chạy trên trình duyệt của client) đã thực hiện một cuộc gọi HTTP (dùng fetch()) đến một địa chỉ hoàn toàn khác (http://localhost:1880/timkiem). Nó gửi đi từ khoá (?q=...) và nhận về một chuỗi JSON.
Hiển thị: Sau khi nhận JSON, JavaScript của front-end (chứ không phải server) làm nhiệm vụ cuối cùng là "vẽ" dữ liệu đó lên màn hình (bằng cách JSON.stringify và gán vào <pre>).
