const fs = require('fs');
const zh = fs.readFileSync('../README-tw.md', 'utf8').match(/^#{1,6}\s+.+$/gm);
const en = fs.readFileSync('../README.md', 'utf8').match(/^#{1,6}\s+.+$/gm);
console.log('ZH:', zh.length, 'EN:', en.length);
for(let i=0; i<Math.max(zh.length, en.length); i++) {
    if (zh[i] !== en[i]) {
        console.log(`Mismatch at ${i}:`);
        console.log(`  ZH: ${zh[i]}`);
        console.log(`  EN: ${en[i]}`);
    }
}
