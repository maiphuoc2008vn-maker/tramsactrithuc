document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. XỬ LÝ MÀN HÌNH CHÀO ---
    const overlay = document.getElementById('intro-overlay');
    const enterBtn = document.getElementById('enter-site-btn');
    const userInfo = JSON.parse(localStorage.getItem('user_info_sql'));
    
    if (enterBtn && overlay) {
        if (userInfo && userInfo.username) {
            enterBtn.innerHTML = `Chào, ${userInfo.username} <i class="fas fa-arrow-right"></i>`;
        }
        enterBtn.addEventListener('click', () => {
            overlay.classList.add('hidden');
        });
    }

    // --- 2. XỬ LÝ AVATAR VÀ BẢNG THÔNG TIN ---
    const topControls = document.querySelector('.top-controls');
    if (userInfo && topControls) {
        const userDiv = document.createElement('div');
        userDiv.className = 'btn-float float-avatar';
        userDiv.title = "Xem thông tin cá nhân";
        const avatarUrl = userInfo.avatar || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
        
        userDiv.innerHTML = `<img src="${avatarUrl}" alt="User"><div class="status-dot"></div>`;
        
        // KHI CLICK VÀO AVATAR -> HIỆN MODAL ĐẸP
        userDiv.onclick = function() {
            const logoutModal = document.getElementById('logout-modal');
            const modalAvatar = document.getElementById('modal-avatar');
            const modalName = document.getElementById('modal-username');
            const modalEmail = document.getElementById('modal-email');
            const btnLogout = document.getElementById('confirm-logout-btn');

            if(logoutModal) {
                modalAvatar.src = avatarUrl;
                modalName.innerText = userInfo.username;
                modalEmail.innerText = userInfo.email;
                
                logoutModal.classList.add('active');

                btnLogout.onclick = function() {
                    localStorage.removeItem('user_info_sql');
                    window.location.reload(); 
                };
            }
        };
        topControls.insertBefore(userDiv, topControls.firstChild);
    }

    // --- 3. SLIDESHOW ẢNH NỀN (NHANH & MƯỢT) ---
    const bgImages = [];
    for (let i = 1; i <= 10; i++) bgImages.push(`../images/bg${i}.jpg`);

    let bgIndex = 0;
    const heroBg = document.getElementById('hero-bg-slider');

    if (heroBg && bgImages.length > 0) {
        setInterval(() => {
            // Bước 1: Mờ đi
            heroBg.classList.add('fading'); 

            // Bước 2: Chờ 0.6 giây (nhanh hơn)
            setTimeout(() => {
                bgIndex = (bgIndex + 1) % bgImages.length;
                
                const tempImg = new Image();
                tempImg.src = bgImages[bgIndex];
                
                tempImg.onload = () => {
                    heroBg.src = bgImages[bgIndex];
                    heroBg.classList.remove('fading'); 
                };
                
                tempImg.onerror = () => heroBg.classList.remove('fading');

            }, 600); // Khớp với 0.6s transition CSS

        }, 4000); // Đổi ảnh mỗi 4 giây (nhanh hơn, trước là 6s)
    }

    // --- 4. CÁC HIỆU ỨNG KHÁC ---
    const reveals = document.querySelectorAll('.reveal, .reveal-text');
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        reveals.forEach((reveal) => {
            if (reveal.getBoundingClientRect().top < windowHeight - 100) {
                reveal.classList.add('active');
            }
        });
    });

    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg) scale(1.05)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
        });
    });

    const themeBtn = document.getElementById('theme-toggle');
    if(themeBtn) {
        const icon = themeBtn.querySelector('i');
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            if(icon) icon.classList.replace('fa-moon', 'fa-sun');
        }
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            if(icon) icon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
        });
    }
});

// --- CÁC HÀM GLOBAL ---

function protectAccess(folder, file) {
    const userStr = localStorage.getItem('user_info_sql');
    if (userStr) {
        window.location.href = `../${folder}/${file}`;
    } else {
        showLoginModal(folder, file);
    }
}

function showLoginModal(folder, file) {
    const modal = document.getElementById('login-modal');
    if(modal) {
        modal.classList.add('active');
        const loginBtn = modal.querySelector('.btn-confirm');
        if (loginBtn) {
            loginBtn.onclick = function() {
                window.location.href = `../login/login.html?den=${folder}/${file}`;
            };
        }
    }
}

function closeLoginModal() {
    const modal = document.getElementById('login-modal');
    if(modal) modal.classList.remove('active');
}

function closeLogoutModal() {
    const modal = document.getElementById('logout-modal');
    if(modal) modal.classList.remove('active');
}
window.closeLogoutModal = closeLogoutModal;
