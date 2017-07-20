var gulp = require('gulp');
var sass = require('gulp-sass');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var ngHtml2Js = require("gulp-ng-html2js");
var minifyHtml = require("gulp-minify-html");
var version = "1.0.0";


gulp.task('html2js', function () {
    return gulp.src("public/html/modules/**/*.html")
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(ngHtml2Js({
            moduleName: "appTemplates"
        }))
        .pipe(concat("template.tpl.js"))
        .pipe(uglify())
        .pipe(gulp.dest('public/components/' + version + '/'));
});
//sass合并,压缩
gulp.task('sass', function () {
    return gulp.src(['public/html/**/*.scss'])
        .pipe(autoprefixer())
        .pipe(sass())
        .pipe(concat("app.css"))
        .pipe(gulp.dest('public/css/' + version + '/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/css/' + version + '/'));
});

gulp.task('less', function () {
    return gulp.src('less/weui.less')
        .pipe(less())
        .pipe(gulp.dest('public/css/utils'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/css/utils'));
});

/*//语法检查
 gulp.task('jshint', function () {
 return gulp.src(['js/!**!/!*.js', 'html/!**!/!*.js'])
 .pipe(jshint())
 .pipe(jshint.reporter('default'));
 });*/

//合并,压缩 app、controllers、Directives、filters
gulp.task('public', function () {
    return gulp.src(['public/js/**/*.js', 'public/html/**/*.js'])      //需要操作的文件
        .pipe(concat('public.js'))    //合并所有js到public.js
        .pipe(gulp.dest('public/components/' + version + '/'))       //输出到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('public/components/' + version + '/'));  //输出
});

gulp.task('watch', function () {
    gulp.watch([['public/js/**/*.js', 'public/html/**/*.js'], 'public/html/modules/**/*.html', 'public/html/**/*.scss', 'less/**/*.less'], ['public', 'html2js', 'sass', 'less']);
});

gulp.task('default', function () {
    // 将你的默认的任务代码放在这
    gulp.start('sass', 'less', 'public', 'html2js', 'watch');
});