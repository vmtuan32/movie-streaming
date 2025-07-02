# Movie Streaming Platform

## Công nghệ sử dụng
- Frontend: ReactJS
- Backend: NestJS
- Databases: PostgreSQL, MongoDB, Redis
- Media: FFmpeg (xử lý video), HLS streaming

## Cách setup môi trường phát triển

### 1. Cài đặt Docker & Docker Compose

### 2. Clone repo:
```bash
git clone https://github.com/your-org/movie-streaming.git
cd movie-streaming
```

### 3. Chạy ứng dụng:
```bash
docker-compose up --build
```

### 4. Cấu trúc repo
- `/backend`: mã nguồn NestJS
- `/frontend`: mã nguồn ReactJS
- `/media`: file video, HLS (không push lên git)