import assert from 'node:assert/strict'
import fs from 'node:fs'

const root = new URL('..', import.meta.url)
const read = (file) => fs.readFileSync(new URL(file, root), 'utf8')

assert.ok(fs.existsSync(new URL('public/watch-cutout.png', root)), 'the transparent watch cutout must be present')

const scan = read('src/pages/Scan.jsx')
assert.match(scan, /watch-cutout\.png/, 'the scan screen must render the transparent supplied-watch cutout')
assert.doesNotMatch(scan, /Watch3D/, 'the scan screen must not render the generated 3D watch')
assert.match(scan, /drag="x"/, 'the supplied watch image must support horizontal drag')
assert.match(scan, /rotateY/, 'the supplied watch image must tilt in 3D while dragged')
assert.match(scan, /drop-shadow/, 'the supplied watch image must have a depth shadow')

const welcome = read('src/pages/Welcome.jsx')
assert.match(welcome, /pb-24/, 'the welcome screen needs bottom clearance above the fixed tabs')

const returnPage = read('src/pages/Return.jsx')
assert.match(returnPage, /pb-24/, 'the return screen needs bottom clearance above the fixed tabs')

const refundMethod = read('src/pages/RefundMethod.jsx')
assert.match(refundMethod, /pb-24/, 'the refund-method screen needs bottom clearance above the fixed tabs')

const map = read('src/components/GulmargMap.jsx')
assert.match(map, /WHITE_SLOPE_GREEN_MARKERS/, 'green markers must be defined on the snow slope')
assert.match(map, /WHITE_SLOPE_RED_HAZARDS/, 'red markers must be defined on the snow slope')
assert.match(map, /TOP_LEFT_GREEN_MARKER/, 'one green marker must sit above the top red point')
assert.match(map, /WHITE_SLOPE_GREEN_MARKERS\.forEach/, 'the map must render every green marker')
assert.match(map, /WHITE_SLOPE_RED_HAZARDS\.forEach/, 'the map must render every delayed red marker')

console.log('UI contract verified')
