var gulp = require('gulp'),
    sass = require('gulp-sass'),
    webpack = require('gulp-webpack'),
    babel = require('gulp-babel'),
    notify = require('gulp-notify'),
    sourcemaps = require('gulp-sourcemaps'),
	UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
	cssUglify = require('gulp-clean-css'),
    util = require('gulp-util'),
	autoprefixer = require('gulp-autoprefixer'),
	deleteFile = require('gulp-delete-file');

function Paths ()
{
    this.es6Root = './assets/javascripts/';
    this.allJsFile = '/**/*.js';
    this.output = 'javascripts';

    this.jsIndex = this.es6Root + 'index' + this.allJsFile;
    this.jsMenu = this.es6Root + 'menu' + this.allJsFile;
    this.jsHeader = this.es6Root + 'header' + this.allJsFile;

    this.sass = ['./assets/stylesheets/**/*.sass'];

    this.changePathForWebpackEntry = function (which)
    {
        var which = this[which].split('/');
        which[4] = which[5].replace('*', 'index');
        delete which[5];
        which = which.join('/');
        which = which.substring(0, which.length - 1);

        return which;
    };
    this.getOutputFileName = function (which)
	{
		return this[which].split('/')[3] + '.js';
	}
}


var paths = new Paths();

var webpackObjectMaker = function (task)
{
    var entry = ['babel-polyfill', paths.changePathForWebpackEntry(task)];

    return {
        entry: entry,
        // entry: './javascripts/es6/unique/index.js',
        // entry: './javascripts/es6/menu/index.js',
        output: {
            path: __dirname + '/javascripts',
            filename: paths.getOutputFileName(task),
            pathinfo: true
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
			(util.env.type === 'production') ? new UglifyJsPlugin() : function(){}
        ],
        devtool: 'source-map',
        debug: false
    };
};

var notifyObjectMaker = function (task)
{
    return {
        title: task,
        message: [
            'Compiled at',
            new Date(),
            '!'
        ].join(' '),
        onLast: true,
        emitError: true
    }

};

var taskNames = {
    index: 'jsIndex',
    menu: 'jsMenu',
    header: 'jsHeader',
    sass: 'sass'
};

//running one time
gulp.task(taskNames.index, function ()
{
	gulp.src(paths.jsIndex)
		.pipe(webpack(webpackObjectMaker(taskNames.index)))
		.pipe(gulp.dest(paths.output));

	// .pipe(notify(notifyObjectMaker(taskNames.index)));
});

gulp.task(taskNames.menu, function ()
{
	gulp.src(paths.jsMenu)
		.pipe(webpack(webpackObjectMaker(taskNames.menu)))
		.pipe(gulp.dest(paths.output));

});

gulp.task(taskNames.header, function ()
{
	gulp.src(paths.jsHeader)
		.pipe(webpack(webpackObjectMaker(taskNames.header)))
		.pipe(gulp.dest(paths.output))

});

gulp.task(taskNames.sass, function ()
{
	if (util.env.type === 'production')
	{
		gulp.src(paths.sass/*, {base: './'}*/)
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(sass({ indentedSyntax: true })).on('error', sass.logError)
			.pipe(autoprefixer({ browsers: 'since 2000' }))
			.pipe(cssUglify({ compatibility: 'ie6' }))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('./stylesheets'));
		// .pipe(notify(notifyObjectMaker(taskNames.sass)));
	}
	else
	{
		gulp.src(paths.sass/*, {base: './'}*/)
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(sass({ indentedSyntax: true })).on('error', sass.logError)
			.pipe(autoprefixer({ browsers: 'since 2000' }))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('./stylesheets'));
	}
});

gulp.task('remove-maps', function ()
{
	gulp.src([
		'./stylesheets/*.map',
		'./javascripts/*.map'
	])
		.pipe(deleteFile({
			reg: /\w*(\-\w{8}\.js){1}$|\w*(\-\w{8}\.css){1}$/,
			deleteMatch: false
		}));

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
    gulp.watch('./assets/stylesheets/**/*.sass', ['sass']);
});

//mixed watches
gulp.task('wis', ['watch-index', 'watch-sass']);
gulp.task('wms', ['watch-menu', 'watch-sass']);


gulp.task('default', ['watch-index', 'watch-menu', 'watch-sass']);