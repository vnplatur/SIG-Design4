/**
 * postbuild.js
 * Creates a .nojekyll file in the out/ directory after every Next.js build.
 * This prevents GitHub Pages from running Jekyll, which would strip _next/ assets.
 */
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'out', '.nojekyll');
fs.writeFileSync(file, '');
console.log('✅ Created out/.nojekyll — GitHub Pages will serve _next/ assets correctly.');
