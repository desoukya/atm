let express = require('express');
let router = express.Router();
let Account = require('../models/Account');

router.get('/', (req, res) => {

});

router.get('/:uid/balance', (req, res) => {
  Account.getBankAccounts(req.params.uid)
  .then(accounts => {
    res.send(accounts)
  });
});

module.exports = router;