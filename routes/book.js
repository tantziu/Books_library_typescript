"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
mongoose
    .connect('mongodb://localhost:27017/books', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(function () {
    return console.log('Successfully connected!!');
})["catch"](function (error) {
    console.log("Error connecting to database: ", error);
    return process.exit(1);
});
var bookSchema = new mongoose.Schema({
    title: String, author: String, isbn: String
});
var Book = mongoose.model('Book', bookSchema);
// GET /book
function list(request, response) {
    Book.find({})
        .then(function (res) {
        response.render('book', { 'title': 'Books', 'books': res });
    })["catch"](function (err) {
        return next(err);
    });
    var all_books = Book.find({});
    console.log(all_books);
}
exports.list = list;
;
//POST /book
function submit(request, response) {
    var newBook = new Book({
        title: request.body.book_title,
        author: request.body.author,
        isbn: request.body.book_isbn
    });
    newBook.save()
        .then(function (res) {
        response.redirect('/book');
    })["catch"](function (err) {
        return next(err);
    });
}
exports.submit = submit;
//DELETE /book
function delete_book(request, response) {
    console.log('delete book');
    Book.findByIdAndDelete(request.body._id)
        .then(function (res) {
        console.log("deleted ", +res);
        response.redirect('/book');
    })["catch"](function (err) {
        console.log(err);
        return next(err);
    });
    // const book = Book.deleteOne({_id: request.params._id}, (err:any) => {
    // 		if (err) {
    // 			response.send(err);
    // 		}
    // 		else {
    // 			// response.redirect('/book');
    // 			console.log("Deleted");
    // 		}
    // 	}
    // );
}
exports.delete_book = delete_book;
;
