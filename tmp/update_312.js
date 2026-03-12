const fs = require('fs');
const path = require('path');

const murmurPath = path.join(process.cwd(), 'murmur.md');
const murmurEnPath = path.join(process.cwd(), 'murmur-en.md');

const dateStr = '2026-03-12';
const starCount = '304.1K';
const reactStars = '243.9K';
const fccStars = '438.1K';
const gapToFCC = '134K';

const newsLogZh = `### 🟢 2026-03-12: 30 萬星大關達成！API 金鑰劫持案引發「破產危機」警示 🚀🦞

- **🏆 龍蝦登冠 30 萬星里程碑！** OpenClaw 今日正式突破 **304,061 Stars**！僅用 4 個月就達成了 React 花了十年才觸及的高度。這已經不是開源專案，這是一場席捲全球的數位海嘯。🦞✨
- **💸 Gemini API 劫持案：48 小時負債 260 萬台幣！** 震撼科技圈！國外開發團隊因 API 金鑰遭竊，龍蝦後台被惡意刷爆，兩天內帳單衝上 8.2 萬美元。苦主哀號 Google 無預設消費預算上限。這給所有「龍蝦養殖戶」敲響警鐘：**API 安全管理就是你的命根子！**
- **🚨 第一批龍蝦「受害者」現身 (安全底線)**：多家媒體報導，因 VNC 埠裸奔與安裝不明 Skills，已出現多起信用卡盜刷與資料外洩事件。駭客正將 OpenClaw 視為「提款機」，提醒大家務必認準官方商店並開啟 Docker 隔離。
- **🐝 多代理人協作 (Multi-Agent Collaboration) 功能上線**：官方發布重大更新，支援多個龍蝦在共享虛擬環境中協作並擁有持久化記憶。龍蝦不再是孤軍奮戰，現在你可以擁有一支「龍蝦軍團」了。
- **⚖️ Anthropic 起訴案續聞**：法律專家分析，Anthropic 起訴美國政府可能演變成 AI 界的「曼哈頓計畫」隱私保衛戰。龍蝦社群發起募資支持，呼籲「AI 的大腦不應被武裝化」。
`;

const newsLogEn = `### 🟢 2026-03-12: 300K Stars Achieved! API Key Hijacking Sparks "Bankruptcy Warning" 🚀🦞

- **🏆 Landmark 300K Milestone Reached!** OpenClaw officially shattered the **304,061 Stars** mark today! Reaching in 4 months what took React a decade. It's no longer just a project; it's a global digital tsunami. 🦞✨
- **💸 The \$82,000 Bill: Gemini API Key Theft Crash!** A tech team faces bankruptcy after their Gemini API key was stolen and abused, racking up a massive \$82,000 bill (approx. 2.6M TWD) in just 48 hours. This serves as a brutal lesson for all "Lobster Farmers": **API security and spending limits are your lifelines!**
- **🚨 First Wave of "Lobster Victims" (Security Warning)**: Multiple reports confirm credit card fraud and data leaks due to exposed VNC ports and backdoor-infested Skills. Hackers are treating unhardened OpenClaw instances as "ATMs." Stay safe—use official sources and sandboxing!
- **🐝 Multi-Agent Collaboration Feature Released**: A major official update now allows multiple agents to work together in shared virtual environments with persistent memory. You're no longer solo; you can now deploy an entire "Lobster Army."
- **⚖️ Anthropic Lawsuit Headlines**: Legal experts suggest Anthropic's suit against the US Gov could become the "Prism moment" for AI privacy. The community is rallying under the slogan "AI Brains Should Not Be Weaponized."
`;

const tocZh = `  - [🟢 2026-03-12: 30 萬星大關達成！API 金鑰劫持案引發「破產危機」警示 🚀🦞](#-2026-03-12-30-萬星大關達成api-金鑰劫持案引發破產危機警報-🚀🦞)`;
const tocEn = `  - [🟢 2026-03-12: 300K Stars Achieved! API Key Hijacking Sparks "Bankruptcy Warning" 🚀🦞](#-2026-03-12-300k-stars-achieved-api-key-hijacking-sparks-bankruptcy-warning-🚀🦞)`;

