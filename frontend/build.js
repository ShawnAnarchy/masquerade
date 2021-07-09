import browserify from 'browserify';
import tsify from 'tsify';
import wasmify from 'wasmify';
import wasmbinify from './wasmbinify.js';
import fs from 'fs';
const bundleFs = fs.createWriteStream('./dist/bundle.js');

browserify()
.add('./src/main.ts')
.plugin(tsify)
.plugin(wasmbinify)
.ignore('worker_threads')
.bundle()
.pipe(bundleFs);