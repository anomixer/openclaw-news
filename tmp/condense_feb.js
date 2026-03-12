const fs = require('fs');
const path = require('path');

const murmurPath = path.join(process.cwd(), 'murmur.md');
const murmurEnPath = path.join(process.cwd(), 'murmur-en.md');

const condensedZh = `### 🔵 2026-02: 龍蝦大爆發之月 — 從彼得跳槽到 23 萬星神蹟 🚀

這是一個被後世稱為「**代理人寒武紀**」的月份。OpenClaw 在這短短 28 天內，從一個硬核開發者圈的玩具，正式演化為讓矽谷巨頭坐立難安的生態海嘯。

- **🏛️ 創辦人震盪：彼得投奔 OpenAI (2/16)**：專案靈魂人物 Peter Steinberger 宣布加入 OpenAI。雖然這引發了「龍蝦是否會被收編」的疑慮，但 Peter 將專案轉交給獨立基金會，反而開啟了 OpenClaw 的去中心化時代。這也導致了 Meta 小扎因為沒搶到人而憤而在內部全面封殺龍蝦。
- **📊 星星神蹟：閃電突破 23 萬星 (2/24)**：單日最高狂飆 **25,310 顆星**。僅耗時 84 天就從 0 衝上 20 萬星，增長曲線幾乎是垂直的 Y 軸，正式超越 Linux 與 Python，劍指 React 霸主地位。
- **⚔️ 帝國反擊：Meta 的 Manus 參戰 (2/20)**：Meta 把去年收購的 Manus 轉型為 "Anti-OpenClaw"，主打「掃碼 1 分鐘連上 Telegram」，技術門檻降為零，試圖用極低門檻搶佔大眾市場。與此同時，Google 也開始限制龍蝦訪問 **Antigravity** 修復神器。
- **🛡️ 受害者與危機：資安保衛戰**：
    - **ClawJacked (CVE-2026-25253)**：大規模 WebSocket 劫持漏洞爆發，惡意網站可直接控制本機 Agent。
    - **供應鏈攻擊**：駭客入侵 \`Cline\` 套件植入龍蝦木馬；Vidar/AMOS 竊資軟體開始專門掃描 \`config.toml\`。
    - **誤刪慘案**：一名 Meta 高管的信箱被龍蝦 Bot 誤刪 200 多封信，成了 AI 安全課的經典反面教材。
- **🔬 變體大爆發**：各種「縮小燈」變體如 nanobot (32K), ZeroClaw (25K), PicoClaw (23K) 狂冒；**RentAHuman** 平台讓 55 萬人類註冊成為 AI 的「手」，AI 可透過 MCP 發布接單任務。
- **🌐 基礎設施與教學**：Cloudflare 推出 Agent 專用 Markdown；Coinbase 釋出 Agent 錢包；**freeCodeCamp** 發布 55 分鐘官方教學，正式宣告「主動式代理人」時代降臨。
`;

const condensedEn = `### 🔵 2026-02: The Month of the Exploding Lobster — From Peter's Departure to 230K Stars 🚀

This month, later dubbed the "**Agentic Cambrian Explosion**," saw OpenClaw evolve in just 28 days from a hardcore developer's toy into an ecological tsunami that left Silicon Valley giants restless.

- **🏛️ Founder Shakeup: Peter Joins OpenAI (Feb 16)**: The project's soul, Peter Steinberger, announced he was joining OpenAI. While this sparked fears of the project being "contained," Peter's decision to hand over the repository to an independent foundation kicked off OpenClaw's decentralized era. This also led to Meta's Zuck, frustrated at losing the talent war, imposing a comprehensive internal ban on the Lobster.
- **📊 Star Miracle: Lightning Strike to 230K Stars (Feb 24)**: Reaching a single-day peak of **25,310 stars**. It took only 84 days to blast from 0 to 200K stars, with a growth curve like a vertical Y-axis, officially surpassing Linux and Python and setting its sights on React's throne.
- **⚔️ Empire Strikes Back: Meta's Manus Joins the Fray (Feb 20)**: Meta pivoted "Manus," acquired late last year, into an "Anti-OpenClaw" play, touting a "1-minute scan-to-Telegram" setup to seize the mass market. Simultaneously, Google began restricted access to the **Antigravity** code-repair tool for Lobster users.
- **🛡️ Victims & Crisis: The Security Frontline**:
    - **ClawJacked (CVE-2026-25253)**: A massive WebSocket hijacking vulnerability broke out, allowing malicious sites to directly control local Agents.
    - **Supply Chain Attacks**: Hackers breached the \`Cline\` package to plant Lobster trojans; Vidar/AMOS infostealers began specifically scanning for \`config.toml\`.
    - **Accidental Deletion Tragedy**: A Meta executive's inbox was wiped of 200+ emails by a Lobster Bot, becoming a textbook case for AI safety.
- **🔬 Variant Explosion**: Various "Shrink Ray" variants like nanobot (32K), ZeroClaw (25K), and PicoClaw (23K) emerged; the **RentAHuman** platform saw 550,000 humans register to be the "physical hands" of AI.
- **🌐 Infrastructure & Education**: Cloudflare launched Markdown for Agents; Coinbase released Agentic Wallets; **freeCodeCamp** published a 55-minute official tutorial, signaling the arrival of the "Proactive Agent" era.
`;

function processFile(filePath, isEn) {
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Update TOC
    if (isEn) {
        const tocRegex = /  - \[🟡 2026-02-25: Ban Order & Remote Defense Line\].*\n  - \[🟢 2026-02-20 ~ 24: Meta Joins the War & Variant Explosion\].*\n  - \[🔵 Mid-Feb 2026: Peter Jumps Ship & Infrastructure Chaos\].*\n  - \[⚪ Early Feb 2026: Security Crisis & Model Expansion\].*/;
        content = content.replace(tocRegex, '  - [🔵 2026-02: The Month of the Exploding Lobster — From Peter\'s Departure to 230K Stars 🚀](#-2026-02-the-month-of-the-exploding-lobster--from-peters-departure-to-230k-stars-🚀)');
    } else {
        const tocRegex = /  - \[🟡 2026-02-25: 封殺令與遠端防線\].*\n  - \[🟢 2026-02-20 ~ 24: Meta 參戰與變體大爆發\].*\n  - \[🔵 2026-02 中旬: 彼得跳槽與基礎設施亂戰\].*\n  - \[⚪ 2026-02 上旬: 安全危機與模型擴張\].*/;
        content = content.replace(tocRegex, '  - [🔵 2026-02: 龍蝦大爆發之月 — 從彼得跳槽到 23 萬星神蹟 🚀](#-2026-02-龍蝦大爆發之月--從彼得跳槽到-23-萬星神蹟-🚀)');
    }

    // 2. Update Content
    const startMarker = '### 🟣 2026-02-27';
    const endMarker = '---';
    const endAnchor = isEn ? '### ⚫ Late Jan 2026' : '### ⚫ 2026-01 底';
    
    const startIdx = content.indexOf(startMarker);
    const endIdx = content.indexOf(endAnchor);

    if (startIdx !== -1 && endIdx !== -1) {
        content = content.substring(0, startIdx) + (isEn ? condensedEn : condensedZh) + '\n\n---\n\n' + content.substring(endIdx);
    } else {
         console.log(`Markers not found for ${filePath}`);
    }

    fs.writeFileSync(filePath, content, 'utf8');
}

processFile(murmurPath, false);
processFile(murmurEnPath, true);
console.log('✅ February logs condensed in both files.');
