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
/*!*****************************************!*\
  !*** ./javascripts/es6/unique/index.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _index = __webpack_require__(/*! ./Framework/index */ 1);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var framework = new _index2.default({
	    pushPage: function pushPage(id, data) {
	        console.log(id);
	    }
	});
	
	console.log(framework);
	framework.navigator.pushPage('menu');
	
	document.querySelector('#foo').addEventListener('click', function () {
	    document.querySelector('#navigator').pushPage('foo');
	
	    document.querySelector('#back').addEventListener('click', function () {
	        document.querySelector('#navigator').popPage();
	    });
	});

/***/ },
/* 1 */
/*!***************************************************!*\
  !*** ./javascripts/es6/unique/Framework/index.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Template = __webpack_require__(/*! ./Template */ 2);
	
	var _Template2 = _interopRequireDefault(_Template);
	
	var _Navigator = __webpack_require__(/*! ./Navigator */ 3);
	
	var _Navigator2 = _interopRequireDefault(_Navigator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// new CustomEvent()
	
	var Framework = function () {
	    /**
	     * @param {function} pushPage
	     */
	    function Framework(_ref) {
	        var pushPage = _ref.pushPage;
	
	        _classCallCheck(this, Framework);
	
	        this.pushPage = pushPage;
	
	        this.validate();
	
	        this.template = new _Template2.default();
	
	        this.navigator = new _Navigator2.default({
	            getTemplate: this.template.get.bind(this.template),
	            pushPageCallback: this.pushPage
	        });
	    }
	
	    _createClass(Framework, [{
	        key: 'validate',
	        value: function validate() {
	            if (!_typeof(this.pushPage) === 'function') {
	                console.warn('pushPage isn\'t function');
	            }
	        }
	    }]);
	
	    return Framework;
	}();
	
	exports.default = Framework;

/***/ },
/* 2 */
/*!******************************************************!*\
  !*** ./javascripts/es6/unique/Framework/Template.js ***!
  \******************************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Template = function () {
	    function Template() {
	        _classCallCheck(this, Template);
	
	        /**
	         * @desc Contains innerHTML and ID of mr-templates
	         * @type {object}
	         */
	        this._values = {};
	
	        this._saveTemplates();
	    }
	
	    /**
	     * @desc From <mr-template> cut and paste innerHTML to this.templates and delete contain of template
	     * @private
	     */
	
	
	    _createClass(Template, [{
	        key: '_saveTemplates',
	        value: function _saveTemplates() {
	            var mrTemplates = document.getElementsByTagName('mr-template');
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = mrTemplates[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var template = _step.value;
	
	                    var id = template.getAttribute('id');
	                    this._values[id] = template.innerHTML;
	
	                    template.innerHTML = '';
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	
	        /**
	         * @param {string} id
	         * @return {HTMLElement|null}
	         */
	
	    }, {
	        key: 'get',
	        value: function get(id) {
	            var value = this._values[id];
	
	            if (!value) {
	                console.warn('Template doesn\'t exist with ' + id + ' id');
	                return null;
	            }
	
	            var helperDiv = document.createElement('div');
	            helperDiv.innerHTML = value;
	
	            return helperDiv.firstChild;
	        }
	    }]);
	
	    return Template;
	}();
	
	exports.default = Template;

/***/ },
/* 3 */
/*!*******************************************************!*\
  !*** ./javascripts/es6/unique/Framework/Navigator.js ***!
  \*******************************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Navigator = function () {
	  /**
	   * @param {function} getTemplate
	   * @param {function} pushPageCallback
	   */
	  function Navigator(_ref) {
	    var getTemplate = _ref.getTemplate,
	        pushPageCallback = _ref.pushPageCallback;
	
	    _classCallCheck(this, Navigator);
	
	    /**
	     * @type {HTMLElement}
	     */
	    this.navigator = document.querySelector('mr-navigator#navigator');
	
	    /**
	     * @type {function}
	     * @private
	     */
	    this._getTemplate = getTemplate;
	    /**
	     * @type {function}
	     * @private
	     */
	    this._pushPageCallback = pushPageCallback;
	
	    this._init();
	  }
	
	  _createClass(Navigator, [{
	    key: '_init',
	    value: function _init() {
	      if (!this.navigator) {
	        throw new ReferenceError('Navigator doesn\'t exist');
	      }
	
	      this.navigator.pushPage = this.pushPage.bind(this);
	      this.navigator.popPage = this.popPage.bind(this);
	    }
	
	    /**
	     * @param {string} id
	     * @param {object} [data]
	     */
	
	  }, {
	    key: 'pushPage',
	    value: function pushPage(id) {
	      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      this.navigator.appendChild(this._getTemplate(id));
	
	      this._pushPageCallback(id, data);
	    }
	
	    /**
	     * @param {object} options
	     */
	
	  }, {
	    key: 'popPage',
	    value: function popPage(options) {
	      this.navigator.removeChild(this.navigator.lastChild);
	    }
	  }]);
	
	  return Navigator;
	}();
	
	exports.default = Navigator;

/***/ }
/******/ ]);
//# sourceMappingURL=unique.js.map