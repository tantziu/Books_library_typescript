"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const path = __importStar(require("path"));
const bodyParser = __importStar(require("body-parser"));
const method_override_1 = __importDefault(require("method-override"));
const routes = __importStar(require("./routes/index"));
const BookController = __importStar(require("./routes/book_controller"));
const connect_1 = __importDefault(require("./connect"));
const SegfaultHandler = require('segfault-handler');
SegfaultHandler.registerHandler('crash.log');
const portNumber = 8080;
const app = express_1.default();
const db = "mongodb://localhost:27017/books";
// const db = 'mongodb+srv://tantziu:lidusic19@cluster0.va2uj.gcp.mongodb.net/Books?retryWrites=true&w=majority';
connect_1.default(db);
app.set('port', portNumber);
//Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(method_override_1.default('_method'));
//Routes
app.get('/', routes.index);
app.get('/book', BookController.find_all);
app.get('/book/form', BookController.add_book);
app.post('/book/form', BookController.submit);
app.delete('/book/:id', BookController.delete_book);
app.get('/book/edit/:id', BookController.edit_form);
app.put('/book/edit/:id', BookController.update_book);
//static files like .css
app.use(express_1.default.static('.'));
http.createServer(app).listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});
//# sourceMappingURL=server.js.map