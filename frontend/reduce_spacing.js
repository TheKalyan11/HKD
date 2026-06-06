const fs = require('fs');
let code = fs.readFileSync('a:\\HKD\\frontend\\src\\app\\gita-life-course\\page.tsx', 'utf8');

// Reduce py-28 to py-12
code = code.replace(/py-28/g, 'py-12 lg:py-16');
// Reduce py-32 to py-16
code = code.replace(/py-32/g, 'py-16 lg:py-20');
// Reduce py-20 to py-10
code = code.replace(/py-20/g, 'py-10 lg:py-12');

fs.writeFileSync('a:\\HKD\\frontend\\src\\app\\gita-life-course\\page.tsx', code);
console.log("Reduced padding to remove spacing between sections.");
