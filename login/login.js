import { auth, db } from "../firebase-config.js";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
    doc, setDoc, getDoc 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. HIỆU ỨNG SLIDER (Chuyển tab) ---
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    if(signUpButton && signInButton) {
        signUpButton.addEventListener('click', () => container.classList.add("right-panel-active"));
        signInButton.addEventListener('click', () => container.classList.remove("right-panel-active"));
    }

    // --- 2. HIỆU ỨNG 3D TILT (Nghiêng theo chuột) ---
    const card = document.getElementById('container');
    document.addEventListener('mousemove', (e) => {
        // Chỉ chạy trên máy tính
        if (window.innerWidth > 768) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        }
    });
    // Trả về vị trí cũ khi chuột rời đi
    document.addEventListener('mouseleave', () => {
        card.style.transform = `rotateY(0deg) rotateX(0deg)`;
        card.style.transition = "all 0.5s ease";
    });
    document.addEventListener('mouseenter', () => {
        card.style.transition = "none";
    });

    // --- 3. XỬ LÝ ĐĂNG KÝ ---
    const btnRegister = document.getElementById('btn-register');
    if (btnRegister) {
        btnRegister.addEventListener('click', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('reg-name').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const pass = document.getElementById('reg-pass').value.trim();

            if (!name || !email || !pass) {
                alert("Vui lòng điền đầy đủ thông tin!");
                return;
            }

            try {
                // Tạo tài khoản Auth
                const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
                const user = userCredential.user;

                // Lưu thông tin vào Firestore
                await setDoc(doc(db, "users", user.uid), {
                    username: name,
                    email: email,
                    score: 0,
                    title: "Tân Binh",
                    avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                    createdAt: new Date()
                });

                alert("Đăng ký thành công! Đang chuyển hướng...");
                container.classList.remove("right-panel-active");
                document.getElementById('login-name').value = email;
                
            } catch (error) {
                let msg = error.message;
                if(error.code === 'auth/email-already-in-use') msg = "Email này đã được dùng rồi!";
                if(error.code === 'auth/weak-password') msg = "Mật khẩu yếu quá (cần >6 ký tự)!";
                alert("Lỗi: " + msg);
            }
        });
    }

    // --- 4. XỬ LÝ ĐĂNG NHẬP ---
    const btnLogin = document.getElementById('btn-login');
    if (btnLogin) {
        btnLogin.addEventListener('click', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('login-name').value.trim();
            const pass = document.getElementById('login-pass').value.trim();

            if (!email || !pass) {
                alert("Nhập Email và Mật khẩu đi bạn ơi!");
                return;
            }

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, pass);
                const user = userCredential.user;

                // Lấy thông tin
                const docSnap = await getDoc(doc(db, "users", user.uid));

                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    const userInfo = { uid: user.uid, ...userData };
                    localStorage.setItem('user_info_sql', JSON.stringify(userInfo));

                    alert(`Chào mừng ${userData.username} quay trở lại!`);
                    window.location.href = "../game/hub.html";
                } else {
                    alert("Lỗi dữ liệu! (Không tìm thấy user)");
                }

            } catch (error) {
                alert("Đăng nhập thất bại! Sai Email hoặc Mật khẩu.");
            }
        });
    }
});
