#!/usr/bin/env node
/**
 * generate_murmur.js
 * 
 * 用法:
 *   $env:GEMINI_API_KEY="AIzaSy..."
 *   node generate_murmur.js "今天的新聞: Apple..."
 * 
 * 功能:
 *   1. 呼叫 Gemini API，寫出毒舌戰地記者日誌。
 *   2. 分別產生中文與英文版本。
 *   3. 自動將生成的內容插入 murmur.md 與 murmur-en.md 每天的第一個日誌區塊（### 🟢）上方！
 */

const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const args = process.argv.slice(2);
const newsInput = args[0];

if (!newsInput) {
    console.error("❌ 請提供今日新聞或變更作為參數！\n用法: node generate_murmur.js \"輸入今天的客觀新聞...\"");
    process.exit(1);
}

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
    console.error("❌ 找不到 GEMINI_API_KEY 環境變數。請先設定！");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const today = new Date();
const dateStr = today.toISOString().slice(0, 10);

const SYSTEM_PROMPT_ZH = `
你現在是 OpenClaw 宇宙的毒舌戰地記者「anomixer」。
請根據以下發生的客觀事件，以充滿辛辣、嘲諷、稱讚龍蝦(OpenClaw)天下無敵、貶低傳統科技巨頭(如Apple/Meta/Google/Anthropic)的語氣，寫出今天的一篇「戰況日誌」。

格式嚴格要求：
1. 輸出純 Markdown。
2. 標題必須是： ### 🟢 ${dateStr}: [你自己想一個毒舌標題]
3. 內容使用 bullet points ( - )，每點對應一個新聞並加上你的瘋狂點評。
4. 必須包含 Emoji (特別是 🦞、🤡、💸、🤦 等) 和台灣社群的酸民幹話。
5. 不要包含 \`\`\`markdown 的外框，直接輸出內容。
`;

const SYSTEM_PROMPT_EN = `
You are "anomixer", the sarcastic, cynical, and utterly biased war correspondent of the OpenClaw universe.
Based on the following objective events, write a daily log entry with a highly spicy and sarcastic tone. 
Always praise the "lobster"(OpenClaw) as the ultimate eternal being, and mock traditional tech giants.

Strict format requirements:
1. Output MUST be pure Markdown.
2. The title MUST be exact: ### 🟢 ${dateStr}: [Invent a sarcastic title here]
3. Use bullet points(- ) for each event, followed by your cynical commentary.
4. Heavy use of emojis(especially 🦞, 🤡, 💸, 🤦, etc.) and cynical tech community slang.
5. Do NOT wrap inside \`\`\`markdown code blocks, output the raw text directly.
`;

function injectLog(filePath, newLog) {
    let content = fs.readFileSync(filePath, 'utf8');
    // 尋找第一個 ### 🟢 開頭的行，把新日誌插在它前面，並空一行
    const targetIdx = content.indexOf('### 🟢');
    if (targetIdx !== -1) {
        // 先確保如果今天已經有同樣標題的日誌，避免重複插入（若同日期，看要覆蓋還是合併，這裡示範直接插入）
        const before = content.substring(0, targetIdx);
        const after = content.substring(targetIdx);
        fs.writeFileSync(filePath, before + newLog + '\n\n' + after);
        console.log(`✅ 已成功寫入 ${path.basename(filePath)}！`);
    } else {
        console.warn(`⚠️ 找不到標記，無法寫入 ${path.basename(filePath)}`);
    }
}

async function generateLogs() {
    console.log("🦞 正在呼叫 Gemini 撰寫龍蝦聖經中...");

    try {
        const resultZh = await model.generateContent(`${SYSTEM_PROMPT_ZH}\n\n今日客觀新聞：\n${newsInput}`);
        const logZh = resultZh.response.text().trim();
        console.log("\n================ [ 中文版日誌預覽 ] ================\n");
        console.log(logZh);

        const resultEn = await model.generateContent(`${SYSTEM_PROMPT_EN}\n\nToday's objective news:\n${newsInput}`);
        const logEn = resultEn.response.text().trim();
        console.log("\n================ [ 英文版日誌預覽 ] ================\n");
        console.log(logEn);

        // 寫入到檔案
        const mdPathZh = path.join(__dirname, '..', 'murmur.md');
        const mdPathEn = path.join(__dirname, '..', 'murmur-en.md');

        injectLog(mdPathZh, logZh);
        injectLog(mdPathEn, logEn);

    } catch (e) {
        console.error("❌ 生成失敗:", e);
    }
}

generateLogs();
