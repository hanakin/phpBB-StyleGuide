
var gulp = require('gulp');

// package.json
var pkg = require('./package.json');

// plugins
var notify      = require("gulp-notify"),
    less        = require('gulp-less'),
    recess      = require('gulp-recess'),
    prefix      = require('gulp-autoprefixer'),
    soften      = require('gulp-soften'),
    cssbeautify = require('gulp-cssbeautify'),
    minifyCSS   = require('gulp-minify-css'),
    csscomb     = require('gulp-csscomb'),
    imagemin    = require('gulp-imagemin'),
    pngcrush    = require('imagemin-pngcrush');

// Dir Variables
var assetsDir = 'assets/',
    lessDir   = assetsDir + 'less/',
    cssDir    = assetsDir + 'css/',
    cssminDir = './' + cssDir +'min/',
    imgDir    = assetsDir + 'imgs/',
    anyDir    = '**/';

gulp.task('style', function () {
    // { Convert Less }
    // build main style.css
    return gulp.src(lessDir + 'style.less')
        // Convert Less
        .pipe(less())
        .pipe(gulp.dest(cssDir)).pipe(notify("Style.less Complete!"));
});

gulp.task('core', function () {
    // { Convert Less }
    // build main style.css
    return gulp.src(lessDir + 'core.less')
        // Convert Less
        .pipe(less())
        .pipe(gulp.dest(cssDir)).pipe(notify("core.less Complete!"));
});

gulp.task('theme', function () {
    // { Convert Less }
    // build main style.css
    return gulp.src(lessDir + 'theme.less')
        // Convert Less
        .pipe(less())
        .pipe(gulp.dest(cssDir)).pipe(notify("theme.less Complete!"));
});

gulp.task('prefix', function () {
    // { Convert Less }
    // build main style.css
    return gulp.src(cssDir + '*.css')
        // Convert Less
        .pipe(prefix("last 15 version", "> 1%", "Explorer 8", { cascade: true }))
        .pipe(gulp.dest(cssDir)).pipe(notify("Prefixed!"));
});

gulp.task('sort', function () {
    // { Convert Less }
    // build main style.css
    return gulp.src(cssDir + '*.css')
        // Convert Less
        .pipe(cssbeautify({
            indent: '  ',
            autosemicolon: true
        }))
        .pipe(gulp.dest(cssDir)).pipe(notify("Reformated!"));
});

gulp.task('space', function () {
    // { Convert Less }
    // build main style.css
    return gulp.src(cssDir + '*.css')
        // Convert Less
        .pipe(csscomb())
        .pipe(gulp.dest(cssDir)).pipe(notify("Reformated!"));
});

gulp.task('lint', function () {
    // { Convert Less }
    // build main style.css
    return gulp.src(cssDir + '*.css')
        // Convert Less
        .pipe(recess({
            strictPropertyOrder: false
        }))
        .pipe(gulp.dest(cssDir)).pipe(notify("Analyzed!"));
});

gulp.task('minify', function () {
    return gulp.src(cssDir + '*.css')
        .pipe(minifyCSS({
            keepBreaks: false,
            processImport: true,
            noAdvanced: false
        }))
        .pipe(gulp.dest(cssminDir)).pipe(notify("CSS Minified!"));
});

// gulp.task('crush', function () {
//     // { image optimizer }
//     return gulp.src(imgDir + '*.png')
//         .pipe(imagemin({
//             progressive: true,
//             svgoPlugins: [{removeViewBox: false}],
//             use: [{pngcrush}]
//         }))
//         .pipe(gulp.dest(imgDir));
// });

gulp.task('watch', function() {
    gulp.watch(lessDir + '**/*.*', ['style', 'core', 'theme']);
    gulp.watch(cssDir + '*.css', ['sort', 'space', 'minify']);
    //gulp.watch(imgDir + '*.*', ['crush']);
});

gulp.task('default', ['style', 'core', 'theme', 'watch']);
