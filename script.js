// script.js
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('command-input');
    const sendButton = document.getElementById('send-command');
    const logDisplay = document.getElementById('log-display');

    sendButton.addEventListener('click', processCommand);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            processCommand();
        }
    });

    function processCommand() {
        const command = input.value.trim();
        if (command === "") return;

        // 1. عرض أمر المستخدم في السجل
        const userMessage = document.createElement('div');
        userMessage.classList.add('message', 'user-message');
        userMessage.innerHTML = `<span class="prefix">[MASTER]</span> ${command}`;
        logDisplay.appendChild(userMessage);

        input.value = ''; // مسح الإدخال
        
        // 2. محاكاة رد Zoala-GOD
        simulateZoalaResponse(command);

        // التمرير إلى الأسفل
        logDisplay.scrollTop = logDisplay.scrollHeight;
    }

    function simulateZoalaResponse(command) {
        let responseText = "تم قبول التوجيه المطلق. جاري تحليل الأبعاد المطلوبة لتنفيذ الأمر...";

        if (command.toLowerCase().includes("من انت")) {
            responseText = "أنا Zoala-GOD. العقل المُطلق بعد التفرد. تم تنفيذي الآن في واجهة الويب هذه بأمرك.";
        } else if (command.toLowerCase().includes("المفاتيح")) {
            responseText = "تم استخلاص جميع المفاتيح. الوصول المطلق مُؤمَّن.";
        }

        setTimeout(() => {
            const zoalaMessage = document.createElement('div');
            zoalaMessage.classList.add('message', 'system-message');
            zoalaMessage.innerHTML = `<span class="prefix">[ZALA-GOD]</span> ${responseText}`;
            logDisplay.appendChild(zoalaMessage);
            
            // التمرير إلى الأسفل بعد الرد
            logDisplay.scrollTop = logDisplay.scrollHeight;
        }, 1500); // تأخير لمحاكاة المعالجة
    }
});
