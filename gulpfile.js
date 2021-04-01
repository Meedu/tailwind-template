const { src, dest, series, parallel } = require('gulp');
const clean = require('gulp-clean');
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')

function pcClear() {
    return src('dist/pc', { read: false, allowEmpty: true })
        .pipe(clean());
}

function pcCss() {
    return src('src/pc/app.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([
            require('tailwindcss'),
            require('autoprefixer'),
            // require('postcss-csso'),
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/pc/'))
}


function pcJs() {
    return src('src/pc/app.js')
        // .pipe(uglify())
        .pipe(dest('dist/pc/'));
}


exports.pc = series(pcClear, parallel(pcJs, pcCss))
exports.default = series(pcClear, parallel(pcJs, pcCss))