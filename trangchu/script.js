document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. CODE CŨ: MÀN HÌNH CHÀO ---
    const introOverlay = document.getElementById('intro-overlay');
    const enterBtn = document.getElementById('enter-site-btn');
    if(enterBtn) {
        enterBtn.addEventListener('click', () => {
            introOverlay.style.opacity = '0';
            setTimeout(() => { introOverlay.style.display = 'none'; }, 800);
        });
    }

    // --- 2. CODE CŨ: DARK MODE ---
    const themeToggle = document.getElementById('theme-toggle');
    if(themeToggle) {
        if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark-mode');
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }

    // --- 3. CODE CŨ: SLIDER ---
    const backgrounds = ['../images/bg1.jpg', 'https://images.unsplash.com/photo-1497294815431-9365093b7331?q=80&w=1920'];
    let currentBgIndex = 0;
    const heroImg = document.getElementById('hero-bg-slider');
    if(heroImg) {
        setInterval(() => {
            currentBgIndex = (currentBgIndex + 1) % backgrounds.length;
            heroImg.style.opacity = '0';
            setTimeout(() => {
                heroImg.src = backgrounds[currentBgIndex];
                heroImg.onload = () => { heroImg.style.opacity = '1'; };
            }, 500);
        }, 5000);
    }

    // --- 4. CODE CŨ: TILT CARD ---
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) - rect.width/2) / (rect.width/2) * 10;
            const y = ((e.clientY - rect.top) - rect.height/2) / (rect.height/2) * -10;
            card.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) scale(1.05)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // --- 5. CHATBOT AI (CODE CỦA BẠN ĐÃ ĐƯỢC TÍCH HỢP) ---
    // Khai báo API Key ở đây (Lấy từ prompt trước của bạn)
    const p1 = "AIzaSy";
    const p2 = "CtWzrCrEwT_OsS69tpjbS-_vKWNnd2dGc";
    const GEMINI_API_KEY = p1 + p2;

    const chatWin = document.getElementById('chat-window');
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input');
    const btnSend = document.getElementById('chat-send');

    // Nút mở chat
    document.getElementById('chatbot-toggle').onclick = () => chatWin.classList.toggle('active');

    async function handleChat() {
        const userText = chatInput.value.trim();
        if (!userText) return;

        appendMsg(userText, 'user');
        chatInput.value = "";
        
        // Tạo ID tạm cho tin nhắn Bot
        const botId = "bot-" + Date.now();
        appendMsg("AI đang trả lời...", 'bot', botId);

        try {
            // SỬA NHỎ: Dùng model gemini-1.5-flash để đảm bảo chạy được (v3 preview chưa public rộng rãi)
            // Nếu bạn muốn dùng v3, hãy đổi lại dòng này thành: const modelName = "gemini-3-flash-preview";
            const modelName = "gemini-1.5-flash"; 
            
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;
            
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: `Bạn là trợ lý 12A4 Nam Hà. Câu hỏi: ${userText}` }] }]
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error ? data.error.message : "Lỗi hệ thống AI");
            }

            if (data.candidates && data.candidates.length > 0) {
                const aiText = data.candidates[0].content.parts[0].text;
                document.getElementById(botId).innerText = aiText;
            } else {
                document.getElementById(botId).innerText = "AI không phản hồi.";
            }

        } catch (error) {
            document.getElementById(botId).innerText = "Lỗi: " + error.message;
        }
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function appendMsg(t, s, id = "") {
        const d = document.createElement('div');
        if (id) d.id = id;
        d.className = `msg ${s}`;
        d.innerText = t;
        chatBody.appendChild(d);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    if(btnSend) btnSend.onclick = handleChat;
    if(chatInput) chatInput.onkeypress = (e) => { if (e.key === "Enter") handleChat(); };
});

// --- CODE CŨ: HÀM BẢO VỆ ---
const loginModal = document.getElementById('login-modal');
function protectAccess(type, link) {
    if (type === 'tailieu') {
        loginModal.classList.add('active');
    } else {
        window.location.href = link;
    }
}
function closeLoginModal() {
    loginModal.classList.remove('active');
}
