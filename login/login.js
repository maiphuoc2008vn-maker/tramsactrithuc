// File: login/login.js

import { auth, db } from "../firebase-config.js";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
    doc, setDoc, getDoc 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// --- XỬ LÝ ĐĂNG KÝ ---
const btnRegister = document.getElementById('btn-register');
if (btnRegister) {
    btnRegister.addEventListener('click', async (e) => {
        e.preventDefault();
        
        // Đổi nút thành loading
        const originalText = btnRegister.innerHTML;
        btnRegister.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
        btnRegister.disabled = true;

        const name = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const pass = document.getElementById('reg-pass').value.trim();

        if (!name || !email || !pass) {
            alert("Vui lòng điền đầy đủ thông tin!");
            resetBtn(btnRegister, originalText);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                username: name,
                email: email,
                score: 0,
                title: "Tân Binh",
                avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                createdAt: new Date()
            });

            alert("Đăng ký thành công! Hãy đăng nhập ngay.");
            window.switchForm('login'); // Chuyển sang form đăng nhập
            document.getElementById('login-name').value = email;
            
        } catch (error) {
            let msg = error.message;
            if(error.code === 'auth/email-already-in-use') msg = "Email này đã được sử dụng!";
            if(error.code === 'auth/weak-password') msg = "Mật khẩu quá yếu!";
            alert("Lỗi: " + msg);
        } finally {
            resetBtn(btnRegister, originalText);
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

        if (!email || !pass) {
            alert("Vui lòng nhập Email và Mật khẩu!");
            resetBtn(btnLogin, originalText);
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, pass);
            const user = userCredential.user;

            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                const userInfo = { uid: user.uid, ...userData };
                localStorage.setItem('user_info_sql', JSON.stringify(userInfo));

                // Hiệu ứng đẹp khi đăng nhập thành công
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 1s';
                setTimeout(() => {
                    window.location.href = "../game/hub.html";
                }, 1000);
            } else {
                alert("Không tìm thấy dữ liệu người dùng!");
            }

        } catch (error) {
            console.error(error);
            alert("Đăng nhập thất bại! Sai thông tin.");
        } finally {
            resetBtn(btnLogin, originalText);
        }
    });
}

function resetBtn(btn, text) {
    btn.innerHTML = text;
    btn.disabled = false;
}