function updateFile(filePath, isEn) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Update Date
    content = content.replace(/最後更新\*\*: \d{4}-\d{2}-\d{2}/, `最後更新**: ${dateStr}`);
    content = content.replace(/Last Updated\*\*: \d{4}-\d{2}-\d{2}/, `Last Updated**: ${dateStr}`);

    // Update TL;DR
    if (isEn) {
        content = content.replace(/1\. \*\*Protagonist\*\*: \*\*OpenClaw\*\* \(🔥 .* Stars/, `1. **Protagonist**: **OpenClaw** (🔥 ${starCount} Stars`);
        content = content.replace(/5\. \*\*Latest Crisis\*\*: .*/, `5. **Latest Crisis**: **Gemini API Hijacking**—\$82,000 bill racks up in 48 hours; **GhostClaw** & VNC exposure causing data leaks and credit card fraud locally.`);
        content = content.replace(/6\. \*\*Major Progress\*\*: .*/, `6. **Major Progress**: **300K Stars milestone!**; **Multi-Agent Collaboration** now live; **Tencent QClaw** & **Beelink** hardware entering mass adoption phase.`);
    } else {
        content = content.replace(/1\. \*\*主角\*\*: \*\*OpenClaw\*\* \(🔥 .* Stars/, `1. **主角**: **OpenClaw** (🔥 ${starCount} Stars`);
        content = content.replace(/5\. \*\*最新危機\*\*: .*/, `5. **最新危機**: **Gemini API 劫持案**導致 8.2 萬美金天價帳單；**VNC 埠裸奔**與**惡意 Skills** 造成首批信用卡盜刷受害者現身。`);
        content = content.replace(/6\. \*\*重大進展\*\*：.*/, `6. **重大進展**：**GitHub 30 萬星達成**！**多代理人協作**功能發布；**騰訊 QClaw** 與 **Beelink** 龍蝦紅主機引領硬體化狂潮。`);
    }

    // Update TOC
    const tocTarget = isEn ? 'Daily Battlefield Logs (The Logs)' : '每日戰況日誌 (The Logs)';
    const tocRegex = new RegExp(`- \\*\\*.*${tocTarget.replace('(', '\\(').replace(')', '\\)')}.*\\*\\*`);
    const match = content.match(tocRegex);
    if (match) {
        const insertPos = match.index + match[0].length;
        content = content.substring(0, insertPos) + '\n' + (isEn ? tocEn : tocZh) + content.substring(insertPos);
    }

    // Update Logs
    const logHeader = '### 🟢 2026-03-11';
    const logPos = content.indexOf(logHeader);
    if (logPos !== -1) {
        content = content.substring(0, logPos) + (isEn ? newsLogEn : newsLogZh) + '\n' + content.substring(logPos);
    }

    // Update Stars in table
    content = content.replace(/299\.1K/g, starCount);
    content = content.replace(/138\.9K/g, gapToFCC);

    // Add Milestone
    const milestoneTarget = isEn ? `| **2026/03/11** | **${starCount}** | Beelink "Lobster Red" Mini PC Launch | 300K Countdown! 🚀 |` : `| **2026/03/11** | **${starCount}** | Beelink 龍蝦紅主機與 30 萬關口衝刺 | 300K 倒數！🚀 |`;
    const milestoneEntry = isEn ? `| **2026/03/12** | **${starCount}** | 🏆 300K Milestone Reached! | History in the making! 🚀🦞 |` : `| **2026/03/12** | **${starCount}** | 🏆 突破 30 萬星大關！ | 開源史上的奇蹟 🚀🦞 |`;
    
    if (content.indexOf(milestoneTarget) !== -1) {
        content = content.replace(milestoneTarget, milestoneTarget + '\n' + milestoneEntry);
    }

    // Update Parts 2-5 if needed
    // Security Part
    const ghostClawZh = `- **Gemini API 盜刷慘案 (2026-03-12)**: 第一起大規模因龍蝦配置不當導致的 API 劫持事件，震驚產業界。`;
    const ghostClawEn = `- **Gemini API Hijacking Scandal (2026-03-12)**: The first major financial casualty due to improper OpenClaw configuration and key theft.`;
    const securityTarget = isEn ? '### 🕵️ Infostealers & Exposures' : '### 🕵️ 竊資軟體與實例裸奔 (Infostealers & Exposures)';
    const securityIdx = content.indexOf(securityTarget);
    if (securityIdx !== -1) {
        content = content.substring(0, securityIdx) + (isEn ? ghostClawEn : ghostClawZh) + '\n' + content.substring(securityIdx);
    }

    // Ecosystem Part
    const multiAgentZh = `- **多代理人協作模式 (v2026.3.12)**: 支援 Agent 之間建立共享記憶與協作工作流。`;
    const multiAgentEn = `- **Multi-Agent Collaboration Mode (v2026.3.12)**: Enables shared memory and collaborative workflows between agents.`;
    const ecosystemTarget = isEn ? '### 🏢 Vendors Riding the Hype Wave' : '### 🏢 廠商蹭熱度大賞';
    const ecosystemIdx = content.indexOf(ecosystemTarget);
    if (ecosystemIdx !== -1) {
        const insertPos = content.indexOf('\n', ecosystemIdx) + 1;
        content = content.substring(0, insertPos) + (isEn ? multiAgentEn : multiAgentZh) + '\n' + content.substring(insertPos);
    }

    fs.writeFileSync(filePath, content, 'utf8');
}

updateFile(murmurPath, false);
updateFile(murmurEnPath, true);
console.log('✅ Done updating murmur files for 3/12.');
