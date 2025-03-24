import { defineConfig } from 'vite'; // Import hàm defineConfig từ Vite để cấu hình dự án
import react from '@vitejs/plugin-react'; // Import plugin hỗ trợ React cho Vite
import tailwindcss from '@tailwindcss/vite'; // Import plugin hỗ trợ Tailwind CSS cho Vite

export default defineConfig({
  plugins: [
    react(), // Kích hoạt plugin React
    tailwindcss(), // Kích hoạt plugin Tailwind CSS
  ],
  base: '/',
  publicDir: 'public',
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.jpeg', '**/*.gif'],
  server: {
    port: 4000, // Thiết lập cổng chạy Vite, mặc định là 5173 nhưng ở đây đổi thành 4000
    proxy: {
      '/api': { 
        target: 'http://localhost:3000', // Chuyển tiếp request `/api` đến server backend chạy ở localhost:3000
        changeOrigin: true, // Thay đổi `Origin` của request để tránh lỗi CORS
        rewrite: (path) => path.replace(/^\/api/, ''), // Xóa tiền tố `/api` trước khi gửi request đến backend
      },
    },
  },
});
