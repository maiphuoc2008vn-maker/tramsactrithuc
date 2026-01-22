// 1. Import các hàm từ Firebase qua đường dẫn CDN (Dành cho web chạy trực tiếp)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 2. Cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyBO4Z7X3t_lNiUOGl1A74mYlbfcamzxP-s",
  authDomain: "tram-sac-12a4-final.firebaseapp.com",
  projectId: "tram-sac-12a4-final",
  storageBucket: "tram-sac-12a4-final.firebasestorage.app",
  messagingSenderId: "81252342287",
  appId: "1:81252342287:web:475bc6898d58565f3ca17a"
};

// 3. Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// 4. Khởi tạo Authentication (Đăng nhập) và Firestore (Cơ sở dữ liệu)
const auth = getAuth(app);
const db = getFirestore(app);

// 5. Xuất ra để các file khác (login.js, script.js) sử dụng
export { app, auth, db };
