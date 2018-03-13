require('dotenv').config();

let express = require('express');
// let path = require('path');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let expressValidator = require('express-validator');
// let ReactEngine = require('express-react-engine');
let session = require('express-session');
let passport = require('passport');
// let LocalStrategy = require('passport-local').Strategy;
// let mongo = require('mongodb');
let mongoose = require('mongoose');
let MONGO_URI = process.env.MONGO_URI_LOCAL;
let PORT = process.env.PORT || 3001;
let routes = require('./routes/index');
let users = require('./routes/users');
let accounts = require('./routes/accounts');
let app = express();
let db;

mongoose.connect(MONGO_URI, (err, database) => {
	if(err) {
		throw err;
	}
	db = database;
});

// app.set('views', path.join(__dirname, 'Compontents'));
// app.engine('jsx', ReactEngine({wrapper: 'html.jsx'}));
// app.set('view engine', 'jsx');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secret', // this needs to not be plain-text???
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(expressValidator({
	// TODO -- upgrade away from Legacy API format --> Joi API ???
	errorFormatter : (param, msg, value) => {
		let namespace = param.split('.')
		,	root = namespace.shift()
		,	formParam = root;

		while(namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param : formParam,
			msg : msg,
			value : value
		};
	}
}));

app.use('/', routes);
app.use('/users', users);
app.use('/accounts', accounts);

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
