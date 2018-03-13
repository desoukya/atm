let express = require('express');
let router = express.Router();


router.get('/', (req, res) => {
  let jsonObj = {"Users":[{"id": 1, "username": "user1"}, {"id": 2, "username": "user2"}]};
  
  res.send(jsonObj);
});

module.exports = router;