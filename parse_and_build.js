const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

// Extract head (up to </nav>)
const headAndNavMatch = indexHtml.match(/([\s\S]*?)<main>/);
const headAndNav = headAndNavMatch ? headAndNavMatch[1] : '';

// Extract footer and scripts
const footerAndScriptsMatch = indexHtml.match(/<\/main>([\s\S]*)/);
const footerAndScripts = footerAndScriptsMatch ? footerAndScriptsMatch[1] : '';

console.log("Head and Nav length:", headAndNav.length);
console.log("Footer and Scripts length:", footerAndScripts.length);
