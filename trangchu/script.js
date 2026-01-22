document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. XỬ LÝ INTRO OVERLAY ---
    const overlay = document.getElementById('intro-overlay');
    const enterBtn = document.getElementById('enter-site-btn');
    if (enterBtn && overlay) {
        enterBtn.addEventListener('click', () => {
            overlay.classList.add('hidden');
        });
    }

    // --- 2. SCROLL REVEAL ---
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

    // --- 3. 3D TILT EFFECT ---
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

    // --- 4. DARK MODE ---
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

    // --- 5. CHATBOT ---
    const chatBtn = document.getElementById('chatbot-toggle');
    if(chatBtn) {
        chatBtn.addEventListener('click', () => {
            alert("Xin chào! Tôi có thể giúp gì cho bạn?");
        });
    }

    // ==========================================
    // 6. BACKGROUND SLIDESHOW (CHẠY 27 ẢNH)
    // ==========================================
    const bgImages = [];
    for (let i = 1; i <= 100; i++) {
        bgImages.push(`../images/bg${i}.jpg`);
    }

    let bgIndex = 0;
    const heroBg = document.getElementById('hero-bg-slider');

    if (heroBg && bgImages.length > 0) {
        // Preload ảnh
        bgImages.forEach(src => { new Image().src = src; });

        setInterval(() => {
            heroBg.classList.add('fading');

            setTimeout(() => {
                bgIndex = (bgIndex + 1) % bgImages.length;
                heroBg.src = bgImages[bgIndex];

                heroBg.onload = () => {
                    heroBg.classList.remove('fading');
                };
                
                setTimeout(() => heroBg.classList.remove('fading'), 100);

            }, 4000); // Mờ 0.4s

        }, 5000); // Đổi sau 1.5s
    }

    // 
    // 7. XỬ LÝ LOGIC USER
    // 
    const userStr = localStorage.getItem('user_info_sql');
    const headerAvatar = document.getElementById('header-avatar-img');

    if (userStr) {
        const user = JSON.parse(userStr);
        const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/4140/4140048.png";
        const finalAvatar = user.avatar_url || defaultAvatar; 

        // Chỉ cập nhật avatar trên Header
        if(headerAvatar) headerAvatar.src = finalAvatar;
    }
});

// GLOBAL FUNCTIONS
function showLoginModal() {
    const modal = document.getElementById('login-modal');
    if(modal) modal.classList.add('active');
}
function closeLoginModal() {
    const modal = document.getElementById('login-modal');
    if(modal) modal.classList.remove('active');
}
function goToProfile() {
    const userStr = localStorage.getItem('user_info_sql');
    if(userStr) window.location.href = '../profile/profile.html';
    else showLoginModal();
}
function checkRedirect() { goToProfile(); }
function goToHub() {
    const userStr = localStorage.getItem('user_info_sql');
    if(userStr) window.location.href = '../game/hub.html';
    else showLoginModal();
}
