const fs = require('fs');
const path = require('path');

const murmurPath = path.join(process.cwd(), 'murmur.md');
const murmurEnPath = path.join(process.cwd(), 'murmur-en.md');

function fixFiles(filePath, isEn) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Fix 3/11 milestone star count
    if (isEn) {
        content = content.replace(/\| \*\*2026\/03\/11\*\* \| \*\*304\.1K\*\* \| Beelink/, '| **2026/03/11** | **299.1K** | Beelink');
        // Fix 3/11 log star count
        content = content.replace(/- \*\*Sprinting to 300K \(304\.1K Stars\)!/, '- **Sprinting to 300K (299.1K Stars)!');
    } else {
        content = content.replace(/\| \*\*2026\/03\/11\*\* \| \*\*304\.1K\*\* \| Beelink/, '| **2026/03/11** | **299.1K** | Beelink');
        // Fix 3/11 log star count
        content = content.replace(/- \*\*30 萬大關倒數 \(304\.1K\)！/, '- **30 萬大關倒數 (299.1K)！');
        // Fix ranking table header date and note
        content = content.replace(/GitHub Stars 總榜排名 \(2026-03-11 更新\)/, 'GitHub Stars 總榜排名 (2026-03-12 更新)');
        content = content.replace(/超越 React！03\/11 最新數據/, '超越 React！03/12 最新數據');
    }
    
    // Specific for English ranking table which was missed in the broad script
    if (isEn) {
        content = content.replace(/Current GitHub Stars Ranking \(Updated 2026-03-11\)/, 'Current GitHub Stars Ranking (Updated 2026-03-12)');
        content = content.replace(/Surpassed React on 2026-03-03! Live data 03\/11/, 'Surpassed React on 2026-03-03! Live data 03/12');
        // Fix the duplicate 3/10 milestone if any or star count in milestones
        content = content.replace(/\| \*\*2026\/03\/10\*\* \| \*\*304\.1K\*\* \| Live fetch update/, '| **2026/03/10** | **292.1K** | Live fetch update');
    }

    fs.writeFileSync(filePath, content, 'utf8');
}

fixFiles(murmurPath, false);
fixFiles(murmurEnPath, true);
console.log('✅ Specific data fixes applied.');
