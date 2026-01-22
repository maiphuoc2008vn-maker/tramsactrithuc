// ================================================================
// FILE: login.js
// ================================================================

// 1. IMPORT CẤU HÌNH VÀ THƯ VIỆN
// Lấy auth và db từ file cấu hình bạn đã tạo
import { auth, db } from './firebase-config.js';

// Các hàm xác thực (Authentication)
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    updateProfile,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Các hàm cơ sở dữ liệu (Firestore)
import { 
    doc, 
    setDoc, 
    getDoc 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ================================================================
// 2. KIỂM TRA TRẠNG THÁI ĐĂNG NHẬP (TÙY CHỌN)
// Nếu người dùng đã đăng nhập rồi thì chuyển thẳng vào trang chủ
// ================================================================
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Người dùng đã đăng nhập:", user.email);
        // Nếu bạn muốn tự động chuyển trang khi đã login rồi thì bỏ comment dòng dưới:
        // window.location.href = "index.html";
    }
});

// ================================================================
// 3. XỬ LÝ SỰ KIỆN ĐĂNG NHẬP
// ================================================================
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Ngăn trình duyệt load lại trang

        // Lấy dữ liệu từ form (ID khớp với file HTML của bạn)
        const email = document.getElementById('login-name').value;
        const password = document.getElementById('login-pass').value;
        const btnLogin = document.getElementById('btn-login');

        // Hiệu ứng nút bấm (Loading)
        const originalText = btnLogin.innerHTML;
        btnLogin.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
        btnLogin.disabled = true;
        btnLogin.style.opacity = "0.7";

        try {
            // Gửi yêu cầu đăng nhập lên Firebase
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Thông báo thành công
            alert(Chào mừng chiến binh ${user.displayName || "ẩn danh"} quay trở lại!);
            
            // Chuyển hướng sang trang chủ (Trang nội dung chính)
            window.location.href = "index.html"; 

        } catch (error) {
            console.error("Lỗi Login:", error);
            
            // Xử lý thông báo lỗi tiếng Việt cho thân thiện
            let message = "Đăng nhập thất bại. Vui lòng thử lại.";
            
            switch (error.code) {
                case 'auth/invalid-credential':
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                case 'auth/invalid-email':
                    message = "Sai email hoặc mật khẩu rồi!";
                    break;
                case 'auth/too-many-requests':
                    message = "Bạn nhập sai quá nhiều lần. Hãy đợi lát nữa rồi thử lại.";
                    break;
                case 'auth/network-request-failed':
                    message = "Lỗi mạng! Vui lòng kiểm tra kết nối Internet.";
                    break;
            }
            alert(message);
        } finally {
            // Khôi phục nút bấm về ban đầu
            btnLogin.innerHTML = originalText;
            btnLogin.disabled = false;
            btnLogin.style.opacity = "1";
        }
    });
}

// ================================================================
// 4. XỬ LÝ SỰ KIỆN ĐĂNG KÝ
// ================================================================
const registerForm = document.getElementById('registerForm');

if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Lấy dữ liệu từ form
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-pass').value;
        const btnRegister = document.getElementById('btn-register');

        // Validate cơ bản
        if (password.length < 6) {
            alert("Mật khẩu phải có ít nhất 6 ký tự!");
            return;
        }

        // Hiệu ứng nút bấm
        const originalText = btnRegister.innerHTML;
        btnRegister.innerHTML = '<i class="fas fa-rocket fa-spin"></i> Đang khởi tạo...';
        btnRegister.disabled = true;
        btnRegister.style.opacity = "0.7";

        try {
            // BƯỚC 1: Tạo tài khoản Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // BƯỚC 2: Cập nhật Tên hiển thị (DisplayName)
            await updateProfile(user, {
                displayName: name
            });

            // BƯỚC 3: Lưu thông tin người dùng vào Firestore
            // (Quan trọng để sau này làm tính năng lưu điểm, xếp hạng)
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                displayName: name,
                email: email,
                photoURL: user.photoURL || "",
                createdAt: new Date().toISOString(),
                role: "student",   // Phân quyền: student
                score: 0,          // Điểm số khởi tạo
                class: "12A4"      // Lớp mặc định (theo tên dự án của bạn)
            });

            // Thông báo thành công
            alert("Đăng ký tài khoản thành công! Hãy đăng nhập ngay.");

            // Chuyển form về tab Đăng nhập
            if (window.switchForm) {
                window.switchForm('login');
            } else {
                // Fallback nếu hàm switchForm chưa load kịp
                location.reload(); 
            }
            
            // Xóa trắng các ô nhập liệu
            registerForm.reset();

        } catch (error) {
            console.error("Lỗi Register:", error);
