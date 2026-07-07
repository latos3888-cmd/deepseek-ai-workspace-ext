const fs = require('fs');
const path = require('path');

const browsers = ['chrome', 'firefox'];

function build(browser) {
  const distDir = path.join(__dirname, `dist/${browser}`);
  if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

  // Copy all files from src to dist
  copyRecursiveSync(path.join(__dirname, 'src'), path.join(distDir, 'src'));
  copyRecursiveSync(path.join(__dirname, 'assets'), path.join(distDir, 'assets'));

  // Handle manifest
  const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'manifest.json'), 'utf8'));
  
  if (browser === 'firefox') {
    // Convert to Firefox format
    delete manifest.side_panel;
    manifest.sidebar_action = {
      default_panel: "src/sidebar/index.html",
      default_title: "DeepSeek Workspace"
    };
    manifest.browser_specific_settings = {
      gecko: {
        id: "workspace@deepseek.ai"
      }
    };
  }

  fs.writeFileSync(path.join(distDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`Build completed for ${browser}`);
}

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest);
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

browsers.forEach(build);
