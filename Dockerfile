# Dockerfile for API Server

# Sử dụng image node ổn định nhất
FROM node:16

# Tạo thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các dependencies của server
RUN npm install

# Sao chép toàn bộ mã nguồn server vào thư mục làm việc
COPY . .

# Expose cổng 5000 để có thể truy cập API từ bên ngoài
EXPOSE 5000

# Khởi động server
CMD ["node", "server.js"]
