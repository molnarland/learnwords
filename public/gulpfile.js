var gulp = require('gulp'),
    sass = require('gulp-sass'),
    webpack = require('gulp-webpack'),
    babel = require('gulp-babel'),
    notify = require('gulp-notify');

var uglify = require('webpack/lib/optimize/UglifyJsPlugin');

function Paths ()
{
    this.es6Root = './javascripts/es6/';
    this.allJsFile = '/*.js';
    this.output = 'javascripts';

    this.jsIndex = this.es6Root + 'index' + this.allJsFile;
    this.jsMenu = this.es6Root + 'menu' + this.allJsFile;

    this.sass = ['./stylesheets/*.sass'];

    this.changePathForWebpackEntry = function (which)
    {
        return this[which].replace('*', 'index');
    };
    this.getOutputFileName = function (which)
    {
        return this[which].split('/')[3] + '.js';
    }
}


var paths = new Paths();

var webpackObjectMaker = function (task)
{
    return {
        entry: paths.changePathForWebpackEntry(task),
        output: {
            path: __dirname + '/javascripts',
            filename: paths.getOutputFileName(task),
            pathinfo: false
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2017', 'es2016', 'es2015']
                    }
                }
            ]
        },
        plugins: [

        ],
        devtool: 'source-map',
        debug: false
    };
};

var notifyObjectMaker = function (task, error)
{
    if (error)
    {
        return {
            title: task,
            message: error,
            onLast: true,
            emitError: true
        }
    }
    else
    {
        return {
            title: task,
            message: 'Compiled',
            onLast: true,
            emitError: true
        }
    }
};

var taskNames = {
    index: 'jsIndex',
    menu: 'jsMenu',
    sass: 'sass'
};

//running one time
gulp.task(taskNames.index, function ()
{
    gulp.src(paths.jsIndex)
        .pipe(webpack(webpackObjectMaker(taskNames.index), null, function (error, stats)
        {
            if (stats.compilation.errors.length > 0)
            {
                notify(notifyObjectMaker(taskNames.menu, stats.compilation.errors[0].error.error));
            }
        }))
        .pipe(gulp.dest(paths.output))
        .pipe(notify(notifyObjectMaker(taskNames.index)));
});

gulp.task(taskNames.menu, function ()
{
    gulp.src(paths.jsMenu)
        .pipe(webpack(webpackObjectMaker(taskNames.menu), null, function (error, stats)
        {
            if (stats.compilation.errors.length > 0)
            {
                notify(notifyObjectMaker(taskNames.menu, stats.compilation.errors[0].error.error));
            }
        }))
        .pipe(gulp.dest(paths.output))
        .pipe(notify(notifyObjectMaker(taskNames.menu)));
});

gulp.task(taskNames.sass, function ()
{
    gulp.src(paths.sass, {base: './'})
        .pipe(sass({indentedSyntax: true})).on('error', sass.logError)
        .pipe(gulp.dest('./'))
        .pipe(notify(notifyObjectMaker(taskNames.sass)));
});

//watchers
gulp.task('watch-index', ['jsIndex'], function ()
{
    gulp.watch(paths.jsIndex, ['jsIndex']);
});

gulp.task('watch-menu', ['jsMenu'], function ()
{
    gulp.watch(paths.jsMenu, ['jsMenu']);
});

gulp.task('watch-sass', ['sass'], function ()
{
    gulp.watch(paths.sass, ['sass']);
});

//mixed watches
gulp.task('wis', ['watch-index', 'watch-sass']);
gulp.task('wms', ['watch-menu', 'watch-sass']);


gulp.task('default', ['watch-index', 'watch-menu', 'watch-sass']);