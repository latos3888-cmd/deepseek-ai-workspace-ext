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
    
    // Firefox MV3 uses background.scripts instead of service_worker
    const backgroundScript = manifest.background.service_worker;
    delete manifest.background.service_worker;
    manifest.background.scripts = [backgroundScript];
    
    // Remove Chrome-only permissions
    manifest.permissions = manifest.permissions.filter(p => p !== 'sidePanel');
    
    manifest.sidebar_action = {
      default_panel: "src/sidebar/index.html",
      default_title: "DeepSeek Workspace"
    };
    
    manifest.browser_specific_settings = {
      gecko: {
        id: "workspace@deepseek.ai",
        strict_min_version: "109.0"
      }
    };
    // Mandatory for Firefox validation
    manifest.browser_specific_settings.gecko.data_collection_permissions = false;
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
