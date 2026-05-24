#!/usr/bin/env node
const https = require('https');
const fs = require('fs');
const path = require('path');

const FILES = [
    path.join(__dirname, '..', 'README-tw.md'),
    path.join(__dirname, '..', 'README.md'),
];

const REPOS = [
    'openclaw/openclaw', 'NVIDIA/NemoClaw', 'open-jarvis/OpenJarvis', 'HKUDS/nanobot', 'VoltAgent/awesome-openclaw-skills',
    'NousResearch/hermes-agent',
    'sipeed/picoclaw', 'zeroclaw-labs/zeroclaw', 'iOfficeAI/AionUi',
    'nanocoai/nanoclaw', 'OthmanAdi/planning-with-files', 'NevaMind-AI/memU',
    'kepano/obsidian-skills', 'cloudflare/moltworker', 'hesamsheikh/awesome-openclaw-usecases',
    'refly-ai/refly', 'MemTensor/MemOS', 'nearai/ironclaw', 'm1heng/clawdbot-feishu',
    'memovai/mimiclaw', 'mnfst/manifest', 'badrisnarayanan/antigravity-claude-proxy',
    'TinyAGI/tinyagi', 'nullclaw/nullclaw', 'EverMind-AI/EverOS', 'moltis-org/moltis',
    'microclaw/microclaw', 'rookiestar28/ComfyUI-OpenClaw', 'qhkm/zeptoclaw',
    'Arvincreator/project-golem', 'FoundDream/miniclawd', 'liteclaw/liteclaw',
    'linuxhsj/openclaw-zero-token',
    'GuLu9527/flashclaw', 'swarmclawai/swarmclaw', 'itc-ou-shigou/winclaw',
    'DmacMcgreg/psibot', 'wende/miniclaw', 'neotaskai/SwiftClaw', 'Lichas/maxclaw',
    'Intent-Lab/VisionClaw', 'xjtulyc/MedgeClaw', 'automateyournetwork/netclaw',
    'miantiao-me/cloud-claw', 'XposeMarket/SmallClaw', 'zofrasca/lightclaw',
    'machinae/awesome-claws',
    // TOP Global Repos
    'codecrafters-io/build-your-own-x', 'sindresorhus/awesome', 'freeCodeCamp/freeCodeCamp',
    'public-apis/public-apis', 'EbookFoundation/free-programming-books',
    'nilbuild/developer-roadmap', 'donnemartin/system-design-primer',
    'openclaw/openclaw', 'facebook/react', 'torvalds/linux',
    'vinta/awesome-python', 'awesome-selfhosted/awesome-selfhosted',
    '996icu/996.ICU', 'practical-tutorials/project-based-learning',
    'jwasham/coding-interview-university'
];

function formatStars(n) {
    if (n >= 1000) {
        const k = n / 1000;
        const rounded = Math.round(k * 10) / 10;
        return rounded % 1 === 0 ? `${rounded.toFixed(0)}K` : `${rounded.toFixed(1)}K`;
    }
    return String(n);
}

function fetchStars(repo) {
    return new Promise((resolve) => {
        let token = process.env.GITHUB_TOKEN;
        if (token === 'github_pat_antigravitydummytoken') {
            token = undefined;
        }
        const req = https.request({
            hostname: 'api.github.com',
            path: `/repos/${repo}`,
            method: 'GET',
            headers: {
                'User-Agent': 'node',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            },
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    try {
                        const stars = JSON.parse(data).stargazers_count;
                        resolve({ repo, stars });
                    } catch (e) {
                        resolve({ repo, stars: null, status: 'JSON_ERROR' });
                    }
                } else {
                    resolve({ repo, stars: null, status: res.statusCode });
                }
            });
        });
        req.on('error', (err) => resolve({ repo, stars: null, status: err.code || 'NET_ERROR' }));
        req.end();
    });
}

function parseStarsNum(str) {
    str = String(str).trim();
    if (str.endsWith('K')) return parseFloat(str) * 1000;
    return parseFloat(str) || 0;
}

async function fetchAllStars() {
    const results = {};
    for (const repo of REPOS) {
        process.stdout.write(`Fetching ${repo}... `);
        const { stars, status } = await fetchStars(repo);
        if (stars !== null) {
            results[repo] = stars;
            console.log(formatStars(stars));
        } else {
            console.log(status ? `skipped (HTTP ${status})` : 'skipped');
        }
    }
    return results;
}

