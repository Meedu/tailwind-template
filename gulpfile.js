const { src, dest, series } = require('gulp');
const clean = require('gulp-clean');

function clear() {
    return src('dist', { read: false })
        .pipe(clean());
}

function build() {
    const postcss = require('gulp-postcss')
    const sourcemaps = require('gulp-sourcemaps')

    return src('src/app.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([
            require('tailwindcss'),
            require('autoprefixer')
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/'))
}

exports.default = series(clear, build)