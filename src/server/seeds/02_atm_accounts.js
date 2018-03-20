const accounts = require('../seed_data/accounts_seed');

exports.seed = function(knex, Promise) {
  return knex('accounts').del()
    .then(function () {
      return knex('accounts').insert(accounts);
    });
};
