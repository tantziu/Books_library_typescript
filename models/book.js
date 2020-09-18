"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true }
});
var Book = mongoose.model('Book', bookSchema);
exports["default"] = Book;
