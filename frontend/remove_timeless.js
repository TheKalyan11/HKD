const fs = require('fs');
let code = fs.readFileSync('a:\\HKD\\frontend\\src\\app\\gita-life-course\\page.tsx', 'utf8');

// Replace specific instances to avoid the word "timeless" and "timeless wisdom"
code = code.replace(/timeless wisdom/g, 'eternal wisdom');
code = code.replace(/Timeless wisdom/g, 'Eternal wisdom');
code = code.replace(/timeless frameworks/g, 'ancient frameworks');
code = code.replace(/timeless guide/g, 'profound guide');
code = code.replace(/timeless/g, 'eternal');

fs.writeFileSync('a:\\HKD\\frontend\\src\\app\\gita-life-course\\page.tsx', code);
console.log("Removed the word 'timeless'");