function updateFile(filePath, starsMap) {
    let content = fs.readFileSync(filePath, 'utf8');
    const today = new Date();
    const ts = today.toISOString().slice(0, 10).replace(/-/g, '/'); // 2026/03/08
    const th = today.toISOString().slice(0, 10); // 2026-03-08
    const md = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;

    // 1. Variant table
    content = content.replace(
        /(\| \*\*\[.+?\]\(https:\/\/github\.com\/([^)]+)\)\*\* \| )([0-9.]+K?)([ ]*\|)/g,
        (match, prefix, repo, oldStars, suffix) => {
            const f = Object.keys(starsMap).find(r => r.toLowerCase() === repo.toLowerCase());
            return (f && starsMap[f]) ? prefix + formatStars(starsMap[f]) + suffix : match;
        }
    );
    let lines = content.split('\n');
    let allRows = [], firstIndex = -1, lastIndex = -1;
    for (let i = 0; i < lines.length; i++) {
        if (/^\| \*\*\[.+?\]\(https:\/\/github\.com\/.+?\)\*\* \| [0-9.]+K? \|/.test(lines[i])) {
            if (firstIndex === -1) firstIndex = i;
            allRows.push(lines[i]);
            lastIndex = i;
        }
    }
    if (allRows.length > 0) {
        const sorted = allRows.sort((a, b) => {
            if (a.toLowerCase().includes('openclaw/openclaw')) return -1;
            if (b.toLowerCase().includes('openclaw/openclaw')) return 1;
            return parseStarsNum(b.split('|')[2]) - parseStarsNum(a.split('|')[2]);
        });
        lines.splice(firstIndex, lastIndex - firstIndex + 1, ...sorted);
    }

    // 2. Milestone History
    const ocStars = starsMap['openclaw/openclaw'];
    if (ocStars) {
        const ocF = formatStars(ocStars);
        let hiEnd = -1;
        for (let i = 0; i < lines.length; i++) {
            if (/^\| \*\*\d{4}\/\d{2}\/\d{2}\*\* \|/.test(lines[i])) hiEnd = i;
        }
        if (hiEnd !== -1) {
            let row = lines[hiEnd];
            let m = row.match(/^\| \*\*(\d{4}\/\d{2}\/\d{2})\*\* \|/);
            let lastDate = m ? m[1] : null;

            if (lastDate === ts && (row.includes('即時抓取更新') || row.includes('Live fetch update'))) {
                // If the last row is today's fetch row, update it
                lines[hiEnd] = row.replace(/^\| \*\*\d{4}\/\d{2}\/\d{2}\*\* \| \*\*([0-9.]+K?)\*\* \|/, `| **${ts}** | **${ocF}** |`);
            } else {
                // If the last row is NOT today's fetch row, append a new one
                let newRowDesc = !filePath.includes('-tw') ? "Live fetch update" : "即時抓取更新";
                lines.splice(hiEnd + 1, 0, `| **${ts}** | **${ocF}** | ${newRowDesc} | 🦞 |`);
            }
        }

        // 3. Global Top Ranking
        let tStart = -1, tEnd = -1;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('當前 GitHub Stars 總榜排名') || lines[i].includes('Global GitHub Stars Ranking')) {
                lines[i] = lines[i].replace(/\(\d{4}-\d{2}-\d{2} [^\)]+\)/, `(${th} 更新)`).replace(/\(Updated \d{4}-\d{2}-\d{2}\)/, `(Updated ${th})`);
            }
            if (/^\| 排名 \|/.test(lines[i]) || /^\| Rank \|/.test(lines[i])) tStart = i + 2;
            if (tStart !== -1 && i >= tStart && (lines[i].trim() === '' || lines[i].startsWith('#'))) {
                tEnd = i - 1; break;
            }
        }
        if (tStart !== -1 && tEnd >= tStart) {
            let topRows = [];
            let mapNameRepo = {
                'build-your-own-x': 'codecrafters-io/build-your-own-x',
                'awesome': 'sindresorhus/awesome',
                'FreeCodeCamp': 'freeCodeCamp/freeCodeCamp',
                'freeCodeCamp': 'freeCodeCamp/freeCodeCamp',
                'public-apis': 'public-apis/public-apis',
                'free-programming-books': 'EbookFoundation/free-programming-books',
                'developer-roadmap': 'nilbuild/developer-roadmap',
                'system-design-primer': 'donnemartin/system-design-primer',
                'OpenClaw': 'openclaw/openclaw',
                'React': 'facebook/react',
                'Linux': 'torvalds/linux',
                'awesome-python': 'vinta/awesome-python',
                'awesome-selfhosted': 'awesome-selfhosted/awesome-selfhosted',
                '996.ICU': '996icu/996.ICU',
                'project-based-learning': 'practical-tutorials/project-based-learning',
                'coding-interview-university': 'jwasham/coding-interview-university'
            };
            for (let i = tStart; i <= tEnd; i++) {
                let cols = lines[i].split('|').map(s => s.trim());
                if (cols.length >= 5) {
                    let rawName = cols[2].replace(/\*\*/g, '');
                    let repo = mapNameRepo[rawName];
                    let st = repo && starsMap[repo] ? starsMap[repo] : parseStarsNum(cols[3].replace(/\*\*/g, ''));
                    topRows.push({ nHtml: cols[2], raw: rawName, st: st, desc: cols[4] });
                }
            }
            topRows.sort((a, b) => b.st - a.st);
            let nLines = topRows.map((r, idx) => {
                let oca = r.raw === 'OpenClaw';
                let rankStr = oca ? `**${idx + 1}**` : String(idx + 1);
                let stStr = oca ? `**${formatStars(r.st)}**` : formatStars(r.st);
                let desc = r.desc;
                if (oca) {
                    desc = desc.replace(/\d{1,2}\/\d{1,2} 最新(實測|數據)/, `${md} 最新數據`);
                    desc = desc.replace(/Live data \d{1,2}\/\d{1,2}/, `Live data ${md}`);
                }
                return `| ${rankStr} | ${r.nHtml} | ${stStr} | ${desc} |`;
            });
            lines.splice(tStart, tEnd - tStart + 1, ...nLines);
        }
        content = lines.join('\n').replace(/(🔥 )[0-9.]+K?( Stars)/g, `$1${ocF}$2`);
    }
    return content;
}

(async () => {
    let s = await fetchAllStars();
    for (let f of FILES) { fs.writeFileSync(f, updateFile(f, s)); }
    console.log('✅ Done');
})();
