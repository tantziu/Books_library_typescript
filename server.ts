import * as express from 'express'
import * as http from 'http'
import * as path from 'path'
import * as bodyParser from 'body-parser'
import * as methodOverride from 'method-override'
import * as routes from './routes/index'
import * as BookController from './routes/book_controller'
import connect from "./connect";

const SegfaultHandler = require('segfault-handler');
SegfaultHandler.registerHandler('crash.log');

const portNumber = 8080;
const app = express();
const db = "mongodb://localhost:27017/books";
// const db = 'mongodb+srv://tantziu:lidusic19@cluster0.va2uj.gcp.mongodb.net/Books?retryWrites=true&w=majority';

connect(db);

app.set('port', portNumber)

//Views
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
app.use(methodOverride('_method'));


//Routes
app.get('/', routes.index);

app.get('/book', BookController.find_all);

app.get('/book/form', BookController.add_book);

app.post('/book/form', BookController.submit);

app.delete('/book/:id', BookController.delete_book);

app.get('/book/edit/:id', BookController.edit_form);

app.put('/book/edit/:id', BookController.update_book);

//static files like .css
app.use(express.static('.'));

http.createServer(app).listen(app.get('port'), () => {
	console.log('Express server listening on port ' + app.get('port'));
});

