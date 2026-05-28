/**
 * 生成 tabBar 占位图标（81x81，宜家风格线框）
 * 运行: node scripts/generate-tab-icons.js
 */
const fs = require('fs')
const path = require('path')
const zlib = require('zlib')

const SIZE = 81
const OUT_DIR = path.join(__dirname, '..', 'assets', 'tab')

const COLOR_NORMAL = [118, 118, 118, 255] // #767676
const COLOR_ACTIVE = [0, 88, 163, 255] // #0058a3

function setPixel(buf, x, y, color) {
  if (x < 0 || y < 0 || x >= SIZE || y >= SIZE) return
  const i = (y * SIZE + x) * 4
  buf[i] = color[0]
  buf[i + 1] = color[1]
  buf[i + 2] = color[2]
  buf[i + 3] = color[3]
}

function strokeLine(buf, x0, y0, x1, y1, color, w = 2) {
  const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), 1)
  for (let s = 0; s <= steps; s++) {
    const t = s / steps
    const x = Math.round(x0 + (x1 - x0) * t)
    const y = Math.round(y0 + (y1 - y0) * t)
    for (let dx = -w; dx <= w; dx++) {
      for (let dy = -w; dy <= w; dy++) {
        if (dx * dx + dy * dy <= w * w + 1) setPixel(buf, x + dx, y + dy, color)
      }
    }
  }
}

function strokeRect(buf, x, y, w, h, color, lineW = 2) {
  strokeLine(buf, x, y, x + w, y, color, lineW)
  strokeLine(buf, x + w, y, x + w, y + h, color, lineW)
  strokeLine(buf, x + w, y + h, x, y + h, color, lineW)
  strokeLine(buf, x, y + h, x, y, color, lineW)
}

function strokeCircle(buf, cx, cy, r, color, lineW = 2) {
  const steps = Math.max(48, r * 8)
  let px = null
  let py = null
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2
    const x = Math.round(cx + Math.cos(a) * r)
    const y = Math.round(cy + Math.sin(a) * r)
    if (px !== null) strokeLine(buf, px, py, x, y, color, lineW)
    px = x
    py = y
  }
}

function drawHome(buf, c) {
  strokeLine(buf, 40, 22, 40, 38, c, 2)
  strokeLine(buf, 22, 38, 58, 38, c, 2)
  strokeLine(buf, 22, 38, 40, 22, c, 2)
  strokeLine(buf, 58, 38, 40, 22, c, 2)
  strokeRect(buf, 28, 38, 24, 22, c, 2)
}

function drawCategory(buf, c) {
  strokeCircle(buf, 34, 36, 12, c, 2)
  strokeLine(buf, 43, 45, 54, 56, c, 2)
  strokeLine(buf, 48, 30, 58, 30, c, 2)
  strokeLine(buf, 48, 36, 58, 36, c, 2)
  strokeLine(buf, 48, 42, 58, 42, c, 2)
}

function drawInspiration(buf, c) {
  strokeCircle(buf, 40, 34, 14, c, 2)
  strokeLine(buf, 40, 48, 40, 56, c, 2)
  strokeLine(buf, 34, 56, 46, 56, c, 2)
  for (let i = 0; i < 8; i++) {
    const a = (-Math.PI / 2) + (i / 8) * Math.PI
    const x1 = Math.round(40 + Math.cos(a) * 18)
    const y1 = Math.round(34 + Math.sin(a) * 18)
    const x2 = Math.round(40 + Math.cos(a) * 22)
    const y2 = Math.round(34 + Math.sin(a) * 22)
    strokeLine(buf, x1, y1, x2, y2, c, 1)
  }
}

function drawCart(buf, c) {
  strokeLine(buf, 20, 28, 20, 40, c, 2)
  strokeLine(buf, 20, 28, 26, 28, c, 2)
  strokeLine(buf, 26, 38, 54, 38, c, 2)
  strokeLine(buf, 26, 38, 24, 50, c, 2)
  strokeLine(buf, 54, 38, 52, 50, c, 2)
  strokeLine(buf, 24, 50, 52, 50, c, 2)
  strokeCircle(buf, 32, 56, 4, c, 2)
  strokeCircle(buf, 46, 56, 4, c, 2)
}

function drawProfile(buf, c) {
  strokeCircle(buf, 40, 30, 10, c, 2)
  strokeLine(buf, 24, 58, 40, 46, c, 2)
  strokeLine(buf, 56, 58, 40, 46, c, 2)
  strokeLine(buf, 24, 58, 56, 58, c, 2)
}

const DRAWERS = {
  home: drawHome,
  category: drawCategory,
  inspiration: drawInspiration,
  cart: drawCart,
  profile: drawProfile
}

function createBuffer(drawFn, color) {
  const buf = Buffer.alloc(SIZE * SIZE * 4, 0)
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      setPixel(buf, x, y, [0, 0, 0, 0])
    }
  }
  drawFn(buf, color)
  return buf
}

function encodePng(rgba) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(SIZE, 0)
  ihdr.writeUInt32BE(SIZE, 4)
  ihdr[8] = 8
  ihdr[9] = 6
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0

  const rowSize = 1 + SIZE * 4
  const raw = Buffer.alloc(rowSize * SIZE)
  for (let y = 0; y < SIZE; y++) {
    raw[y * rowSize] = 0
    rgba.copy(raw, y * rowSize + 1, y * SIZE * 4, (y + 1) * SIZE * 4)
  }
  const compressed = zlib.deflateSync(raw, { level: 9 })

  function chunk(type, data) {
    const len = Buffer.alloc(4)
    len.writeUInt32BE(data.length, 0)
    const typeBuf = Buffer.from(type)
    const crcBuf = Buffer.concat([typeBuf, data])
    const crc = Buffer.alloc(4)
    crc.writeUInt32BE(crc32(crcBuf) >>> 0, 0)
    return Buffer.concat([len, typeBuf, data, crc])
  }

  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0))
  ])
}

function crc32(buf) {
  let c = 0xffffffff
  const table = crc32.table || (crc32.table = (() => {
    const t = new Uint32Array(256)
    for (let n = 0; n < 256; n++) {
      let c = n
      for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1)
      t[n] = c >>> 0
    }
    return t
  })())
  for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

for (const [name, drawFn] of Object.entries(DRAWERS)) {
  const normal = encodePng(createBuffer(drawFn, COLOR_NORMAL))
  const active = encodePng(createBuffer(drawFn, COLOR_ACTIVE))
  fs.writeFileSync(path.join(OUT_DIR, `${name}.png`), normal)
  fs.writeFileSync(path.join(OUT_DIR, `${name}-active.png`), active)
  console.log(`wrote ${name}.png, ${name}-active.png`)
}

console.log('Done:', OUT_DIR)
