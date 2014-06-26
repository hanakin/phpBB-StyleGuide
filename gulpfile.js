
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
var assetsDir = '.assets/',
    lessDir   = assetsDir + 'less/',
    cssDir    = assetsDir + 'css/',
    cssminDir = assetsDir + cssDir +'min/',
    imgDir    = assetsDir + 'imgs/',
    anyDir    = '**/';

gulp.task('build', function () {

    // { Convert Less }
    // build main style.css
    gulp.src(lessDir + 'style.less')
    // Convert Less
    .pipe(less())
    .pipe(gulp.dest(cssDir)).pipe(notify("Style.less Complete!"));
    // build main global.css
    gulp.src(lessDir + 'global.less')
    .pipe(less())
    .pipe(gulp.dest(cssDir)).pipe(notify("Global.less Complete!"));
    // build main core.css
    gulp.src(lessDir + 'core.less')
    .pipe(less())
    .pipe(gulp.dest(cssDir)).pipe(notify("Core.less Complete!"));
    // build main theme.css
    gulp.src(lessDir + 'theme.less')
    .pipe(less())
    .pipe(gulp.dest(cssDir)).pipe(notify("Theme.less Complete!"));

    // { CleanUp CSS Output }
    gulp.src(cssDir + '*.css')
        // Ensure we have all the prefixes
        .pipe(prefix("last 15 version", "> 1%", "ie 8", { cascade: true }))
        // Reformat pretty
        .pipe(cssbeautify({
            indent: '    ',
            autosemicolon: true
        }))
        // convert hard tabs to spaces as well
        .pipe(soften(4))
        // Sort selectors and provide a little more cleanup
        .pipe(csscomb())
        // run linting
        .pipe(recess()).pipe(notify("CSS Linted!"))
        .pipe(gulp.dest(cssDir)).pipe(notify("CSS Reformated!"));

    // { Minify CSS Output }
    gulp.src(cssDir + '*.css')
    .pipe(minifyCSS({
        keepBreaks: false,
        processImport: true,
        noAdvanced: false,
        compatibility: ie8
    }))
    .pipe(gulp.dest(cssminDir)).pipe(notify("CSS Minified!"));

    // { image optimizer }
    gulp.src(imgDir + '*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest(imgDir));
});

// The default task (called when you run `gulp`)
gulp.task('default', function() {
    gulp.run('build');

    // Watch files and run tasks if they change
    gulp.watch(assetsDir + anyDir + '*', function() {
        var date = new Date(), hour = date.getHours(), minutes = date.getMinutes(), seconds = date.getSeconds(),
            buildTime = hour + ':' + minutes + ':' + seconds;

        gulp.run('build');

        console.log('------------- END -------------', buildTime);
    });
});
