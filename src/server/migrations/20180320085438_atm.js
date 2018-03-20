exports.up = async(knex) => {
  await knex.schema.createTable('users', (table) => {
          table.increments('user_id');
          table.text('first_name');
          table.text('last_name');
          table.text('username');
          table.text('email');
          table.text('pass_hash');
        });
  await knex.schema.createTable('accounts', (table) => {
          table.increments('account_id');
          table.integer('user_id');
          table.text('account_type');
          table.float('amount');
          table.text('currency');
          table.timestamp('created_at').defaultTo(knex.fn.now());
          table.foreign('user_id').references('users.user_id');
        });
}

exports.down = async(knex) => {
  await knex.schema.dropTableIfExists('accounts');
  await knex.schema.dropTableIfExists('users');
}
