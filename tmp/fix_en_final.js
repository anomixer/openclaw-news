const fs = require('fs');
const path = require('path');
const murmurEnPath = path.join(process.cwd(), 'murmur-en.md');

let content = fs.readFileSync(murmurEnPath, 'utf8');

// 1. Milestones
const milestoneTarget = '| **2026/03/10** | **292.1K** | Live fetch update | 🦞 |';
const m11 = '\n| **2026/03/11** | **299.1K** | Beelink "Lobster Red" Mini PC Launch | 300K Countdown! 🚀 |';
const m12 = '\n| **2026/03/12** | **304.1K** | 🏆 300K Milestone Reached! | History in the making! 🚀🦞 |';

if (content.indexOf(m11) === -1) {
    content = content.replace(milestoneTarget, milestoneTarget + m11 + m12);
}

// 2. Ranking Table
content = content.replace(/Current GitHub Stars Ranking \(Updated 2026-03-10\)/, 'Current GitHub Stars Ranking (Updated 2026-03-12)');
content = content.replace(/Surpassed React on 2026-03-03! Live data 03\/10/, 'Surpassed React on 2026-03-03! Live data 03/12');

fs.writeFileSync(murmurEnPath, content, 'utf8');
console.log('✅ English file milestones and ranking fixed.');
