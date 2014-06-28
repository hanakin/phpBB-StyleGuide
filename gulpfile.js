
var gulp = require('gulp');

// package.json
var pkg = require('./package.json');

// plugins
var notify      = require("gulp-notify"),
    gutil       = require('gulp-util'),
    plumber     = require('gulp-plumber'),
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



// Command line option:
var onError = function (err) {
    gutil.log(gutil.colors.red(err));
};

var onWarning = function (err) {
    gutil.log(gutil.colors.green(err));
};


// Tasks

gulp.task('style', function () {
    return gulp.src(lessDir + 'style.less')
        .pipe(plumber({
            errorHandler: onError
        }))
        // Convert Less
        .pipe(less())
        .pipe(gulp.dest(cssDir)).pipe(notify("Style.less Complete!"))
        .on('error', onWarning);
});

gulp.task('core', function () {
    return gulp.src(lessDir + 'core.less')
        .pipe(plumber({
            errorHandler: onError
        }))
        // Convert Less
        .pipe(less())
        .pipe(gulp.dest(cssDir)).pipe(notify("core.less Complete!"))
        .on('error', onWarning);
});

gulp.task('theme', function () {
    return gulp.src(lessDir + 'theme.less')
        .pipe(plumber({
            errorHandler: onError
        }))
        // Convert Less
        .pipe(less())
        .pipe(gulp.dest(cssDir)).pipe(notify("theme.less Complete!"))
        .on('error', onWarning);
});

gulp.task('prefix', function () {
    return gulp.src(cssDir + '*.css')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(prefix("last 15 version", "> 1%", "Explorer 8", { cascade: true }))
        .pipe(gulp.dest(cssDir)).pipe(notify("Prefixed!"))
        .on('error', onWarning);
});

gulp.task('sort', function () {
    return gulp.src(cssDir + '*.css')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(cssbeautify({
            indent: '  ',
            autosemicolon: true
        }))
        .pipe(gulp.dest(cssDir)).pipe(notify("Reformated!"))
        .on('error', onWarning);
});

gulp.task('space', function () {
    return gulp.src(cssDir + '*.css')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(csscomb())
        .pipe(gulp.dest(cssDir)).pipe(notify("Reformated!"))
        .on('error', onWarning);
});

gulp.task('lint', function () {
    return gulp.src(cssDir + '*.css')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(recess({
            strictPropertyOrder: false
        }))
        .pipe(gulp.dest(cssDir)).pipe(notify("Analyzed!"))
        .on('error', onWarning);
});

gulp.task('minify', function () {
    return gulp.src(cssDir + '*.css')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(minifyCSS({
            keepBreaks: false,
            processImport: true,
            noAdvanced: false
        }))
        .pipe(gulp.dest(cssminDir)).pipe(notify("CSS Minified!"))
        .on('error', onWarning);
});

gulp.task('crush', function () {
    // { image optimizer }
    return gulp.src(imgDir + '*.png')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest(imgDir));
});

gulp.task('watch', function() {
    gulp.watch(lessDir + '**/*.*', ['style', 'core', 'theme']);
    gulp.watch(cssDir + '*.css', ['sort', 'space', 'minify']);
    //gulp.watch(imgDir + '*.*', ['crush']);
});

gulp.task('default', ['style', 'core', 'theme', 'watch']);
