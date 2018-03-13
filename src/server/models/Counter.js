let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CounterSchema = new Schema({
	_id: String,
	seq_val: Number 
});

let Counter = module.exports = mongoose.model('Counter', CounterSchema);

module.exports.getNextSequenceValue = function() {
  return new Promise((resolve, reject) => {
    Counter.findOneAndUpdate(
      {_id: 'atm_uid' },
      {$inc:{seq_val: 1}},
      {new: true, upsert: true},
      (err, doc) => {
        if(err) {
          reject(err);
        }
        resolve(doc.seq_val);
      });
  });
};