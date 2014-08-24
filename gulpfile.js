
var gulp = require('gulp');

// package.json
var pkg = require('./package.json');

// plugins
var fs              = require('fs'),
    notify          = require("gulp-notify"),
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
    clean           = require('gulp-rimraf');


var options     = ['-o2'];

// Dir Variables
var assetsDir   = 'assets/',
    lessDir     = assetsDir + 'less/',
    cssDir      = assetsDir + 'css/',
    cssminDir   = './' + cssDir +'min/',
    htmlDir     = './' + 'views/',
    imgDir      = assetsDir + 'imgs/',
    anyDir      = '**/';

var files       = ['style.less', 'core.less', 'theme.less'];
var cleanArray  = ['./index.html', './tests/**/*.html'];

// Command line option:
var onError = function (err) {
    gutil.log(gutil.colors.red(err));
};

// Tasks
gulp.task('clean', function() {
    var stream      = [];
    if (fs.existsSync('./tests')) {
        for (var i = 0; i < cleanArray.length; i++) {
            stream[i] = gulp.src(cleanArray[i], {read: false})
            .pipe(clean({force : true}))
            .pipe(notify("Clean HTML files!"));
        }

        return stream;
    }
});

gulp.task('index', ['clean'], function() {
    return gulp.src(htmlDir + 'index.swig')
        .pipe(swig())
        .pipe(htmlPrettify({indent_char: ' ', indent_size: 4}))
        .pipe(gulp.dest('./'))
        .pipe(notify("index.html Generated!"));
});

gulp.task('test', function() {
    return gulp.src(htmlDir + 'tests/**/*.swig')
        .pipe(swig())
        .pipe(htmlPrettify({indent_char: ' ', indent_size: 4}))
        .pipe(gulp.dest('./tests'))
        .pipe(notify("test suite Generated!"));
});

gulp.task('build', function () {
    var stream      = [];
    for (var i = 0; i < files.length; i++) {
        stream[i] = gulp.src(lessDir + files[i])
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(notify(files[i] + " Rendered!"))
        .pipe(csscomb(__dirname + 'csscomb.json')).pipe(notify(files[i] + " Sorted!"))
        .pipe(sourcemaps.write('./')).pipe(notify(files[i] + " Mapped!"))
        .pipe(gulp.dest(cssDir))
        .pipe(minifyCSS({
            keepBreaks: false,
            processImport: true,
            noAdvanced: false
        }))
        .pipe(gulp.dest(cssminDir)).pipe(notify(files[i] + " Minified!"));
    }

    return stream;
});

gulp.task('crush', function () {
    // { image optimizer }
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

gulp.task('watch', function() {
    gulp.watch(htmlDir + '**/*.*', ['index', 'test']);
    gulp.watch(lessDir + '**/*.*', ['build']);
    gulp.watch(imgDir + '*.*', ['crush']);
});

gulp.task('default', ['build', 'index', 'test', 'crush', 'watch']);
