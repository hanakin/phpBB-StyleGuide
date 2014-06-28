
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

var files   = [
                'style.less',
                'core.less',
                'theme.less'
              ]

// Command line option:
var onError = function (err) {
    gutil.log(gutil.colors.red(err));
};

// Tasks

gulp.task('build', function () {
    for (var i = 0; i < files.length; i++) {
        return gulp.src(lessDir + files[i])
        .pipe(plumber({
            errorHandler: onError
        }))
        // Convert Less
        .pipe(less()).pipe(notify(files[i] + " Rendered!"))
        .pipe(csscomb()).pipe(notify(files[i] + " Sorted!"))
        .pipe(cssbeautify({
            indent: '  ',
            autosemicolon: true
        })).pipe(notify(files[i] + " Spaced!"))
        .pipe(gulp.dest(cssDir))
        .pipe(minifyCSS({
            keepBreaks: false,
            processImport: true,
            noAdvanced: false
        }))
        .pipe(gulp.dest(cssminDir)).pipe(notify(files[i] + " Minified!"));
    }
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
        .pipe(gulp.dest(imgDir)).pipe(notify("Images Crushed!"));
});

gulp.task('watch', function() {
    gulp.watch(lessDir + '**/*.*', ['build']);
    gulp.watch(imgDir + '*.*', ['crush']);
});

gulp.task('default', ['crush', 'build', 'watch']);
