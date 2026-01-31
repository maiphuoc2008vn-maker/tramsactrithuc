import { auth, db } from "../firebase-config.js";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
    doc, setDoc, getDoc 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

function resetBtn(btn, text) {
    btn.innerHTML = text;
    btn.disabled = false;
}

// --- ĐĂNG NHẬP ---
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
            const docSnap = await getDoc(doc(db, "users", user.uid));

            if (docSnap.exists()) {
                localStorage.setItem('user_info_sql', JSON.stringify({ uid: user.uid, ...docSnap.data() }));
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.6s';
                setTimeout(() => {
                    const dest = new URLSearchParams(window.location.search).get('den');
                    window.location.href = dest ? `../${dest}` : "../trangchu/index.html";
                }, 600);
            }
        } catch (error) {
            alert("Đăng nhập thất bại! Vui lòng kiểm tra lại Email/Mật khẩu.");
            resetBtn(btnLogin, originalText);
        }
    });
}

// --- ĐĂNG KÝ ---
const btnRegister = document.getElementById('btn-register');
if (btnRegister) {
    btnRegister.addEventListener('click', async (e) => {
        e.preventDefault();
        const originalText = btnRegister.innerHTML;
        btnRegister.innerHTML = 'Đang xử lý...';
        btnRegister.disabled = true;

        const name = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const pass = document.getElementById('reg-pass').value.trim();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
            await setDoc(doc(db, "users", userCredential.user.uid), {
                username: name, email: email, score: 0, 
                avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                createdAt: new Date()
            });
            alert("Đăng ký thành công!");
            window.switchTab('login');
        } catch (error) {
            alert("Lỗi: " + error.message);
        } finally {
            resetBtn(btnRegister, originalText);
        }
    });
}
