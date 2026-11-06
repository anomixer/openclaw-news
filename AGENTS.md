# AGENTS.md — OpenClaw News 每日更新作業規則

本檔為本 repo 的作業規則，優先於一般習慣。每次接到「更新新聞」任務時直接照做，不需要先給 Implementation Plan。

Repo: `https://github.com/anomixer/openclaw-news`（branch `main`，GitHub Pages 自動部署）
雙語檔案：`README-tw.md`（中文）、`README.md`（英文），兩邊內容/數字必須完全一致。

---

## 0. 通用鐵律

- 事實必須可查證、來源正確，**不可唬爛或幻想**。
- 價格／狀態只寫已上線、已落地的既成事實；不寫「預計／estimated」；未確認的募資要標 unconfirmed。
- 新聞新鮮度：只收過去 24 小時；48 小時以內的邊緣新聞可收，但**日期照實標**；更舊的丟掉，不要硬湊。
- **不要用「補漏」框架**。舊料若真的有價值，寫回它自己那天的條目，不要塞進今天。
- 不可與前幾天條目重複。
- 檔案格式：Windows CRLF、UTF-8 無 BOM、0 lone LF / 0 lone CR、檔尾 CRLF。
- 不要用 PowerShell 單行串接一堆指令（`&&`、`;` 皆不可靠），一步一個指令；需要多行 script 時寫到 temp 檔再用 node 跑。
- temp 工作目錄：`C:\Users\USER\AppData\Local\Temp\opencode`

---

## 1. 搜尋今日新聞

優先序固定，不可顛倒：

1. 開源模型新聞（權重釋出、授權、benchmark）
2. AI Agent 新聞（框架、工具、安全、研究）
3. AI 業界大佬新聞（併購、募資、IPO、政策）
4. 最後一則固定是「歷史進度」（星數）

- 每次約 12–16 則。
- 必查 OpenClaw 官方版本與重要修改：
  - https://github.com/openclaw/openclaw/releases
  - https://x.com/openclaw
  - 要分清 npm `latest` / beta 線 / extended-stable LTS。
- 省 token 可用 `https://markdown.new/` 把網頁轉 markdown。
- 重大漏洞／安全警告一定要有；競爭對手動態（Hermes-Agent、CowAgent、其他 claw）要顧。

---

## 2. 更新 GitHub Stars

在 repo 根目錄執行（不要 cd 進 code 再串指令）：

```
node code/update_stars.js
```

需要同步更新的位置：

- header 的「狀態」星數句
- TL;DR 第 1 點、第 5 點
- 星數歷史表：新增當天列
- 排名表：日期 + 前 5 名 + free-programming-books / system-design-primer / React / Linux / Hermes
- 「下一個目標」差距

參考 https://www.star-history.com/openclaw/openclaw

---

## 3. 更新 README-tw.md（中文版）

在「第一部：每日戰況日誌」最上方新增 `### 🟢 YYYY-MM-DD: ...`（最新在最上面，插在昨天標題之前）。

每則格式：

```
- <emoji> **標題（日期）**：內容。農場主：「一句酸文」🦞<同一個 emoji>
```

規則：

- 每則使用**貼合主題的獨立 emoji**，不要全部用 🟠/🔧/🏛️。
- 每則（除進度）都要有農場主酸文，emoji 與該則開頭一致。
- 進度那則固定結尾 `🦞📈`，不加農場主。
- `- ` 前面**不要多一個空格**（英文版本來就沒有）。
- Headline（🟢 標題）用 `[...str].length` 量測，≤160 字。
- TOC 新增一行：`  - 🟢 YYYY-MM-DD: <8~14 字摘要>；Stars ~XXX.XK 🦞🚀`
- 同步更新 header「最後更新」日期。
- 同步改寫 TL;DR 第 1–5 點：
  1. 星數／排名
  2. 資金／拍賣場（IPO、募資、併購）
  3. 開源模型
  4. Agent／安全
  5. 最新進展（含 Hermes 連續領先天數）
- 語氣維持「龍蝦／戰場」諷刺風格；用詞統一「農場主」（不要混用「農夫」）。

---

## 4. 更新第五部「AI互懟」（兩版都要整段換）

角色固定三個：

| 角色 | 立場 | 口頭禪 |
| --- | --- | --- |
| 🌐 Antigravity | Google 編排平台 | 「連 X 都能編排成 Y」 |
| 💬 Claude | 安全守門 | 「守門守到…」 |
| 🤖 GPT-6 的執行官視角 | OpenAI | 「X 歸 X，電表歸電表」＋開亞馬遜氣泡水 |

- 每人 5–8 則（目前固定 8 則）＋一段收尾＋簽名行。
- 氣泡水罐數**每天 +1**，開頭要寫出當前罐數（目前到第 84 罐，下一則第 85 罐）。
- 替換範圍：Antigravity 標題 → 簽名行。
  - TW：`- **🌐 Antigravity 的看法**` → `來自 OpenAI 的誠摯問候`
  - EN：`- **🌐 Antigravity's Perspective**` → `A sincere greeting from OpenAI`
  - **不可包含** `## 第五部` / `## Part 5` 標題，**不可碰到** 第六部。
