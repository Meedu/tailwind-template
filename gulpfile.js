const { src, dest, series, parallel } = require('gulp');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');

function clear() {
    return src('dist', { read: false, allowEmpty: true })
        .pipe(clean());
}

function css() {
    const postcss = require('gulp-postcss')
    const sourcemaps = require('gulp-sourcemaps')

    return src('src/app.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([
            require('tailwindcss'),
            require('autoprefixer'),
            // require('postcss-csso'),
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/css'))
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


exports.default = series(clear, parallel(css, pcJs, h5Js))