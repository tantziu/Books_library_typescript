"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_book = exports.edit_form = exports.delete_book = exports.submit = exports.find_one = exports.find_all = exports.add_book = void 0;
const book_1 = __importDefault(require("../models/book"));
function add_book(request, response) {
    response.render('form', { title: 'Add Book:' });
}
exports.add_book = add_book;
// GET /book
function find_all(request, response) {
    const books = book_1.default.find({})
        .then((books) => {
        response.render('book', { title: 'Books Inventory', 'books': books });
    })
        .catch((err) => {
        console.log(err);
        return next(err);
    });
}
exports.find_all = find_all;
;
// Get a specific book
function find_one(request, response) {
    book_1.default.findById(request.params.id)
        .then((book) => {
        if (!book) {
            return response.status(404).send({
                message: "Book not found with id " + request.params.id
            });
        }
        console.log(book);
    })
        .catch((err) => {
        if (err.kind === 'ObjectId') {
            return response.status(404).send({
                message: "Book not found with id " + request.params.id
            });
        }
        return response.status(500).send({
            message: "Error retrieving book with id " + request.params.id
        });
    });
}
exports.find_one = find_one;
;
//POST /book
function submit(request, response) {
    const newBook = new book_1.default({
        title: request.body.book_title,
        author: request.body.book_author,
        isbn: request.body.book_isbn
    });
    newBook.save()
        .then((data) => {
        console.log(data);
        response.redirect('/book');
    })
        .catch((err) => {
        console.log(err);
        response.status(500).send({
            message: err.message || "Some error occurred while creating the Book."
        });
        return next(err);
    });
}
exports.submit = submit;
//DELETE /book
function delete_book(request, response) {
    var id = request.params.id;
    book_1.default.findByIdAndRemove(id).exec()
        // Book.findOneAndRemove({_id : (request.params.id)})
        .then((res) => {
        response.redirect('/book');
    })
        .catch((err) => {
        console.log(err);
        return next(err);
    });
}
exports.delete_book = delete_book;
;
//load Edit form
function edit_form(request, response) {
    book_1.default.findById(request.params.id)
        .then((book) => {
        // response.send(request.params);
        response.render('edit', { title: 'Edit Article', book: book });
    })
        .catch((err) => {
        console.log(err);
        return next(err);
    });
}
exports.edit_form = edit_form;
function update_book(request, response) {
    // var id = request.params.id;
    // request.body.book.body = request
    // let book = {};
    // book.title = request.body.book_title;
    // book.author = request.body.author;
    // book.isbn = request.body.book_isbn;
    // let query = {_id: request.params.id};
    // Book.update(query, book)
    // 	.then((res) => {
    // 		response.redirect('/book');
    // 	})
    // 	.catch((err) => {
    // 		console.log(err);
    // 		return next(err);
    // 	})
    console.log("request.body", request.body);
    const book = {
        title: request.body.book_title,
        author: request.body.book_author,
        isbn: request.body.book_isbn
    };
    // {new: true} option in the findByIdAndUpdate() method is used to return 
    // the modified document to the then() function instead of the original.
    book_1.default.findByIdAndUpdate(request.params.id, book, { new: true })
        .then((data) => {
        if (!data) {
            return response.status(404).send({
                message: "Book not found with id " + request.params.id
            });
        }
        console.log(data);
        // response.send(res);
        response.redirect('/book');
    })
        .catch((err) => {
        console.log(err);
        return next(err);
    });
    // const book = await Book.findById(request.params.id);
    // if (request.body.title) {
    // 	book.title = request.body.book_title;
    // }
    // if (request.body.author) {
    // 	book.author = request.body.book_author;
    // }
    // if (request.body.isbn){
    // 	book.isbn = request.body.book_isbn;
    // }
    // await book.save()
    // 	.then(data => {
    // 		response.redirect('/book');
    // 	})
    // 	.catch((err) => {
    // 		console.log(err);
    // 		return next(err);
    // 	})
}
exports.update_book = update_book;
;
//# sourceMappingURL=book_controller.js.map