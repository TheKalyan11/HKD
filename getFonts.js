const https = require('https');
https.get('https://vcm.org.in/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // try to match <link rel="stylesheet" href="..."> and see if it has fonts
    const links = data.match(/href=[\"\']([^\"\']+\.css)[\"\']/g);
    console.log("CSS Links:", links);
    // Let's also look for inline styles
    const inline = data.match(/font-family:[^;]+;/g);
    if(inline) {
       console.log("Inline fonts:", [...new Set(inline)].slice(0, 5));
    }
    // Also look for Google Fonts standard links
    const gfonts = data.match(/fonts\.googleapis\.com[^\"\']+/g);
    console.log("Google Fonts:", gfonts);
  });
});
