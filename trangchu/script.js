document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. XỬ LÝ INTRO OVERLAY ---
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

    // --- 2. HIỆN AVATAR GÓC PHẢI ---
    const topControls = document.querySelector('.top-controls');
    if (userInfo && topControls) {
        const userDiv = document.createElement('div');
        userDiv.className = 'btn-float float-avatar';
        const avatarUrl = userInfo.avatar || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
        userDiv.innerHTML = `<img src="${avatarUrl}" alt="User">`;
        
        userDiv.onclick = function() {
            if(confirm(`Tài khoản: ${userInfo.username}\nBạn có muốn đăng xuất không?`)) {
                localStorage.removeItem('user_info_sql');
                window.location.reload();
            }
        };
        topControls.insertBefore(userDiv, topControls.firstChild);
    }

    // --- 3. HIỆU ỨNG TILT (NGHIÊNG THẺ) ---
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
            card.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) translateY(-5px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) translateY(0)`;
        });
    });

    // --- 4. DARK MODE ---
    const themeBtn = document.getElementById('theme-toggle');
    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            themeBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        });
    }

    // --- 5. BACKGROUND SLIDESHOW (CHẠY ẢNH NHƯ FILE CŨ) ---
    const bgImages = [];
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
                const tempImg = new Image();
                tempImg.src = bgImages[bgIndex];
                tempImg.onload = () => {
                    heroBg.src = bgImages[bgIndex];
                    heroBg.classList.remove('fading');
                };
            }, 400); 
        }, 5000); 
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
            loginBtn.onclick = () => window.location.href = `../login/login.html?den=${folder}/${file}`;
        }
    }
}

function closeLoginModal() {
    document.getElementById('login-modal').classList.remove('active');
}
