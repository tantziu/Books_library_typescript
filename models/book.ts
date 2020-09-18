import * as mongoose from 'mongoose';

export interface Book extends mongoose.Document {
	title: string;
	author: string;
	isbn: string;
}

const bookSchema = new mongoose.Schema({
    title: {type: String, required: true}, 
    author: {type: String, required: true},
    isbn: {type: String, required: true}
});

const Book = mongoose.model<Book>('Book', bookSchema);

export default Book;