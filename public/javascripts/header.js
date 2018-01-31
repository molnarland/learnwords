/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!********************************************!*\
  !*** ./assets/javascripts/header/index.js ***!
  \********************************************/
/***/ (function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Detector = function () {
		function Detector() {
			_classCallCheck(this, Detector);
	
			this.navigator = window.navigator;
		}
	
		/**
	  * Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
	  *
	  * @return boolean
	  */
	
	
		_createClass(Detector, [{
			key: 'isWindowsPhone',
			value: function isWindowsPhone() {
				return this.navigator.userAgent.indexOf("Windows Phone") >= 0;
			}
	
			/**
	   * Android requires exceptions.
	   *
	   * @return boolean
	   */
	
		}, {
			key: 'isAndroid',
			value: function isAndroid() {
				return this.navigator.userAgent.indexOf('Android') > 0 && !this.isWindowsPhone();
			}
	
			/**
	   * iOS requires exceptions.
	   *
	   * @return boolean
	   */
	
		}, {
			key: 'isIOS',
			value: function isIOS() {
				return (/iP(ad|hone|od)/.test(navigator.userAgent) && !this.isWindowsPhone()
				);
			}
	
			/**
	   * iOS 4 requires an exception for select elements.
	   *
	   * @return boolean
	   */
	
		}, {
			key: 'isIOS4',
			value: function isIOS4() {
				return this.isIOS() && /OS 4_\d(_\d)?/.test(navigator.userAgent);
			}
	
			/**
	   * iOS 6.0-7.* requires the target element to be manually derived
	   *
	   * @return boolean
	   */
	
		}, {
			key: 'isIOSWithBadTarget',
			value: function isIOSWithBadTarget() {
				this.isIOS() && /OS [6-7]_\d/.test(navigator.userAgent);
			}
		}]);
	
		return Detector;
	}();
	
	var detector = new Detector();
	
	setCurrentStyleAndColour();
	checkDeviceForStyle();
	
	function checkDeviceForStyle() {
		var html = document.querySelector('html');
		if (detector.isAndroid()) {
			html.className = 'android';
		} else {
			html.className = 'ios';
		}
	}
	
	function setCurrentStyleAndColour() {
		setCurrentCookie('style', 'light');
		setCurrentCookie('colour', 'blue');
	}
	
	/**
	 * @param {string} cookieName
	 * @param {string} defaultValue
	 * @param {string} [dataset]
	 */
	function setCurrentCookie(cookieName, defaultValue) {
		var dataset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : cookieName;
	
		var html = document.querySelector('html');
	
		var cookie = Cookies.get(cookieName);
		if (cookie) {
			html.dataset[dataset] = cookie;
		} else {
			Cookies.set(cookieName, defaultValue, { expires: 100000 });
			html.dataset[dataset] = defaultValue;
		}
	}

/***/ })
/******/ ]);
//# sourceMappingURL=header.js.map