// File: login/login.js

// Import từ file cấu hình ở thư mục gốc
import { auth, db } from "../firebase-config.js"; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// --- XỬ LÝ ĐĂNG KÝ ---
const btnRegister = document.getElementById('btn-register');
if (btnRegister) {
    btnRegister.addEventListener('click', async (e) => {
        e.preventDefault();
        
        const originalText = btnRegister.innerHTML;
        btnRegister.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
        btnRegister.disabled = true;

        const email = document.getElementById('reg-email').value.trim();
        const pass = document.getElementById('reg-pass').value.trim();
        const name = document.getElementById('reg-name').value.trim();

        if (!email || !pass || !name) {
            alert("Vui lòng điền đủ thông tin!");
            btnRegister.innerHTML = originalText;
            btnRegister.disabled = false;
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
            const user = userCredential.user;
            
            // Lưu thông tin user vào Firestore
            await setDoc(doc(db, "users", user.uid), {
                username: name,
                email: email,
                score: 0,
                role: "member", // Vai trò mặc định
                avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                createdAt: new Date()
            });

            alert("Đăng ký thành công! Hãy đăng nhập.");
            
            // Chuyển sang form đăng nhập (nếu có hàm switchForm trong HTML)
            if(window.switchForm) window.switchForm('login');
            
        } catch (error) {
            let msg = error.message;
            if (error.code === 'auth/email-already-in-use') msg = "Email này đã được đăng ký!";
            if (error.code === 'auth/weak-password') msg = "Mật khẩu quá yếu (cần trên 6 ký tự)!";
            alert("Lỗi: " + msg);
        } finally {
            btnRegister.innerHTML = originalText;
            btnRegister.disabled = false;
        }
    });
}

// --- XỬ LÝ ĐĂNG NHẬP ---
const btnLogin = document.getElementById('btn-login');
if (btnLogin) {
    btnLogin.addEventListener('click', async (e) => {
        e.preventDefault();
        
        const originalText = btnLogin.innerHTML;
        btnLogin.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang vào lớp...';
        btnLogin.disabled = true;

        const email = document.getElementById('login-name').value.trim();
        const pass = document.getElementById('login-pass').value.trim();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, pass);
            const user = userCredential.user;

            // Lấy thông tin chi tiết từ Database
            const docSnap = await getDoc(doc(db, "users", user.uid));
            
            if (docSnap.exists()) {
                const userData = docSnap.data();
                
                // 1. Lưu vào LocalStorage để các trang khác (Trang chủ, Tài liệu) nhận diện
                localStorage.setItem('user_info_sql', JSON.stringify(userData));
                
                // 2. Chuyển hướng về TRANG CHỦ
                window.location.href = "../trangchu/index.html";
            } else {
                alert("Không tìm thấy dữ liệu người dùng này!");
            }
        } catch (error) {
            console.error(error);
            alert("Đăng nhập thất bại: Sai email hoặc mật khẩu.");
        } finally {
            btnLogin.innerHTML = originalText;
            btnLogin.disabled = false;
        }
    });
}
