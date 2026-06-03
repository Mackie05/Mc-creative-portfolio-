const fs = require('fs');
const path = require('path');

async function downloadFile(url, dest) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  }
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buffer);
  console.log(`Downloaded: ${url} -> ${dest}`);
}

async function main() {
  const repo = 'Mackie05/my-portfolio';
  const branch = 'main';
  const treeUrl = `https://api.github.com/repos/${repo}/git/trees/${branch}?recursive=1`;

  console.log(`Fetching file tree from ${treeUrl}...`);
  const res = await fetch(treeUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Application'
    }
  });

  if (!res.ok) {
    console.error(`Error fetching tree: ${res.statusText}`);
    return;
  }

  const data = await res.json();
  const files = data.tree.filter(item => item.type === 'blob');

  console.log(`Found ${files.length} files. Downloading them to temp_clone/...`);

  for (const file of files) {
    const rawUrl = `https://raw.githubusercontent.com/${repo}/${branch}/${file.path}`;
    const destPath = path.join(__dirname, 'temp_clone', file.path);
    try {
      await downloadFile(rawUrl, destPath);
    } catch (err) {
      console.error(`Failed to download ${file.path}: ${err.message}`);
    }
  }

  console.log('Cloning complete!');
}

main().catch(console.error);
