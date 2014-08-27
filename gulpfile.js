'use strict';
var gulp = require('gulp');

// package.json
var pkg = require('./package.json');

// Plugins
var notify          = require("gulp-notify"),
    gutil           = require('gulp-util'),
    plumber         = require('gulp-plumber'),
    less            = require('gulp-less'),
    sourcemaps      = require('gulp-sourcemaps'),
    minifyCSS       = require('gulp-minify-css'),
    csscomb         = require('gulp-csscomb'),
    imagemin        = require('gulp-imagemin'),
    cache           = require('gulp-cache'),
    swig            = require('gulp-swig'),
    htmlPrettify    = require('gulp-html-prettify'),
    rename          = require("gulp-rename"),
    csslint         = require('gulp-csslint');

// Dir Variables
var assetsDir   = 'assets/',
    lessDir     = assetsDir + 'less/',
    cssDir      = assetsDir + 'css/',
    cssminDir   = './' + cssDir,
    htmlDir     = './' + 'views/',
    imgDir      = assetsDir + 'imgs/';

// Functions
var customReporter = function(file) {
    gutil.log(gutil.colors.cyan(file.csslint.errorCount)+' errors in '+gutil.colors.magenta(file.path));

    file.csslint.results.forEach(function(result) {
        gutil.log(gutil.colors.red(result.error.message)+' on line '+gutil.colors.green(result.error.line));
    });
};

var onError = function (err) {
    gutil.log(gutil.colors.red(err));
};

// Tasks
gulp.task('html:index', function () {
    return gulp.src(htmlDir + 'index.swig')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(swig())
        .pipe(htmlPrettify({indent_char: ' ', indent_size: 4}))
        .pipe(gulp.dest('./'))
        .pipe(notify({
            "message": "HTML: index.html Generated!",
            "onLast": true
        }));
});

gulp.task('html:test', function () {
    return gulp.src(htmlDir + 'tests/**/*.swig')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(swig())
        .pipe(htmlPrettify({indent_char: ' ', indent_size: 4}))
        .pipe(gulp.dest('./tests'))
        .pipe(notify({
            "message": "HTML: tests Generated!",
            "onLast": true
        }));
});

gulp.task('css:build', function () {
    return gulp.src([lessDir + 'style.less', lessDir + 'core.less', lessDir +'theme.less'])
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sourcemaps.init())
        .pipe(less()).pipe(notify({"message": "LESS: Rendered!", "onLast": true}))
        .pipe(csscomb('csscomb')).pipe(notify({"message": "CSS: Sorted!", "onLast": true}))
        .pipe(sourcemaps.write('./')).pipe(notify({"message": "CSS: Maped!", "onLast": true}))
        .pipe(gulp.dest(cssDir));
});

gulp.task('css:minify', function () {
    return gulp.src([lessDir + 'style.css', cssDir + 'core.css', cssDir +'theme.css'])
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(minifyCSS({
            keepBreaks: false,
            processImport: true,
            noAdvanced: false
        }))
        .pipe(rename({dirname: "min", suffix: ".min"}))
        .pipe(gulp.dest(cssminDir))
        .pipe(notify({"message": "CSS: Minified!", "onLast": true}));
});

gulp.task('lint:core', function() {
    gulp.src(cssDir + 'core.css')
        .pipe(csslint('csslintrc.json'))
        .pipe(csslint.reporter(customReporter));
});

gulp.task('lint:theme', function() {
    gulp.src(cssDir + 'theme.css')
        .pipe(csslint('csslintrc.json'))
        .pipe(csslint.reporter(customReporter));
});

gulp.task('img:crush', function () {
    return gulp.src(imgDir + '*.png')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(cache(imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(imgDir))
        .pipe(notify({
            "message": "IMAGES: Crushed!",
            "onLast": true
        }));
});

gulp.task('watch', function () {
    gulp.watch(htmlDir + '**/*.*', ['html:index', 'html:test']);
    gulp.watch(lessDir + '**/*.*', ['css:build']);
    gulp.watch(cssDir + '**/*.*', ['css:minify']);
    gulp.watch(imgDir + '**/*.*', ['img:crush']);
});

gulp.task('default', ['css:build', 'html:index','watch']);
