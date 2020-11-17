var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefix = require('gulp-autoprefixer'),
    concat = require("gulp-concat"),
    cssmin = require('gulp-minify-css'), //сжатие кода css
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create();

var css_files = [
    './src/css/reset/normalize.css',
    './src/css/fonts/fonts.css',
    './src/scss/main.scss'
    // './src/scss/rappresent.scss',
    // './src/scss/ourcompany.scss',
    // './src/scss/implement.scss',
    // './src/scss/subscribe.scss',
    // './src/scss/download.scss',
    // './src/scss/footer.scss',
    // './src/css/media/media.scss'
];

var js_files = [
    './src/js/index.js'
];


//сборка картинок
function imagess() {
    return gulp.src('./src/img/images/*.*')
        // .pipe(imagemin())
        .pipe(gulp.dest('./assets/images/'))
        //автоперезагрузка страницы
        .pipe(browserSync.stream());
};

function icons() {
    return gulp.src('./src/img/icons/*.*')
        // .pipe(imagemin())
        .pipe(gulp.dest('./assets/icons/'))
        //автоперезагрузка страницы
        .pipe(browserSync.stream());
}


//сборка css
function styless(){
    return gulp.src(css_files)
    .pipe(sass()) // используем gulp-sass
    .pipe(concat('style.css'))
    .pipe(autoprefix())
    // .pipe(cssmin())
    // .pipe(cleanCSS({level: 1}))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
};

//сборка js
function scripts() {
    return gulp.src(js_files)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
}


//чистка каталока
function dell(){
    return del(['assets/*']);
};

//watch
function watchh(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/css/**/*.css', styless)
    gulp.watch('./src/css/**/*.scss', styless)
    gulp.watch('./src/scss/**/*.scss', styless)
    gulp.watch('./src/img/images/*.*', imagess)  
    gulp.watch('./src/img/icons', icons);
    gulp.watch('./src/js/**/*.js', scripts)
    gulp.watch("./*.html").on('change', browserSync.reload);
}

gulp.task('images', imagess);
gulp.task('icons', icons);
gulp.task('styles', styless);
gulp.task('watch', watchh);
gulp.task('del', dell);
gulp.task('scripts', scripts);

gulp.task('build', gulp.series(dell, scripts, imagess, icons,  styless, watchh));