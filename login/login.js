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

// Xử lý Đăng nhập
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
                document.body.style.transition = 'opacity 0.8s';
                setTimeout(() => {
                    const dest = new URLSearchParams(window.location.search).get('den');
                    window.location.href = dest ? `../${dest}` : "../trangchu/index.html";
                }, 800);
            }
        } catch (error) {
            alert("Đăng nhập thất bại!");
            resetBtn(btnLogin, originalText);
        }
    });
}

// Xử lý Đăng ký
const btnRegister = document.getElementById('btn-register');
if (btnRegister) {
    btnRegister.addEventListener('click', async (e) => {
        e.preventDefault();
        const originalText = btnRegister.innerHTML;
        btnRegister.innerHTML = 'Đang xử lý...';
        btnRegister.disabled = true;

        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const pass = document.getElementById('reg-pass').value;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
            await setDoc(doc(db, "users", userCredential.user.uid), {
                username: name, email: email, score: 0, createdAt: new Date()
            });
            alert("Đăng ký thành công!");
            window.switchTab('login'); // Chuyển sang form đăng nhập
        } catch (error) {
            alert("Lỗi đăng ký!");
        } finally {
            resetBtn(btnRegister, originalText);
        }
    });
}
