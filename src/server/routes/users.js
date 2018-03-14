let express = require('express');
let router = express.Router();
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let User = require('../models/User');
let Counter = require('../models/Counter');
let Account = require('../models/Account');

router.post('/register', (req, res) => {
  req.checkBody('firstName', 'First name is required').notEmpty();
	req.checkBody('lastName', 'Last name is required').notEmpty();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Invalid email address').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('accounts', 'One or more account types is required').notEmpty();
	// TODO -- validate accounts is an array of strings, with length of 1 or 2

  const errors = req.validationErrors();

	if(errors) {
		res.send({
			errors : errors
		});
	} else {
    const firstName = req.body.firstName;
		const lastName 	= req.body.lastName;
		const username 	= req.body.username;
		const email 		= req.body.email;
		const password 	= req.body.password;
    const accounts 	= req.body.accounts;
    
    User.checkIfAvailable('username', username)
    .then(() => {
      return User.checkIfAvailable('email', email);
    })
    .then(() => {
      return Counter.getNextSequenceValue();
    })
    .then(nextSequenceValue => {
      const newUser = new User({
        _id: nextSequenceValue
      , firstName: firstName
      , lastName: lastName
      , username: username
      , email: email
      , password: password
      });

      return User.createUser(newUser);
    })
    .then(newUserObject => {
      const accountsCollection = [];
			const now = Date.now();

			accounts.forEach(accountType => {
				accountsCollection.push(
					{ 'uid': newUserObject._id, 'type': accountType, 'amount': 0.0, 'currency': 'USD', 'timestamp': now }
				);
      });
      
      return Account.createBankAccounts(accountsCollection);
    })
    .catch(err => {
      console.log(err);
    });
    
    res.send('we did it! registered!');
  }
});

passport.use(new LocalStrategy((username, password, done) => {
	User.getUserByUsername(username, function(err, user) {
    if(err) throw err;
    if(!user) {
      return done(null, false, {message: 'Unknown User'});
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        return done(null, user);
      } else {
        return done(null, false, {message: 'Invalid password'});
      }
    });
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.getUserById(id, (err, user) => done(err, user));
});

router.post('/login', 
  passport.authenticate('local'), 
    (req, res) => {
      const _id = req.user._id;
      const firstName = req.user.firstName;
      const lastName = req.user.lastName;
      const username = req.user.username;
      const email = req.user.email;
      const userObject = {_id: _id, firstName: firstName,
        lastName: lastName, username: username, email: email};
      
      res.send(userObject);
});

router.get('/logout', (req, res) => {
  console.log('first');
  if(req.isAuthenticated()) {
    req.logout();

    req.send('success - you re logged out');
  }
});

module.exports = router;