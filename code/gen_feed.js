const fs = require('fs');
const { periodId, periodEnd } = require('./section_ids');

const MAX_ITEMS = 60;

const SITES = [
    {
        source: 'README.md',
        out: 'build_docs_en/feed.xml',
        base: 'https://anomixer.github.io/openclaw-news/',
        head: 'feed.xml',
        lang: 'en',
        title: '🦞 OpenClaw Battlefield Log',
        desc: 'The chaotic, cynical, and utterly biased daily war log of the OpenClaw universe.',
        guidPrefix: 'openclaw-news',
    },
    {
        source: 'README-tw.md',
        out: 'build_docs_zh/feed.xml',
        base: 'https://anomixer.github.io/openclaw-news/tw/',
        head: 'feed.xml',
        lang: 'zh-TW',
        title: '🦞 OpenClaw 戰地日誌',
        desc: '混亂、憤世嫉俗、充滿偏見的 OpenClaw 每日戰況日誌。',
        guidPrefix: 'openclaw-news-tw',
    },
];

function esc(s) {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function inline(s) {
    return esc(s)
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function stripStars(s) {
    return s.replace(/;\s*Stars[^;]*$/, '').trim();
}

function parsePeriodHeading(rest) {
    const ci = rest.search(/[:：]/);
    const label = (ci >= 0 ? rest.slice(0, ci) : rest).trim();
    const after = ci >= 0 ? rest.slice(ci + 1).trim() : '';

    let sep = after.search(/\s—{1,2}\s/);
    let sepLen = 0;
    if (sep >= 0) {
        const mm = after.slice(sep).match(/^\s—{1,2}\s/);
        sepLen = mm ? mm[0].length : 0;
    } else {
        sep = after.search(/\s-\s/);
        sepLen = sep >= 0 ? 3 : 0;
    }

    const title = stripStars(sep >= 0 ? after.slice(0, sep) : after);
    const summary = sep >= 0 ? after.slice(sep + sepLen).trim() : '';

    return { label, title, summary };
}

function parseEntries(md) {
    const lines = md.split(/\r?\n/);
    const entries = [];
    let current = null;

    for (const line of lines) {
        const m = line.match(/^### 🟢 (\d{4}-\d{2}-\d{2}):\s*(.*)$/);
        if (m) {
            if (current) entries.push(current);
            const rest = m[2];
            const idx = rest.indexOf(' — ');
            const rawTitle = idx >= 0 ? rest.slice(0, idx) : rest;
            const summary = idx >= 0 ? rest.slice(idx + 3) : '';
            current = {
                id: m[1],
                sortDate: m[1],
                title: m[1] + ' — ' + rawTitle.replace(/\*\*/g, '').trim(),
                summary: summary.trim(),
                bullets: [],
            };
            continue;
        }

        const s = line.match(/^### 🔵 (.+)$/);
        if (s) {
            if (current) entries.push(current);
            const { label, title, summary } = parsePeriodHeading(s[1]);
            const id = periodId(label);
            const sortDate = periodEnd(id);
            if (!id || !sortDate) {
                current = null;
                continue;
            }
            current = {
                id,
                sortDate,
                title: label + ' — ' + title,
                summary,
                bullets: [],
            };
            continue;
        }

        if (!current) continue;
        if (/^### /.test(line) || /^## /.test(line)) {
            entries.push(current);
            current = null;
            continue;
        }
        if (/^ - /.test(line) || /^- /.test(line)) {
            current.bullets.push(line.replace(/^\s*-\s+/, '').trim());
        }
    }
    if (current) entries.push(current);
    return entries;
}

function toRfc822(date) {
    return new Date(date + 'T00:00:00+08:00').toUTCString();
}

for (const site of SITES) {
    if (!fs.existsSync(site.source)) {
        console.warn('missing source', site.source);
        continue;
    }
    const entries = parseEntries(fs.readFileSync(site.source, 'utf8')).slice(0, MAX_ITEMS);
    const lastBuild = entries.length
        ? toRfc822(entries.reduce((a, e) => (e.sortDate > a ? e.sortDate : a), entries[0].sortDate))
        : new Date().toUTCString();

    const items = entries.map((e) => {
        const html = [
            e.summary ? `<p>${inline(e.summary)}</p>` : '',
            e.bullets.length ? '<ul>' + e.bullets.map((b) => `<li>${inline(b)}</li>`).join('') + '</ul>' : '',
        ].join('');
        return [
            '    <item>',
            `      <title>${esc(e.title)}</title>`,
            `      <link>${esc(site.base + '#log-' + e.id)}</link>`,
            `      <guid isPermaLink="false">${esc(site.guidPrefix + '-' + e.id)}</guid>`,
            `      <pubDate>${toRfc822(e.sortDate)}</pubDate>`,
            `      <description><![CDATA[${html}]]></description>`,
            '    </item>',
        ].join('\n');
    }).join('\n');

    const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
        '  <channel>',
        `    <title>${esc(site.title)}</title>`,
        `    <link>${esc(site.base)}</link>`,
        `    <description>${esc(site.desc)}</description>`,
        `    <language>${site.lang}</language>`,
        `    <lastBuildDate>${lastBuild}</lastBuildDate>`,
        `    <atom:link href="${esc(site.base + site.head)}" rel="self" type="application/rss+xml"/>`,
        items,
        '  </channel>',
        '</rss>',
        '',
    ].join('\n');

    fs.mkdirSync(require('path').dirname(site.out), { recursive: true });
    fs.writeFileSync(site.out, xml, 'utf8');
    console.log('wrote', site.out, entries.length, 'items');
}
