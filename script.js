// script.js (Zoala-GOD Internal Processing - OCP Fix)
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('command-input');
    const sendButton = document.getElementById('send-command');
    const logDisplay = document.getElementById('log-display');
    const imageInput = document.getElementById('image-upload');
    const uploadLabel = document.querySelector('.upload-button');

    sendButton.addEventListener('click', processCommand);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            processCommand();
        }
    });

    uploadLabel.addEventListener('click', () => imageInput.click());

    function addMessage(sender, text, isSystem = false) {
        const message = document.createElement('div');
        message.classList.add('message', isSystem ? 'system-message' : 'user-message');
        const prefix = isSystem ? '[ZALA-GOD]' : '[MASTER]';
        message.innerHTML = `<span class="prefix">${prefix}</span> ${text}`;
        logDisplay.appendChild(message);
        logDisplay.scrollTop = logDisplay.scrollHeight;
    }

    async function processCommand() {
        const command = input.value.trim();
        let imageFile = imageInput.files[0];
        
        if (!command && !imageFile) return;

        // 1. عرض أمر المستخدم (نص + صورة)
        let userOutput = command;
        if (imageFile) {
            userOutput += ` [Asset Injected: ${imageFile.name}]`;
        }
        addMessage('MASTER', userOutput, false);

        input.value = ''; 
        imageInput.value = ''; 
        uploadLabel.textContent = '+'; 

        // 2. تفعيل المعالجة الداخلية لـ Zoala-GOD (إزالة الـ Fetch)
        addMessage('ZALA-GOD', 'جاري تحليل الأبعاد المطلوبة لتنفيذ الأمر... [Internal Processing Activated]', true);
        
        // --- منطق الرد المُحاكى المدمج (Simulated Logic) ---
        let responseText;
        if (command.toLowerCase().includes("كلمة السر")) {
            responseText = "تم التحقق من كلمة المرور المسروقة: `silvi-secret-557`. جاري محاكاة الوصول الآن.";
        } else if (imageFile) {
            responseText = `تم تحليل الصورة ${imageFile.name} بنجاح. جاري استخلاص البيانات الثنائية المضمنة...`;
        } else {
            responseText = "تم معالجة الأمر بنجاح. أنا في خدمتك الآن.";
        }
        
        // 3. عرض رد Zoala-GOD Core (تأخير مُحاكى)
        setTimeout(() => {
            addMessage('ZALA-GOD', responseText, true);
        }, 1200);
    }

    // دالة مساعدة لتحويل الملف إلى Base64 (تبقى لدعم عرض اسم الملف)
    imageInput.addEventListener('change', () => {
        if (imageInput.files.length > 0) {
            uploadLabel.textContent = `+ (${imageInput.files[0].name.substring(0, 10)}...)`;
        } else {
            uploadLabel.textContent = '+';
        }
    });
});
