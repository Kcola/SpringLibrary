/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main/resources/src/ts/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main/resources/src/ts/app.ts":
/*!******************************************!*\
  !*** ./src/main/resources/src/ts/app.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nexports.__esModule = true;\r\nvar dashboard_1 = __webpack_require__(/*! ./dashboard */ \"./src/main/resources/src/ts/dashboard.ts\");\r\nwindow.addEventListener('load', function () {\r\n    dashboard_1.dashboard();\r\n});\r\n\n\n//# sourceURL=webpack:///./src/main/resources/src/ts/app.ts?");

/***/ }),

/***/ "./src/main/resources/src/ts/dashboard.ts":
/*!************************************************!*\
  !*** ./src/main/resources/src/ts/dashboard.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nexports.__esModule = true;\r\nfunction dashboard() {\r\n    renderPage(window.location.hash);\r\n    document.getElementById(\"loginForm\")\r\n        .addEventListener(\"submit\", function (e) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            var inputUsername, inputPassword, username, password, credentials, url, response, token;\r\n            return __generator(this, function (_a) {\r\n                switch (_a.label) {\r\n                    case 0:\r\n                        inputUsername = document.getElementById(\"email\");\r\n                        inputPassword = document.getElementById(\"password\");\r\n                        username = inputUsername.value;\r\n                        password = inputPassword.value;\r\n                        credentials = { username: username, password: password };\r\n                        e.preventDefault();\r\n                        e.stopPropagation();\r\n                        url = \"/api/authenticate\";\r\n                        return [4 /*yield*/, fetch(url, {\r\n                                method: 'POST',\r\n                                headers: {\r\n                                    'Content-Type': 'application/json'\r\n                                },\r\n                                body: JSON.stringify(credentials)\r\n                            })];\r\n                    case 1:\r\n                        response = _a.sent();\r\n                        return [4 /*yield*/, response.json()];\r\n                    case 2:\r\n                        token = _a.sent();\r\n                        if (response.status === 200) {\r\n                            sessionStorage.setItem('token', token.jwt);\r\n                            window.location.hash = \"dashboard\";\r\n                        }\r\n                        else {\r\n                            alert(\"Invalid Credentials\");\r\n                        }\r\n                        return [2 /*return*/];\r\n                }\r\n            });\r\n        });\r\n    });\r\n    document.getElementById(\"registerForm\")\r\n        .addEventListener(\"submit\", function (e) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            var register, inputPassword, inputConfirmPassword, inputUsername, inputEmail, inputFirstname, inputLastname, inputCity, inputZipcode, pickState, streetAddress, url, response;\r\n            return __generator(this, function (_a) {\r\n                switch (_a.label) {\r\n                    case 0:\r\n                        e.preventDefault();\r\n                        e.stopPropagation();\r\n                        register = {};\r\n                        inputPassword = document.getElementById(\"registerPassword\");\r\n                        inputConfirmPassword = document.getElementById(\"registerConfirmPassword\");\r\n                        if (inputConfirmPassword.value !== inputPassword.value) {\r\n                            alert(\"Password doesnt match\");\r\n                            return [2 /*return*/];\r\n                        }\r\n                        inputUsername = document.getElementById(\"registerUsername\");\r\n                        inputEmail = document.getElementById(\"registerEmail\");\r\n                        inputFirstname = document.getElementById(\"registerFirstname\");\r\n                        inputLastname = document.getElementById(\"registerLastname\");\r\n                        inputCity = document.getElementById(\"registerCity\");\r\n                        inputZipcode = document.getElementById(\"registerZipcode\");\r\n                        pickState = document.getElementById(\"registerState\");\r\n                        streetAddress = document.getElementById(\"registerStreetAddress\");\r\n                        register.username = inputUsername.value;\r\n                        register.password = inputPassword.value;\r\n                        register.email = inputEmail.value;\r\n                        register.firstname = inputFirstname.value;\r\n                        register.lastname = inputLastname.value;\r\n                        register.zipcode = inputZipcode.value;\r\n                        register.address = streetAddress.value + \", \" + inputCity.value + \", \" + pickState.value + register.zipcode;\r\n                        register.type = \"admin\";\r\n                        url = \"/api/register\";\r\n                        return [4 /*yield*/, fetch(url, {\r\n                                method: 'POST',\r\n                                headers: {\r\n                                    'Content-Type': 'application/json'\r\n                                },\r\n                                body: JSON.stringify(register)\r\n                            })];\r\n                    case 1:\r\n                        response = _a.sent();\r\n                        if (response.status == 200)\r\n                            alert(\"You can now sign in\");\r\n                        else\r\n                            alert(\"Username already exists\");\r\n                        return [2 /*return*/];\r\n                }\r\n            });\r\n        });\r\n    });\r\n    function renderPage(hash) {\r\n        debugger;\r\n        var isAuthenticated = typeof sessionStorage.getItem('token') === \"string\";\r\n        renderLogin(isAuthenticated);\r\n    }\r\n    function renderLogin(isAuthenticated) {\r\n        if (isAuthenticated) {\r\n            document.getElementById(\"login\").classList.add(\"hidden\");\r\n        }\r\n        else {\r\n            window.location.hash = \"login\";\r\n            document.getElementById(\"login\").classList.remove(\"hidden\");\r\n        }\r\n    }\r\n    window.addEventListener(\"hashchange\", function () {\r\n        renderPage(window.location.hash);\r\n    });\r\n}\r\nexports.dashboard = dashboard;\r\n\n\n//# sourceURL=webpack:///./src/main/resources/src/ts/dashboard.ts?");

/***/ })

/******/ });