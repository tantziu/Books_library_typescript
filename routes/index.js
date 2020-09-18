"use strict";
exports.__esModule = true;
exports.index = void 0;
//GET home page
function index(request, response) {
    response.render('index', { title: 'Home' });
}
exports.index = index;
;
