# Kỷ Yếu Số - Tiếp Sức Mùa Thi 2026

Ứng dụng web được phát triển nhằm lưu giữ những khoảnh khắc ý nghĩa của chiến dịch **Tiếp Sức Mùa Thi 2026**, đồng thời hỗ trợ quản lý thông tin tình nguyện viên, hình ảnh hoạt động và sổ lưu bút trực tuyến.

---

## Demo

Frontend: http://localhost:5173

Backend API: http://localhost:8080

Swagger UI: http://localhost:8080/swagger-ui/index.html (Nếu có cài đặt)

---

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- JavaScript (ES6+)

### Backend
- Java 17+ (hoặc 21)
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- Maven

### Database
- MySQL

### Cloud Services & Storage
- Cloudinary (Image Storage)
- Local File Upload (`/uploads`)

### Version Control
- Git
- GitHub

---

## Features

### Authentication & Authorization
- JWT Login
- Phân quyền (Role-based Authorization): `ADMIN`, `USER`, `GUEST`.
- Hỗ trợ Guest Session (Cấp Token tạm thời cho Khách vãng lai).

### Admin Dashboard (CMS)
- Quản lý và chỉnh sửa trực tiếp nội dung trang web (Inline Editing).
- Cập nhật thông điệp, video trang chủ, top 3 khoảnh khắc truyền cảm hứng.
- Sửa/xóa thông tin thành viên và hình ảnh.

### Volunteer Management (Hồ Sơ Thành Viên)
- Xem danh sách thành viên (Bức Tường Vinh Danh).
- Tìm kiếm thành viên (không phân biệt hoa/thường).
- Lọc thành viên thông minh theo ban (Truyền thông, Hậu cần, Điều phối...).
- Trang chi tiết hồ sơ cá nhân của từng thành viên.

### Memory Gallery (Khoảnh Khắc)
- Quản lý thư viện ảnh tĩnh và động (Masonry Grid, Polaroid).
- Upload ảnh trực tiếp hoặc sử dụng link Cloudinary/Imgur.

### Digital Guestbook (Sổ Lưu Bút)
- Gửi lời nhắn tri ân ẩn danh hoặc công khai.
- Khách tự do chỉnh sửa/xóa lời nhắn của chính mình trong phiên làm việc.
- Hiển thị danh sách lưu bút đa dạng.

### Responsive UI
- Tương thích đa nền tảng: Desktop, Tablet, Mobile.
- Giao diện Glassmorphism hiện đại, hiệu ứng 3D tương tác.

---

## Architecture

```text
React + Tailwind CSS
          │
     RESTful API
          │
Spring Boot + Security
          │
 Spring Data JPA
          │
       MySQL
          │
   Local / Cloudinary
```

---

## Project Structure

```text
frontend/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── screens/
│   ├── styles/
│   └── App.jsx
│
└── package.json


backend/
│
├── controller/
├── service/
├── repository/
├── entity/
├── config/
├── security/
└── BackendApplication.java
```

---

## REST API (Các Endpoint Chính)

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/volunteers` | Lấy danh sách thành viên |
| GET | `/api/volunteers/{id}` | Lấy chi tiết thành viên |
| GET | `/api/gallery` | Lấy toàn bộ ảnh kỷ yếu |
| PUT | `/api/gallery/{id}` | Cập nhật ảnh kỷ yếu (Dành cho Admin) |
| GET | `/api/guestbook` | Lấy danh sách lưu bút |
| POST | `/api/guestbook/guest` | Khách gửi lưu bút mới |
| PUT | `/api/guestbook/{id}` | Chỉnh sửa lưu bút |
| GET | `/api/settings` | Lấy cấu hình trang chủ |
| PUT | `/api/settings` | Cập nhật cấu hình trang chủ |
| POST | `/api/auth/login` | Đăng nhập hệ thống (Admin) |
| POST | `/api/auth/guest` | Khởi tạo phiên làm việc cho Khách |
| POST | `/api/upload` | Upload file/ảnh |

---

## Getting Started

### Clone project

```bash
git clone https://github.com/your-username/yearbook-tsmt2026.git
```

---

### Backend

```bash
cd backend
```

Cấu hình `application.properties` ( thay đổi cho phù hợp với thiết bị):

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/yearbook_db?createDatabaseIfNotExist=true&useSSL=false
spring.datasource.username=root
spring.datasource.password=your_password

# Cấu hình Secret Key cho JWT Token
jwt.secret=YOUR_SUPER_SECRET_KEY
```

Chạy Server:

```bash
./mvnw spring-boot:run
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Future Improvements

- Pagination (Phân trang cho danh sách thành viên và ảnh).
- Email notification (Gửi mail thông báo khi có lưu bút mới).
- Docker Deployment.
- CI/CD Pipeline.

---

## Author

**Nguyễn Quốc Duy**

- Java Backend Developer
- Sinh viên năm 3 Công nghệ Thông tin

GitHub:
https://github.com/QuocDuyNguyen

---

## License

This project is developed for educational purposes and community volunteer activities.
