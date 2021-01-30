const { src, dest, series, parallel } = require('gulp');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')

function pcClear() {
    return src('dist/pc', { read: false, allowEmpty: true })
        .pipe(clean());
}
function h5Clear() {
    return src('dist/h5', { read: false, allowEmpty: true })
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
function h5Css() {
    return src('src/h5/app.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([
            require('tailwindcss'),
            require('autoprefixer'),
            // require('postcss-csso'),
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/h5/'))
}

function pcJs() {
    return src('src/pc/app.js')
        .pipe(uglify())
        .pipe(dest('dist/pc/'));
}

function h5Js() {
    return src('src/h5/app.js')
        .pipe(uglify())
        .pipe(dest('dist/h5'));
}

exports.pc = series(pcClear, parallel(pcJs, pcCss))
exports.h5 = series(h5Clear, parallel(h5Css, h5Js))
exports.default = parallel(series(pcClear, parallel(pcJs, pcCss)), series(h5Clear, parallel(h5Css, h5Js)))