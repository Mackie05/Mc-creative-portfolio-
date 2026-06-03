const fs = require('fs');
const path = require('path');

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${srcPath} -> ${destPath}`);
    }
  }
}

try {
  const srcPublic = path.join(__dirname, 'temp_clone', 'public');
  const destPublic = path.join(__dirname, 'public');
  
  if (fs.existsSync(srcPublic)) {
    copyDirRecursive(srcPublic, destPublic);
    console.log('Public assets copied successfully.');
  } else {
    console.warn('Source public directory does not exist.');
  }
} catch (err) {
  console.error('Error copying public files:', err);
}
