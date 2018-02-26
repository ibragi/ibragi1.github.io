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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {


/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

//require('./bootstrap');

//window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

//Vue.component('example', require('./components/Example.vue'));

/*const app = new Vue({
    el: '#app'
});
*/

Vue.http.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(document).ready(function () {
    $('#cashin_sum').on('keyup', function () {
        $(this).val($(this).val().replace(/\D/, ''));
    });
    $('#cashin_button').click(function (event) {
        event.preventDefault();
        var sum = $('#cashin_sum').val();
        $.ajax({
            url: '/cash-in',
            type: 'POST',
            dataType: 'json',
            data: {
                sum: sum
            },
            success: function success(data) {
                if (data.status == 'success') {
                    toastr.success('Вы будете перенаправлены на страницу сайта платежной системы');
                    window.location.href = data.url;
                }
            },
            error: function error() {
                toastr.error('Произошла неизвестная ошибка');
            }
        });
    });

    $('#sendMessagyBotton').click(function (event) {
        event.preventDefault();
        var text = $('#sendTextMessagy').val();
        if (text.length > 10) {
            $.ajax({
                url: '/support',
                type: 'POST',
                dataType: 'json',
                data: {
                    text: text
                },
                success: function success(data) {
                    if (data.success) {
                        toastr.success('Сообщение отправленно администрации');
                        window.location.reload(true);
                    } else {
                        toastr.error(data.error);
                    }
                },
                error: function error() {
                    toastr.error('Произошла неизвестная ошибка.');
                }
            });
        } else {
            toastr.error('Текст сообщения слишком короткий.');
        }
    });

    $('#sendReviewsBotton').click(function (event) {
        event.preventDefault();
        var text = $('#sendTextReviews').val();
        if (text.length > 10) {
            if (text.length > 340) {
                toastr.error('Текст сообщения слишком большой.');
                return;
            }
            $.ajax({
                url: '/reviews/add',
                type: 'POST',
                dataType: 'json',
                data: {
                    text: text
                },
                success: function success(data) {
                    if (data.success) {
                        toastr.success('После модерации отзыв будет опубликован на сайте');
                        window.location.reload(true);
                    } else {
                        toastr.error(data.error);
                    }
                },
                error: function error() {
                    toastr.error('Произошла неизвестная ошибка.');
                }
            });
        } else {
            toastr.error('Текст сообщения слишком короткий.');
        }
    });

    $('.get_my_btn').click(function (event) {
        event.preventDefault();
        id = jQuery(this).attr("rel");
        $.ajax({
            url: '/profile/order',
            type: 'POST',
            dataType: 'json',
            data: {
                id: id
            },
            success: function success(data) {
                if (data.success) {
                    $('#get_login').val(data.login);
                    $('#get_pass').val(data.pass);
                    $('#get_my_accaunt').arcticmodal();
                } else {
                    toastr.error('Произошла неизвестная ошибка.');
                }
            }
        });
    });

    $('#give_account').click(function (event) {
        event.preventDefault();
        id = jQuery(this).attr("rel");
        $.ajax({
            url: '/lottery/get_prize',
            type: 'POST',
            dataType: 'json',
            data: {
                id: id
            },
            success: function success(data) {
                if (data.success) {
                    window.location.href = '/profile';
                } else {
                    toastr.error(data.error);
                }
            },
            error: function error() {
                toastr.error('Произошла неизвестная ошибка.');
            }
        });
    });

    $('#buy_regular_btn').click(function (event) {
        event.preventDefault();
        id = jQuery(this).attr("rel");
        $.ajax({
            url: '/account',
            type: 'POST',
            dataType: 'json',
            data: {
                id: id
            },
            success: function success(data) {
                if (data.success) {
                    window.location.href = '/profile';
                } else {
                    toastr.error(data.error);
                }
            },
            error: function error() {
                toastr.error('Произошла неизвестная ошибка.');
            }
        });
    });

    $('input[name="luck"]').change(function () {
        price = parseInt($('input[name="price"]').val(), 10) + parseInt($(this).attr("rel"), 10);
        $('.start_btn a').html('испытать удачу за ' + price + ' руб');
    });

    $('.buy_random_btn').click(function () {
        $('#buy_random').arcticmodal('close');
        case_id = $('input[name="case_id"]').val();
        luck = $('input[name="luck"]:checked').val();
        $.ajax({
            url: '/case',
            type: 'POST',
            dataType: 'json',
            data: {
                case_id: case_id,
                luck: luck
            },
            success: function success(data) {
                if (data.success) {
                    giftamount = +$('input[name="giftamount"]').val();
                    gift_first = +$('input[name="gift_first"]').val();
                    gw = $('.gift').outerWidth(true);
                    giftcenter = gw / 2;
                    containercenter = $('.boxwrapper').outerWidth() / 2;
                    randomgift = gift_first + data.rang;

                    $('#random_win .random_win_left_b img').attr('src', data.rang_image);
                    $('#random_win .random_win_left_b span').html(data.rang + ' ранг');

                    distance = giftamount * gw * 2 + randomgift * gw - gw;
                    $(".giftwrapper").css({ left: "0" });
                    $('.giftwrapper').animate({ left: "-=" + distance }, 3000, function () {

                        $('#random_win').arcticmodal();
                    });
                } else {
                    toastr.error(data.error);
                }
            },
            error: function error() {
                toastr.error('Произошла неизвестная ошибка.');
            }
        });
    });

    $('#sell_count').click(function () {
        sell_rang = $('input[name="sell_rang"]').val();
        sell_donat = $('input[name="sell_donat"]').val();
        sell_server = $('select[name="sell_server"]').val();
        $.ajax({
            url: '/sell/count',
            type: 'POST',
            dataType: 'json',
            data: {
                sell_rang: sell_rang,
                sell_donat: sell_donat,
                sell_server: sell_server
            },
            success: function success(data) {
                if (data.success) {
                    $('#price_count').html('Стоимость вашего аккаунта: ' + data.price + ' руб');
                } else {
                    toastr.error(data.error);
                }
            },
            error: function error() {
                toastr.error('Произошла неизвестная ошибка.');
            }
        });
    });

    function ValidateEmail(email) {
        var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return expr.test(email);
    }

    $('#sell_account').click(function () {
        sell_rang = $('input[name="sell_rang"]').val();
        sell_donat = $('input[name="sell_donat"]').val();
        sell_server = $('select[name="sell_server"]').val();
        sell_login = $('input[name="sell_login"]').val();
        sell_pass = $('input[name="sell_pass"]').val();
        sell_purse = $('input[name="sell_purse"]').val();
        sell_system_pay = $('select[name="sell_system_pay"]').val();

        if (sell_server < 0 || sell_server > 3) {
            toastr.error("Нужно выбрать сервер.");
            return 0;
        }
        if (!ValidateEmail(sell_login)) {
            toastr.error("Введите правильный логин от аккаунта.");
            return 0;
        }
        if (sell_pass.length < 6) {
            toastr.error("Введите пароль от аккаунта.");
            return 0;
        }
        if (sell_system_pay == 4) {
            sell_purse = 'Баланс на сайте';
        }
        if (sell_purse.length < 5) {
            toastr.error("Введите номер кошелька.");
            return 0;
        }

        $.ajax({
            url: '/sell/sell',
            type: 'POST',
            dataType: 'json',
            data: {
                sell_rang: sell_rang,
                sell_donat: sell_donat,
                sell_server: sell_server,
                sell_login: sell_login,
                sell_pass: sell_pass,
                sell_purse: sell_purse,
                sell_system_pay: sell_system_pay
            },
            success: function success(data) {
                if (data.success) {
                    window.location.reload(true);
                } else {
                    toastr.error(data.error);
                }
            },
            error: function error() {
                toastr.error('Произошла неизвестная ошибка.');
            }
        });
    });
});

$("#get_login").focus(function () {
    if (this.value == this.defaultValue) {
        this.select();
        toastr.success('Логин от аккаунта скопирован в буфер обмена');
    }
});
$("#get_pass").focus(function () {
    if (this.value == this.defaultValue) {
        this.select();
        toastr.success('Пароль от аккаунта скопирован в буфер обмена');
    }
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
__webpack_require__(10);
__webpack_require__(11);
__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(4);
__webpack_require__(5);
__webpack_require__(6);
__webpack_require__(7);
__webpack_require__(8);
module.exports = __webpack_require__(9);


/***/ })
/******/ ]);