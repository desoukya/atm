const users = require('../seed_data/users_seed');

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert(users);
    });
};
