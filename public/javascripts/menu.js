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
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Menu = __webpack_require__(2);
	
	var _Menu2 = _interopRequireDefault(_Menu);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener('init', function (event) {
	    var page = event.target;
	
	    var selectorOfNavigator = '#navigator';
	    var selectorOfBackButton = '.left ons-back-button';
	    var objectOfModal = {
	        animation: 'fade',
	        animationOptions: { timing: 'ease-in' }
	    };
	
	    if (page.id === 'menu') {
	        new _Menu2.default(page);
	    } else if (page.id === 'change-words') {
	        page.querySelector('#plus-word').addEventListener('click', function () {
	            document.querySelector(selectorOfNavigator).pushPage('change-words-form', { data: { title: 'New word' } });
	        });
	    } else if (page.id === 'change-words-form') {
	        var plusAndMinusOfWordInputs = function plusAndMinusOfWordInputs(selectorOfPlus, selectorOfList, whichLanguage) {
	            this.addPlusEvent = function () {
	                //TODO it is not working correctly in first calling (native)
	                page.querySelector(selectorOfPlus).parentNode.addEventListener('click', this.plus.bind(this), false);
	            };
	
	            this.plus = function () {
	                var numberOfInput = page.querySelectorAll(selectorOfList + ' ons-input').length + 1;
	
	                page.querySelector(selectorOfList).innerHTML += '<div class="input-wrapper">' + '<ons-input modifier="underbar" placeholder="#' + numberOfInput + '" float="" id="' + whichLanguage + '-' + numberOfInput + '">' + '<label class="text-input__container">' + '<input class="text-input text-input--underbar" placeholder="#' + numberOfInput + '">' + '<span class="_helper text-input__label text-input--underbar__label text-input--material__label--active">#' + numberOfInput + '' + '</span>' + '<span class="input-label"></span>' + '</label>' + '</ons-input>' + '<ons-icon icon="ion-minus-round" class="ons-icon ion-minus-round ons-icon--ion"></ons-icon>' + '</div>';
	
	                this.addPlusEvent();
	
	                this.addMinusEvent();
	            };
	
	            this.addMinusEvent = function () {
	                var minusIcons = page.querySelectorAll('.input-wrapper ons-icon'),
	                    numberOfMinusIcons = minusIcons.length;
	
	                for (var index = 0; index < numberOfMinusIcons; index++) {
	                    minusIcons[index].addEventListener('click', this.minus);
	                }
	            };
	
	            this.minus = function (event) {
	                var deletable = event.target.parentNode;
	                deletable.parentNode.removeChild(deletable);
	            };
	
	            this.addPlusEvent();
	        };
	
	        page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
	
	        plusAndMinusOfWordInputs('#native-plus', '#native', 'native');
	        plusAndMinusOfWordInputs('#learnable-plus', '#learnable', 'learnable');
	
	        page.querySelector('#upload-file').addEventListener('change', function (event) {
	            var elem = event.target,
	                files = elem.files;
	            if (files && files.length > 0) {
	                document.querySelector('#file-upload-input').value = files[0].name;
	            }
	        });
	
	        page.querySelector('#save').addEventListener('click', function () {
	            var nativeInputs = page.querySelectorAll(selectorOfNativeList + ' input'),
	                numberOfNativeInputs = nativeInputs.length;
	
	            for (var index = 0; index < numberOfNativeInputs; index++) {
	                console.log(nativeInputs[index].value, index);
	            }
	        });
	    } else if (page.id === 'change-labels') {}
	});
	
	function getAjax(url, callback) {
	    var xobj = new XMLHttpRequest();
	    xobj.overrideMimeType("application/json");
	    xobj.open('GET', url, true);
	    xobj.onreadystatechange = function () {
	        if (xobj.readyState == 4 && xobj.status == "200") {
	            callback(JSON.parse(xobj.responseText));
	        }
	    };
	    xobj.send(null);
	}
	
	function postAjax() {}
	
	(function () {
	    getAjax('/ajax/all-words', function (response) {
	        var changeWordsItems = document.getElementById('change-words-items');
	        for (var index in response) {
	            changeWordsItems.innerHTML += response[index];
	        }
	    });
	})();

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Menu = function Menu(page) {
	    _classCallCheck(this, Menu);
	
	    this.infoOfMainPages = {
	        addWords: { button: '#change-words', urlHash: 'change_words', onsPage: 'change-words' },
	        addLabels: { button: '#change-labels', urlHash: 'change_labels', onsPage: 'change-labels' }
	    };
	
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	        var _loop = function _loop() {
	            var infoOfPage = _step.value;
	
	            page.querySelector(infoOfPage.button).addEventListener('click', function () {
	                document.querySelector(selectorOfNavigator).pushPage(infoOfPage.onsPage);
	                window.location.hash = infoOfPage.urlHash;
	            });
	        };
	
	        for (var _iterator = this.infoOfMainPages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            _loop();
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
	};
	
	exports.default = Menu;

/***/ }
/******/ ]);
//# sourceMappingURL=menu.js.map