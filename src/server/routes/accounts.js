let express = require('express');
let router = express.Router();
let Account = require('../models/Account');

router.use((req, res, next) => {
  // TODO verify request is authenticated before proceeding
    // Below is working properly...

  // if(req.isAuthenticated()) {
  //   next();
  // } else {
  //   console.log('You are not logged in');
  //   res.json({Error: 'Authorization error'});
  // }
  console.log(req.session);
  next();
});

router.get('/:uid/balance', (req, res) => {
  Account.getBankAccounts(req.params.uid)
  .then(accounts => {
    res.send(accounts)
  });
});

// TODO send formatted response instead of a string
  // will implement when planning the front-end withdraw
router.put('/:uid/withdraw', (req,res) => {
  // TODO verify withdraw will not take account negative
  let {type, amount} = req.body;
  Account.modifyFunds(req.params.uid, type, amount, -1)
  .then(response => {
    console.log(response);
    res.send('withdrawn');
  });
});

// TODO send formatted response instead of a string
  // will implement when planning the front-end deposit
router.put('/:uid/deposit', (req, res) => {
  let {type, amount} = req.body;
  Account.modifyFunds(req.params.uid, type, amount, 1)
  .then(response => {
    console.log(response);
    res.send('deposited');
  });
});

module.exports = router;