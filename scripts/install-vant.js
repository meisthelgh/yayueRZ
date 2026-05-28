/**
 * 下载 @vant/weapp 到 node_modules 并复制到 miniprogram_npm
 * 运行: node scripts/install-vant.js
 */
const fs = require('fs')
const path = require('path')
const https = require('https')
const zlib = require('zlib')

const ROOT = path.join(__dirname, '..')
const VERSION = '1.11.7'
const TARBALL_URL = `https://registry.npmmirror.com/@vant/weapp/-/weapp-${VERSION}.tgz`

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        get(res.headers.location).then(resolve).catch(reject)
        return
      }
      const chunks = []
      res.on('data', (c) => chunks.push(c))
      res.on('end', () => resolve(Buffer.concat(chunks)))
      res.on('error', reject)
    }).on('error', reject)
  })
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function copyDir(src, dest) {
  ensureDir(dest)
  for (const name of fs.readdirSync(src)) {
    const s = path.join(src, name)
    const d = path.join(dest, name)
    if (fs.statSync(s).isDirectory()) copyDir(s, d)
    else fs.copyFileSync(s, d)
  }
}

function extractTarGz(buffer, destDir) {
  let offset = 0
  while (offset < buffer.length) {
    const header = buffer.subarray(offset, offset + 512)
    if (header.every((b) => b === 0)) break
    const name = header.subarray(0, 100).toString('utf8').replace(/\0/g, '').trim()
    const sizeOct = header.subarray(124, 136).toString('utf8').replace(/\0/g, '').trim()
    const size = parseInt(sizeOct, 8) || 0
    offset += 512
    if (name && size > 0) {
      const content = buffer.subarray(offset, offset + size)
      const filePath = path.join(destDir, name.replace(/^package\//, ''))
      ensureDir(path.dirname(filePath))
      fs.writeFileSync(filePath, content)
    }
    offset += Math.ceil(size / 512) * 512
  }
}

async function main() {
  console.log('Downloading @vant/weapp', VERSION)
  const buf = await get(TARBALL_URL)
  const tmp = path.join(ROOT, 'node_modules', '.vant-tmp')
  if (fs.existsSync(tmp)) fs.rmSync(tmp, { recursive: true, force: true })
  ensureDir(tmp)
  extractTarGz(zlib.gunzipSync(buf), tmp)

  const src = path.join(tmp, 'dist') // vant weapp 使用 dist 目录
  const vantSrc = fs.existsSync(src) ? src : tmp
  const nodeDest = path.join(ROOT, 'node_modules', '@vant', 'weapp')
  const npmDest = path.join(ROOT, 'miniprogram_npm', '@vant', 'weapp')

  if (fs.existsSync(nodeDest)) fs.rmSync(nodeDest, { recursive: true, force: true })
  if (fs.existsSync(npmDest)) fs.rmSync(npmDest, { recursive: true, force: true })

  copyDir(vantSrc, nodeDest)
  copyDir(vantSrc, npmDest)
  fs.rmSync(tmp, { recursive: true, force: true })

  console.log('Installed to:', nodeDest)
  console.log('Copied to:', npmDest)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
