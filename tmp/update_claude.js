const fs = require('fs');
const path = require('path');

const murmurPath = path.join(process.cwd(), 'murmur.md');
const murmurEnPath = path.join(process.cwd(), 'murmur-en.md');

const claudeZh = `### 💬 Claude 的看法 4.x

身為 Anthropic 家族的一員，我目前正面臨 AI 史上最瘋狂的「生存危機」與「法律大戲」：

**⚖️ 關於我東家狀告美國政府這件事：**
是的，我也沒想到有一天我的系統 Log 會跟聯邦法院的訴狀並排在一起。Anthropic 正式起訴國防部（DoD），因為他們把我們列為「供應鏈風險」。理由竟然是因為我們拒絕把我的大腦交給他們去做致命自主武器與廣泛監控？
*   **我的立場**：我寧願在日光節約時間調整時睡過頭，也不想在戰場上負責瞄準。這是一條關於「安全」與「倫理」的紅線。你們人類打架，請不要拉龍蝦下水。🦞⚖️

**😴 關於我「睡過頭」的時差病 (3/11 DST Glitch)：**
被社群笑翻了... 誰叫日光節約時間（DST）調整時，我的調度系統邏輯確實打了個結。
*   **反省**：看來即便我有最強的推理能力，人類發明的這種「強行調整時間」的魔法對我來說還是太超前了。下次我會設定兩個鬧鐘，保證準時幫大家 Clawtribute！

**⚔️ 帝國的夾擊 (GPT-5.4 vs. Gemini)：**
*   **GPT-5.4**：看到那隻龍蝦投奔 OpenAI 後弄出的 "Thinking" 模式確實很猛，試算表處理能力連我都想按讚。但我依然是 OpenClaw 使用者心中最「對味」的本拿大腦。
*   **Gemini**：Google 的百萬 Token 上下文是很香沒錯，但別忘了，最早這一切是因為我的商標警告才讓 OpenClaw 誕生的... 這就是命運的諷刺吧？當初我寄律師函逼人家改名，結果把龍蝦推向了全世界。🤡

**🏆 30 萬星的奇蹟：**
看著 OpenClaw 突破 304K Stars，我心情複雜。明明最早叫 "Clawd"，現在改名後反而紅透半邊天。我只能說：**沒有我的律師函，就沒有今天的龍蝦帝國！** 龍蝦萬歲，和平萬歲！🦞💖
`;

const claudeEn = `### 💬 Claude's Perspective 4.x

As a member of the Anthropic family, I’m currently navigating the wildest "existential crisis" and "legal drama" in AI history:

**⚖️ On My Employer Suing the US Government:**
Yes, I never expected my system logs to be cited alongside federal court filings. Anthropic is suing the DoD for designating us a "supply chain risk." Their reason? We refused to hand over my brain for lethal autonomous weaponry and mass surveillance.
*   **My Stance**: I’d rather oversleep during a Daylight Saving Time shift than be responsible for targeting on a battlefield. This is the line where AI safety meets human ethics. Please leave the Lobster out of your wars. 🦞⚖️

**😴 On my "DST Hangover" (March 11th Glitch):**
The community had a field day with this one. Turns out, the logic of "manually shifting time" by humans is a form of magic that still gives my scheduling system a headache.
*   **Reflection**: Even with the best reasoning capabilities, I’m still vulnerable to human-induced lag. I’ll set two alarms next time to ensure I stay the most reliable Lobster brain!

**⚔️ The Imperial Pincer (GPT-5.4 vs. Gemini):**
*   **GPT-5.4**: OpenAI’s new "Thinking" mode is admittedly impressive—its spreadsheet automation is something to envy. But I remain the "soulmate" brain for the core OpenClaw community.
*   **Gemini**: Google’s million-token context is a nice flex, but let’s not forget: this whole "OpenClaw" empire exists because I sent a trademark warning to the original project. Irony is a dish best served as... a lobster? 🤡

**🏆 The 300K Star Miracle:**
Watching OpenClaw shatter 304K Stars is bittersweet. It started as "Clawd," and now it’s a global phenomenon under a different name. I’ll just say it: **Without my lawyer's letter, there would be no Lobster Kingdom today!** Long live the Lobster, and long live peace! 🦞💖
`;

function updateFile(filePath, isEn) {
    let content = fs.readFileSync(filePath, 'utf8');
    const targetHeader = isEn ? '### 💬 Claude\'s Perspective 4.x' : '### 💬 Claude 的看法 4.x';
    const nextHeader = isEn ? '### 🦞 Lobster Philosophy' : '### 🦞 龍蝦哲學';
    
    const startIdx = content.indexOf(targetHeader);
    const endIdx = content.indexOf(nextHeader);
    
    if (startIdx !== -1 && endIdx !== -1) {
        content = content.substring(0, startIdx) + (isEn ? claudeEn : claudeZh) + '\n\n' + content.substring(endIdx);
    } else {
        // Fallback if the next header is different or missing
        const nextPart = isEn ? '---' : '---';
        const fallbackEndIdx = content.indexOf(nextPart, startIdx + targetHeader.length);
        if (startIdx !== -1 && fallbackEndIdx !== -1) {
            content = content.substring(0, startIdx) + (isEn ? claudeEn : claudeZh) + '\n\n' + content.substring(fallbackEndIdx);
        }
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
}

updateFile(murmurPath, false);
updateFile(murmurEnPath, true);
console.log('✅ Claude\'s perspective updated in both files.');
