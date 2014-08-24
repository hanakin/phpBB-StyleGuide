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
    clean           = require('gulp-rimraf'),
    rename          = require("gulp-rename");

// Dir Variables
var assetsDir   = 'assets/',
    lessDir     = assetsDir + 'less/',
    cssDir      = assetsDir + 'css/',
    cssminDir   = './' + cssDir,
    htmlDir     = './' + 'views/',
    imgDir      = assetsDir + 'imgs/',
    anyDir      = '**/';

// File Variables
var files       = ['style', 'core', 'theme'];

// Command line option:
var onError = function (err) {
    gutil.log(gutil.colors.red(err));
};

// Tasks
gulp.task('index', function () {
    return gulp.src(htmlDir + 'index.swig')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(swig())
        .pipe(htmlPrettify({indent_char: ' ', indent_size: 4}))
        .pipe(gulp.dest('./'))
        .pipe(notify("index.html Generated!"));
});

gulp.task('test', function () {
    return gulp.src(htmlDir + 'tests/**/*.swig')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(swig())
        .pipe(htmlPrettify({indent_char: ' ', indent_size: 4}))
        .pipe(gulp.dest('./tests'))
        .pipe(notify("test suite Generated!"));
});

gulp.task('minify', function () {
    var stream = [], i;
    for (i = 0; i < files.length; i++) {
        stream[i] = gulp.src(cssDir + files[i] + '.css')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(minifyCSS({
            keepBreaks: false,
            processImport: true,
            noAdvanced: false
        }))
        .pipe(rename({
            dirname: "min",
            suffix: ".min"
        }))
        .pipe(gulp.dest(cssminDir)).pipe(notify(files[i] + ".css Minified!"));
    }

    return stream;
});

gulp.task('less', function () {
    var stream = [], i;
    for (i = 0; i < files.length; i++) {
        stream[i] = gulp.src(lessDir + files[i] + '.less')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(csscomb('csscomb')).pipe(notify(files[i] + ".css Sorted!"))
        .pipe(sourcemaps.write('./')).pipe(notify(files[i] + ".css Mapped!"))
        .pipe(gulp.dest(cssDir)).pipe(notify(files[i] + ".css Rendered!"))
    }

    return stream;
});

gulp.task('crush', function () {
    return gulp.src(imgDir + '*.png')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(cache(imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(imgDir))
        .pipe(notify("Images Crushed!"));
});

gulp.task('watch', function () {
    gulp.watch(htmlDir + '**/*.*', ['index', 'test']);
    gulp.watch(lessDir + '**/*.*', ['less']);
    gulp.watch(cssDir + '*.css', ['minify']);
    gulp.watch(imgDir + '**/*.*', ['crush']);
});

gulp.task('default', ['less', 'index', 'watch']);
