let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AccountSchema = new Schema({ 
  uid: Number, 
  type: String,
  amount: Number,
  currency: String,
  timestamp: Number
});

let Account = module.exports = mongoose.model('Account', AccountSchema);

module.exports.createBankAccounts = (accounts) => {
  return new Promise((resolve, reject) => {
    Account.insertMany(accounts, (err, res) => {
      if(err) reject(err);
      
      resolve(res);
    });
  });
};

module.exports.getBankAccounts = (uid) => {
  return new Promise((resolve, reject) => {
    const query = {uid: uid};

    Account.find(query, (error, result) => {
			if(error) {
				reject(error);
			}
			resolve(result);
		});
  });
};
