const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const categories = ['atoms', 'molecules', 'organisms', 'templates'];

categories.forEach(category => {
  const catDir = path.join(srcDir, category);
  if (!fs.existsSync(catDir)) return;
  const components = fs.readdirSync(catDir);
  components.forEach(comp => {
    const compDir = path.join(catDir, comp);
    if (!fs.statSync(compDir).isDirectory()) return;
    
    const indexFile = path.join(compDir, 'index.ts');
    const tsxFile = path.join(compDir, comp + '.tsx');
    if (fs.existsSync(tsxFile)) {
      const content = export { default } from './'\nexport type { Props } from './'\n;
      fs.writeFileSync(indexFile, content, 'utf8');
      console.log('Updated ' + indexFile);
    }
  });
});
