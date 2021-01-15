const {src, dest, watch} = require('gulp');
const sass = require('gulp-sass');
const webpack = require('gulp-webpack');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
	const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
	const cssUglify = require('gulp-clean-css');
	const util = require('gulp-util');
	const autoprefixer = require('gulp-autoprefixer');
	const deleteFile = require('gulp-delete-file');

const webpackObjectMaker = function (entry, outputFileName) {
    return {
        entry,
        output: {
            path: __dirname + '/javascripts',
            filename: outputFileName,
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
            (util.env.type === 'production') ? new UglifyJsPlugin() : function () {
            }
        ],
        devtool: 'source-map',
        debug: false
    };
};

function getNotifyObject (task)
{
    return {
        title: task,
        message: [
            'Compiled at',
            new Date().toLocaleTimeString(),
            '!'
        ].join(' '),
        onLast: true,
        emitError: true
    }

}

async function jsIndex () {
    src('./assets/javascripts/index/**/*.js')
    .pipe(webpack(webpackObjectMaker('./assets/javascripts/index/index.js', 'index.js')))
    .pipe(dest('javascripts'))
    .pipe(notify(getNotifyObject('js:index')));
}

async function jsMenu () {
    src('./assets/javascripts/menu/**/*.js')
    .pipe(webpack(webpackObjectMaker('./assets/javascripts/menu/index.js', 'menu.js')))
    .pipe(dest('javascripts'))
    .pipe(notify(getNotifyObject('js:menu')));
}

async function jsHeader () {
    src('./assets/javascripts/header/**/*.js')
    .pipe(webpack(webpackObjectMaker('./assets/javascripts/header/index.js', 'header.js')))
    .pipe(dest('javascripts'))
    .pipe(notify(getNotifyObject('js:header')));
}

async function sassTask () {
    const task = src('./assets/stylesheets/**/*.sass'/*, {base: './'}*/)
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sass({ indentedSyntax: true })).on('error', sass.logError)
    .pipe(autoprefixer({ browsers: 'since 2000' }))

    if (util.env.type === 'production') {
        task
        .pipe(cssUglify({compatibility: 'ie6'}))
    }

      task
			.pipe(sourcemaps.write('./'))
			.pipe(dest('./stylesheets'))
        .pipe(notify(getNotifyObject('sass')));
}

async function removeMaps () {
    src(['./stylesheets/*.map', './javascripts/*.map']).pipe(deleteFile({
			reg: /\w*(-\w{8}\.js)$|\w*(-\w{8}\.css)$/,
			deleteMatch: false
    }))
}

async function watchTasks () {
    watch('./assets/javascripts/index/**/*.js',{ignoreInitial: false}, jsIndex);
    watch('./assets/javascripts/menu/**/*.js',{ignoreInitial: false}, jsMenu);
    watch('./assets/javascripts/header/**/*.js',{ignoreInitial: false}, jsHeader);
    watch('./assets/stylesheets/**/*.sass',{ignoreInitial: false}, sassTask);
}

exports['js:index'] = jsIndex;
exports['js:menu'] = jsMenu;
exports['js:header'] = jsHeader;
exports.sass = sassTask;
exports['remove:maps'] = removeMaps;
exports.default = watchTasks;