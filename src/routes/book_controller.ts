import * as express from 'express';
import Book from "../models/book";
declare var next: (error: any) => void;

export function add_book(request: express.Request, response: express.Response) {
	response.render('form', { title: 'Add Book:'});
}

// GET /book
export function find_all(request: express.Request, response: express.Response) {
	const books = Book.find({})
		.then((books) => {
			response.render('book', { title: 'Books Inventory', 'books': books});
		})
		.catch((err) => {
			console.log(err);
			return next(err);
		});
};

// Get a specific book

export function find_one(request: express.Request, response: express.Response) {
	Book.findById(request.params.id)
		.then((book) => {
			if (!book) {
				return response.status(404).send({
					message: "Book not found with id " + request.params.id
				});
			}
			console.log(book);
		})
		.catch ((err) =>{
			if (err.kind === 'ObjectId') {
				return response.status(404).send({
					message: "Book not found with id " + request.params.id
				});
			}
			return response.status(500).send({
				message: "Error retrieving book with id " + request.params.id
			});
		})
};

//POST /book
export function submit(request: express.Request, response: express.Response) {
	const newBook = new Book({
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
			})
			return next(err);
		});
}

//DELETE /book
export function delete_book(request: express.Request, response: express.Response) {
	var id = request.params.id;
	Book.findByIdAndRemove(id).exec()
	// Book.findOneAndRemove({_id : (request.params.id)})
		.then((res) => {
			response.redirect('/book');
		})
		.catch((err) => {
			console.log(err);
			return next(err);
		});
};

//load Edit form
export function edit_form(request: express.Request, response: express.Response) {
	Book.findById(request.params.id)
	.then((book) => {
		// response.send(request.params);
		response.render('edit', {title: 'Edit Article', book: book});
	})
	.catch((err) => {
		console.log(err);
		return next(err);
	});
}

export function update_book(request: express.Request, response: express.Response) {
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
	Book.findByIdAndUpdate(request.params.id, book, {new: true})
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
};
