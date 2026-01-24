document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. XỬ LÝ INTRO OVERLAY (MÀN HÌNH CHÀO) ---
    const overlay = document.getElementById('intro-overlay');
    const enterBtn = document.getElementById('enter-site-btn');
    
    // Lấy thông tin user từ LocalStorage
    const userInfo = JSON.parse(localStorage.getItem('user_info_sql'));
    
    if (enterBtn && overlay) {
        // Nếu đã đăng nhập, đổi chữ nút chào thành tên người dùng
        if (userInfo && userInfo.username) {
            enterBtn.innerHTML = `Chào, ${userInfo.username} <i class="fas fa-arrow-right"></i>`;
        }

        enterBtn.addEventListener('click', () => {
            overlay.classList.add('hidden');
        });
    }

    // --- 2. HIỆN AVATAR GÓC PHẢI (NẾU ĐÃ ĐĂNG NHẬP) ---
    const topControls = document.querySelector('.top-controls');
    if (userInfo && topControls) {
        // Tạo nút Avatar
        const userDiv = document.createElement('div');
        userDiv.className = 'btn-float float-avatar';
        userDiv.title = "Nhấn để xem thông tin hoặc đăng xuất";
        
        // Avatar mặc định nếu user chưa có ảnh
        const avatarUrl = userInfo.avatar || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
        
        userDiv.innerHTML = `
            <img src="${avatarUrl}" alt="User">
            <div class="status-dot"></div>
        `;
        
        // Bấm vào Avatar thì hỏi Đăng xuất
        userDiv.onclick = function() {
            if(confirm(`Tài khoản: ${userInfo.username}\nEmail: ${userInfo.email}\n\nBạn có muốn đăng xuất không?`)) {
                localStorage.removeItem('user_info_sql');
                window.location.reload(); // Tải lại trang để về trạng thái chưa đăng nhập
            }
        };

        // Chèn Avatar vào trước nút Dark Mode
        topControls.insertBefore(userDiv, topControls.firstChild);
    }

    // --- 3. HIỆU ỨNG CUỘN (SCROLL REVEAL) ---
    const reveals = document.querySelectorAll('.reveal, .reveal-text');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // --- 4. 3D TILT EFFECT (HIỆU ỨNG LẬT THẺ) ---
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
        });
    });

    // --- 5. DARK MODE (CHẾ ĐỘ TỐI) ---
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeBtn ? themeBtn.querySelector('i') : null;
    
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        if(themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            if(themeIcon) themeIcon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
        });
    }
    // --- 7. BACKGROUND SLIDESHOW (ẢNH NỀN TỰ ĐỔI) ---
    const bgImages = [];
    // Tự động load 10 ảnh từ bg1.jpg đến bg10.jpg
    for (let i = 1; i <= 10; i++) { 
        bgImages.push(`../images/bg${i}.jpg`);
    }

    let bgIndex = 0;
    const heroBg = document.getElementById('hero-bg-slider');

    if (heroBg && bgImages.length > 0) {
        setInterval(() => {
            heroBg.classList.add('fading'); // Làm mờ

            setTimeout(() => {
                bgIndex = (bgIndex + 1) % bgImages.length;
                
                // Preload ảnh để tránh nháy
                const tempImg = new Image();
                tempImg.src = bgImages[bgIndex];
                
                tempImg.onload = () => {
                    heroBg.src = bgImages[bgIndex];
                    heroBg.classList.remove('fading'); // Hiện lại
                };
                
                // Dự phòng nếu ảnh lỗi vẫn hiện lại
                tempImg.onerror = () => heroBg.classList.remove('fading');

            }, 400); // 0.4s khớp với CSS transition

        }, 5000); // Đổi ảnh mỗi 5 giây
    }
});

/* =============================================================
   HÀM GLOBAL (GỌI TỪ HTML) - ĐÃ CẬP NHẬT LOGIC CHUYỂN HƯỚNG
   ============================================================= */

// 1. Hàm bảo vệ: Kiểm tra xem User đã đăng nhập chưa
function protectAccess(folder, file) {
    const userStr = localStorage.getItem('user_info_sql');
    
    if (userStr) {
        // TRƯỜNG HỢP 1: ĐÃ ĐĂNG NHẬP
        // Chuyển thẳng tới trang đích (VD: game/hub.html)
        window.location.href = `../${folder}/${file}`;
    } else {
        // TRƯỜNG HỢP 2: CHƯA ĐĂNG NHẬP
        // Hiện bảng Login và GHI NHỚ trang đích muốn đến
        showLoginModal(folder, file);
    }
}

// 2. Hàm hiện Modal & Cài đặt nút "Đăng nhập"
function showLoginModal(folder, file) {
    const modal = document.getElementById('login-modal');
    
    if(modal) {
        modal.classList.add('active');
        
        // Tìm nút "Đăng nhập" màu xanh trong Modal
        const loginBtn = modal.querySelector('.btn-confirm');
        
        if (loginBtn) {
            // Thay đổi hành động của nút này
            // Khi bấm vào, nó sẽ chuyển sang trang Login kèm theo địa chỉ muốn đến (?den=...)
            loginBtn.onclick = function() {
                window.location.href = `../login/login.html?den=${folder}/${file}`;
            };
        }
    } else {
        // Dự phòng nếu lỡ xóa mất Modal trong HTML
        if(confirm("Bạn cần đăng nhập! Chuyển đến trang đăng nhập?")) {
            window.location.href = `../login/login.html?den=${folder}/${file}`;
        }
    }
}

// 3. Hàm đóng Modal (Khi bấm nút "Để sau")
function closeLoginModal() {
    const modal = document.getElementById('login-modal');
    if(modal) modal.classList.remove('active');
}
