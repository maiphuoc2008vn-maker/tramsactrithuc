document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MÀN HÌNH CHÀO (INTRO) ---
    const overlay = document.getElementById('intro-overlay');
    const enterBtn = document.getElementById('enter-site-btn');
    const userInfo = JSON.parse(localStorage.getItem('user_info_sql'));

    if (enterBtn && overlay) {
        if (userInfo && userInfo.username) {
            enterBtn.innerHTML = `Chào, ${userInfo.username} <i class="fas fa-arrow-right"></i>`;
        }
        enterBtn.onclick = () => {
            overlay.classList.add('hidden');
            setTimeout(() => overlay.style.display = 'none', 800);
            startBgSlider(); // Bắt đầu slide ảnh khi vào trang
        };
    }

    // --- 2. AVATAR USER ---
    const topControls = document.querySelector('.top-controls');
    if (userInfo && topControls) {
        const userDiv = document.createElement('div');
        userDiv.className = 'btn-float';
        userDiv.style.overflow = 'hidden';
        userDiv.innerHTML = `<img src="${userInfo.avatar || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}" style="width:100%;height:100%;object-fit:cover;">`;
        userDiv.onclick = () => {
            if(confirm('Đăng xuất tài khoản?')) { localStorage.removeItem('user_info_sql'); location.reload(); }
        };
        topControls.insertBefore(userDiv, topControls.firstChild);
    }

    // --- 3. DARK MODE ---
    const themeBtn = document.getElementById('theme-toggle');
    if(themeBtn) {
        if(localStorage.getItem('theme') === 'dark') document.body.classList.add('dark-mode');
        themeBtn.onclick = () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        };
    }

    // --- 4. BACKGROUND SLIDER ---
    function startBgSlider() {
        const bgImgs = ['../images/bg1.jpg', '../images/congtruong.jpg', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1920'];
        let idx = 0;
        const heroBg = document.getElementById('hero-bg-slider');
        if(!heroBg) return;

        setInterval(() => {
            idx = (idx + 1) % bgImgs.length;
            heroBg.classList.add('fading');
            setTimeout(() => {
                heroBg.src = bgImgs[idx];
                heroBg.onload = () => heroBg.classList.remove('fading');
            }, 400);
        }, 5000);
    }

    // --- 5. CHATBOT AI (LOGIC QUAN TRỌNG) ---
    const chatToggle = document.getElementById('chatbot-toggle');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatBody = document.getElementById('chat-body');

    // Cấu hình Key API (Đã ghép lại để hoạt động)
    const p1 = "AIzaSy";
    const p2 = "CtWzrCrEwT_OsS69tpjbS-_vKWNnd2dGc";
    const API_KEY = p1 + p2;

    if (chatToggle && chatWindow) {
        // Mở Chat
        chatToggle.onclick = () => {
            chatWindow.classList.add('active');
            chatToggle.style.transform = 'scale(0)'; // Ẩn nút tròn khi mở chat
        };

        // Đóng Chat
        closeChat.onclick = () => {
            chatWindow.classList.remove('active');
            chatToggle.style.transform = 'scale(1)'; // Hiện lại nút tròn
        };

        // Hàm xử lý chat
        async function handleChat() {
            const txt = chatInput.value.trim();
            if(!txt) return;

            // 1. Hiện tin nhắn User
            addMsg(txt, 'user');
            chatInput.value = '';
            
            // 2. Hiện trạng thái đang nhập...
            const loadingId = 'loading-' + Date.now();
            addMsg('<i class="fas fa-ellipsis-h"></i>', 'bot', loadingId);

            try {
                // Gọi API Google Gemini
                const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ 
                        contents: [{ parts: [{ text: "Trả lời ngắn gọn, thân thiện như bạn bè học sinh cấp 3 (có dùng icon): " + txt }] }] 
                    })
                });
                
                const data = await res.json();
                
                // Xóa hiệu ứng loading
                document.getElementById(loadingId)?.remove();

                // 3. Hiện câu trả lời Bot
                if (data.candidates && data.candidates.length > 0) {
                    addMsg(data.candidates[0].content.parts[0].text, 'bot');
                } else {
                    addMsg("Mình đang hơi lag, hỏi lại sau nhé! 😵", 'bot');
                }
            } catch(e) {
                document.getElementById(loadingId)?.remove();
                addMsg("Lỗi mạng rồi bạn ơi! 🔌", 'bot');
            }
        }

        // Sự kiện click nút gửi
        chatSend.onclick = handleChat;
        chatInput.onkeypress = (e) => { if(e.key==='Enter') handleChat() };
    }

    function addMsg(txt, sender, id) {
        const d = document.createElement('div');
        d.className = `msg ${sender}`;
        if(id) d.id = id;
        d.innerHTML = txt;
        chatBody.appendChild(d);
        chatBody.scrollTop = chatBody.scrollHeight; // Tự cuộn xuống dưới
    }
});

// --- GLOBAL FUNCTIONS ---
function protectAccess(folder, file) {
    if (localStorage.getItem('user_info_sql')) {
        window.location.href = `../${folder}/${file}`;
    } else {
        document.getElementById('login-modal').classList.add('active');
    }
}

function closeLoginModal() {
    document.getElementById('login-modal').classList.remove('active');
}
