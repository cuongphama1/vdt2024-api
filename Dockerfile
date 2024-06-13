# Sử dụng Node.js image
FROM node:14

# Tạo thư mục làm việc
WORKDIR /usr/src/app

# Cài đặt các dependencies
COPY package*.json ./

RUN npm install

# Copy mã nguồn của bạn vào image
COPY . .

# Expose cổng mà API của bạn sử dụng
EXPOSE 5000

# Lệnh để khởi động API
CMD ["node", "server.js"]
