document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. XỬ LÝ INTRO OVERLAY (MÀN HÌNH CHÀO) ---
    const overlay = document.getElementById('intro-overlay');
    const enterBtn = document.getElementById('enter-site-btn');
    
    // Lấy thông tin user
    const userInfo = JSON.parse(localStorage.getItem('user_info_sql'));
    
    if (enterBtn && overlay) {
        // Nếu đã đăng nhập, đổi chữ nút chào
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
        userDiv.title = "Nhấn để đăng xuất";
        // Avatar mặc định nếu không có ảnh
        const avatarUrl = userInfo.avatar || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
        
        userDiv.innerHTML = `
            <img src="${avatarUrl}" alt="User">
            <div class="status-dot"></div>
        `;
        
        // Bấm vào Avatar thì hỏi Đăng xuất
        userDiv.onclick = function() {
            if(confirm(`Tài khoản: ${userInfo.username}\nEmail: ${userInfo.email}\n\nBạn có muốn đăng xuất không?`)) {
                localStorage.removeItem('user_info_sql');
                window.location.reload(); 
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

    // --- 4. 3D TILT EFFECT ---
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

    // --- 5. DARK MODE ---
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

    // --- 6. BACKGROUND SLIDESHOW ---
    const bgImages = [];
    // Giả sử có 10 ảnh từ bg1.jpg đến bg10.jpg
    for (let i = 1; i <= 10; i++) { 
        bgImages.push(`../images/bg${i}.jpg`);
    }

    let bgIndex = 0;
    const heroBg = document.getElementById('hero-bg-slider');

    if (heroBg && bgImages.length > 0) {
        setInterval(() => {
            heroBg.classList.add('fading'); 
            setTimeout(() => {
                bgIndex = (bgIndex + 1) % bgImages.length;
                
                // Tạo ảnh tạm để preload trước khi gán
                const tempImg = new Image();
                tempImg.src = bgImages[bgIndex];
                tempImg.onload = () => {
                    heroBg.src = bgImages[bgIndex];
                    heroBg.classList.remove('fading');
                };
                // Fallback nếu load lỗi
                tempImg.onerror = () => heroBg.classList.remove('fading');
                
            }, 400); 
        }, 5000); 
    }
});

/* =============================================================
   HÀM BẢO VỆ (GỌI TỪ HTML)
   ============================================================= */
function protectAccess(folder, file) {
    const userStr = localStorage.getItem('user_info_sql');
    
    if (userStr) {
        // Đã đăng nhập -> Chuyển hướng
        window.location.href = `../${folder}/${file}`;
    } else {
        // Chưa đăng nhập -> Hiện Modal
        showLoginModal();
    }
}

function showLoginModal() {
    const modal = document.getElementById('login-modal');
    if(modal) modal.classList.add('active');
}

function closeLoginModal() {
    const modal = document.getElementById('login-modal');
    if(modal) modal.classList.remove('active');
}
