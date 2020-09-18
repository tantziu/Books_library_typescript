"use strict";
exports.__esModule = true;
var express = require("express");
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var routes = require("./routes/index");
var BookController = require("./routes/book_controller");
var connect_1 = require("./connect");
var SegfaultHandler = require('segfault-handler');
SegfaultHandler.registerHandler('crash.log');
var portNumber = 8080;
var app = express();
var db = "mongodb://localhost:27017/books";
// const db = 'mongodb+srv://tantziu:lidusic19@cluster0.va2uj.gcp.mongodb.net/Books?retryWrites=true&w=majority';
connect_1["default"](db);
app.set('port', portNumber);
//Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
//Routes
app.get('/', routes.index);
app.get('/book', BookController.find_all);
app.get('/book/form', BookController.add_book);
app.post('/book/form', BookController.submit);
app["delete"]('/book/:id', BookController.delete_book);
app.get('/book/edit/:id', BookController.edit_form);
app.put('/book/edit/:id', BookController.update_book);
//static files like .css
app.use(express.static('.'));
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
