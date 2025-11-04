// Chờ cho toàn bộ nội dung trang web được tải xong
document.addEventListener('DOMContentLoaded', () => {

    // Lấy các phần tử (elements) từ file HTML
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const resultJson = document.getElementById('result-json');

    // Thêm sự kiện "submit" cho cái form
    searchForm.addEventListener('submit', (event) => {
        // Ngăn form gửi theo cách truyền thống (làm tải lại trang)
        event.preventDefault(); 

        // Lấy từ khoá người dùng gõ vào
        const tuKhoa = searchInput.value;

        // Hiển thị trạng thái "Đang tải..."
        resultJson.textContent = 'Đang tải dữ liệu...';

        // Tạo URL để gọi API Node-RED
        // URL này phải encode từ khoá để xử lý dấu và ký tự đặc biệt
        const apiUrl = `http://localhost:1880/timkiem?q=${encodeURIComponent(tuKhoa)}`;

        // Dùng hàm fetch() để gọi API (GET)
        fetch(apiUrl)
            .then(response => {
                // Kiểm tra xem API có trả về lỗi (như lỗi 404, 500)
                if (!response.ok) {
                    throw new Error('Mạng hoặc API gặp sự cố!');
                }
                // Chuyển đổi dữ liệu trả về thành JSON
                return response.json();
            })
            .then(data => {
                // Đã có dữ liệu JSON!
                // Hiển thị nó một cách "đẹp" (định dạng JSON)
                // JSON.stringify(data, null, 2) sẽ format JSON với 2 dấu cách
                if (data.length === 0) {
                    resultJson.textContent = 'Không tìm thấy kết quả nào.';
                } else {
                    resultJson.textContent = JSON.stringify(data, null, 2);
                }
            })
            .catch(error => {
                // Xử lý nếu fetch() hoặc API thất bại
                console.error('Lỗi khi gọi API:', error);
                resultJson.textContent = `Không thể tải dữ liệu. Lỗi: ${error.message}`;
            });
    });

});