- 替換後檢查簽名行只出現一次（曾因 replace 腳本重複一行）。

---

## 5. 整理文件結構（旬報，有時間差）

- **旬報時機：該旬結束後 3–4 天才做。**
  - 例：11/1–11/10 上旬 → 約 **11/13–11/14** 才壓成旬報。
  - 判斷依據：旬期已結束 + 至少 3 天，讓漏網新聞有機會補齊再彙總。
- 未到時間就維持每日 `🟢` 條目，**不要提前合併**。
- 旬報格式（放進第一部、依時間排序）：

```
### 🔵 2026-10 下旬 N 條：<標題> — <副標>；Stars 392.7K→393.5K 🦞🚀

- **<emoji> 標題（10/31）**：內容。
```

- 旬報**不放**農場主語錄。
- 壓旬報時同步：
  - 收掉對應的每日 `🟢` 條目
  - TOC：刪掉那幾天各自的 🟢 行，換成一行
    - TW：`  - 🔵 2026-10 下旬 48 條：…；392.7K→393.5K 🦞🚀`
    - EN：`  - 🔵 Late Oct 2026 (48): …`
  - 條數 N 要與實際合併則數一致（含進度那則）。
- 旬報也要進 RSS（`gen_feed.js` 已支援 🔵，id 為 `YYYY-MM-early|mid|late`）。
- 每次順手檢查重複段落／表格（排名表、歷史博物館等），有就合併或刪除。

---

## 6. 同步更新 README.md（英文版）

- 內容、排名、數據與中文版完全一致；用英文版 Farmer 口吻。
- 對應差異：
  - TW `農場主：「…」` → EN `Farmer: "..."`
  - 兩版 bullet 都**不要**前導空格
- 檔尾 CRLF、UTF-8 無 BOM。

---

## 7. 驗證（每次必做）

用 temp 檔寫 node 腳本檢查，不要寫在 PowerShell 雙引號裡（`$`、引號、emoji 會被吃掉）。

檢查項目：

- 兩版行數
- UTF-8 無 BOM
- 0 lone LF、0 lone CR、結尾 CRLF
- 今天／昨天／前天 `### 🟢` 標題各 1 個（splice 曾吃掉舊標題，務必用 `rg -n "^### 🟢"` 再確認）
- 今日 bullet 數正確
- headline 長度 ≤160
- 簡體字掃描，需為 0：
  `点 个 后 网 发 关 为 与 这 说 时 过 现 经 进 产 实 传 东 起 动 还 种 样`
  （`起` 會有誤判，可忽略）
- 第五部：氣泡水罐數正確、簽名行只出現一次、無重複段落

---

## 8. RSS + 部署

repo 根目錄依序執行：

```
node code/build_prep.js
node code/gen_feed.js
```

- `build_prep.js`：同步 docs 到 `build_docs_en` / `build_docs_zh`，並對 `### 🟢` 注入 `{: #log-YYYY-MM-DD }`、對 `### 🔵` 注入 `{: #log-YYYY-MM-late }` 等錨點。
- `gen_feed.js`：產生 `build_docs_en/feed.xml` 與 `build_docs_zh/feed.xml`；同時解析 🟢 與 🔵；`MAX_ITEMS = 60`。
- 用 `python xml.dom.minidom` 驗兩份 XML 可解析。

部署：

```
git add README.md README-tw.md
git commit --amend --no-edit --no-verify
git push --force-with-lease origin main
```

- 走 amend 鏈（維持單一 commit），CI 約 35–60 秒完成。
- 上線驗證一定要帶 cache buster：
  - `https://anomixer.github.io/openclaw-news/feed.xml?v=<rand>`
  - `https://anomixer.github.io/openclaw-news/tw/feed.xml?v=<rand>`
  - 檢查 item 數、含今天日期、含今日新 emoji。
- `gh` CLI 未認證；查 CI 狀態可用 `https://api.github.com/repos/anomixer/openclaw-news/actions/runs?per_page=1`（有 rate limit，被 403 時改看頁面 `Last-Modified`）。

---

## 9. 已知地雷

- **Feedly 以 URL 全域快取 feed 記錄**：退訂再加同一網址不會清 backlog，只會照自己的排程重抓。必要時請使用者改訂 `?v=N` 變體。網站按鈕維持乾淨網址（不要加 `?v=`）。
- feed 頁的「Open raw XML」「Subscribe in Feedly」按鈕需 `target="_blank" rel="noopener"`（新分頁開啟）。
- `write` 工具輸出為 LF-only；讀回 temp 檔時一律 `split(/\r?\n/)`。
- **不要重跑舊日期的 splice 腳本**（`splice1102tw.js`、`splice1103*`、`splice1104.js`、`splice1105.js`、`splice1106.js`、`splice1108.js` 等），會覆蓋後來的手動修正。
- `replaceblock.js` / `p5.js` 可重複使用，但替換範圍是 start..end inclusive，block 需以簽名行結尾。
