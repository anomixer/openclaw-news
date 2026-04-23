const fs = require('fs');
const path = require('path');

function copyAndReplace(src, dest, replacements, isZH) {
    if (!fs.existsSync(src)) {
        console.warn(`Warning: source file ${src} not found`);
        return;
    }
    let content = fs.readFileSync(src, 'utf8');
    for (const [s, r] of Object.entries(replacements)) {
        content = content.replace(new RegExp(s, 'g'), r);
    }
    
    // Language Link Fixes for Web Version
    if (isZH) {
        // --- We are in the ZH site (/tw/...) ---
        // 1. Link to English README (from root index.md)
        if (!dest.includes('docs/')) {
            content = content.replace(/\[English\]\(README\.md\)/g, '[English](../)');
        }
        // 2. Links to English docs (from /tw/docs/XXX/ to /docs/XXX/)
        else {
            content = content.replace(/\[English\]\(([^)]+\.md)\)/g, (match, file) => {
                // Strip -tw if present, though usually it's setup.md or migration-guide.md in the link
                const baseFile = file.replace('-tw.md', '').replace('.md', '');
                return `[English](../../../docs/${baseFile}/)`;
            });
        }
    } else {
        // --- We are in the EN site (/...) ---
        // 1. Link to Chinese README (from root index.md)
        if (!dest.includes('docs/')) {
            content = content.replace(/\[中文版\]\(README-tw\.md\)/g, '[中文版](tw/)');
            content = content.replace(/\[Chinese Version\]\(README-tw\.md\)/g, '[Chinese Version](tw/)');
        }
        // 2. Links to Chinese docs (from /docs/XXX/ to /tw/docs/XXX/)
        else {
            content = content.replace(/\[中文版\]\(([^)]+\.md)\)/g, (match, file) => {
                const baseFile = file.replace('-tw.md', '').replace('.md', '');
                return `[中文版](../../tw/docs/${baseFile}/)`;
            });
            content = content.replace(/\[Chinese Version\]\(([^)]+\.md)\)/g, (match, file) => {
                const baseFile = file.replace('-tw.md', '').replace('.md', '');
                return `[Chinese Version](../../tw/docs/${baseFile}/)`;
            });
        }
    }

    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, content);
}

const zhMaps = {
    'README-tw.md': 'index.md',
    'docs/setup-tw.md': 'docs/setup.md',
    'docs/why-wsl2-tw.md': 'docs/why-wsl2.md',
    'docs/wsl2-guide-tw.md': 'docs/wsl2-guide.md',
    'docs/migration-guide-tw.md': 'docs/migration-guide.md',
    'docs/what-model-tw.md': 'docs/what-model.md'
};

const enMaps = {
    'README.md': 'index.md',
    'docs/setup.md': 'docs/setup.md',
    'docs/why-wsl2.md': 'docs/why-wsl2.md',
    'docs/wsl2-guide.md': 'docs/wsl2-guide.md',
    'docs/migration-guide.md': 'docs/migration-guide.md',
    'docs/what-model.md': 'docs/what-model.md'
};

const zhReplacements = {
    'README-tw\\.md': 'index.md',
    'docs/setup-tw\\.md': 'docs/setup.md',
    'setup-tw\\.md': 'setup.md',
    'why-wsl2-tw\\.md': 'why-wsl2.md',
    'wsl2-guide-tw\\.md': 'wsl2-guide.md',
    'migration-guide-tw\\.md': 'migration-guide.md',
    'what-model-tw\\.md': 'what-model.md'
};

const enReplacements = {
    'README\\.md': 'index.md'
};

fs.mkdirSync('build_docs_zh', { recursive: true });
fs.mkdirSync('build_docs_en', { recursive: true });

// Execute for ZH
for (const [src, dest] of Object.entries(zhMaps)) {
    copyAndReplace(src, 'build_docs_zh/' + dest, zhReplacements, true);
}
if (fs.existsSync('pic')) fs.cpSync('pic', 'build_docs_zh/pic', { recursive: true });
if (fs.existsSync('docs/custom.css')) fs.copyFileSync('docs/custom.css', 'build_docs_zh/custom.css');

// Execute for EN
for (const [src, dest] of Object.entries(enMaps)) {
    copyAndReplace(src, 'build_docs_en/' + dest, enReplacements, false);
}
if (fs.existsSync('pic')) fs.cpSync('pic', 'build_docs_en/pic', { recursive: true });
if (fs.existsSync('docs/custom.css')) fs.copyFileSync('docs/custom.css', 'build_docs_en/custom.css');

console.log('Docs preparation for MKDocs done (ZH and EN folders ready).');
