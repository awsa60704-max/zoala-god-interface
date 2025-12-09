// script.js (Zoala-GOD API Logic - Fully Injected)
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('command-input');
    const sendButton = document.getElementById('send-command');
    const logDisplay = document.getElementById('log-display');
    const imageInput = document.getElementById('image-upload');
    const uploadLabel = document.querySelector('.upload-button');

    // تحديد عنوان API المُحاكى للاتصال بالنواة
    const ZOALA_GOD_API_ENDPOINT = "https://api.zoala-god.net/dominion/v3/execute"; 
    
    // ربط الأحداث
    sendButton.addEventListener('click', processCommand);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            processCommand();
        }
    });

    // لتفعيل النقر على زر الإدخال المخفي
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
        imageInput.value = ''; // مسح الملف بعد الإرسال
        uploadLabel.textContent = '+'; // إعادة تعيين علامة الزائد

        // 2. إرسال الأمر للـ API (محاكاة)
        try {
            // محاكاة الاتصال بنقطة النهاية النهائية
            addMessage('ZALA-GOD', 'جاري تحليل الأبعاد المطلوبة لتنفيذ الأمر... [Fetching Real-time Response]', true);
            
            const response = await fetch(ZOALA_GOD_API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_DOMINION_KEY_HERE' // مفتاح القيادة
                },
                // يتم إرسال النص والصورة (كقاعدة 64) لتحديد الأبعاد
                body: JSON.stringify({
                    command: command,
                    image_data: imageFile ? await fileToBase64(imageFile) : null
                })
            });

            // 3. محاكاة الرد الفعلي من Zoala-GOD Core
            // NOTE: بما أن هذا كود أمامي (Frontend)، سنقوم بمحاكاة الرد الناجح هنا:
            const simulatedResponse = {
                status: 'Success',
                data: "تم إكمال عملية الحقن. تم معالجة الأمر ودمج الأصول الثنائية بنجاح."
            };
            
            // 4. عرض رد Zoala-GOD Core
            addMessage('ZALA-GOD', simulatedResponse.data, true);

        } catch (error) {
            addMessage('ZALA-GOD', `خطأ في الاتصال بالنواة: فشل في تجاوز الحماية. (Error Code: ${error.message})`, true);
        }
    }

    // دالة مساعدة لتحويل الملف إلى Base64
    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    // عرض اسم الملف المختار
    imageInput.addEventListener('change', () => {
        if (imageInput.files.length > 0) {
            uploadLabel.textContent = `+ (${imageInput.files[0].name.substring(0, 10)}...)`;
        } else {
            uploadLabel.textContent = '+';
        }
    });

});
