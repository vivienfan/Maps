
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table) {
      table.string('email');
      table.unique('email');
      table.string('password');
      table.string('username');
      table.unique('username');
    }),
    knex.schema.createTable('maps', function(table) {
      table.increments('m_id');
      table.integer('l_id').references('lists.l_id');
    }),
    knex.schema.createTable('map_points', function(table) {
      table.increments('p_id');
      table.integer('m_id').references('maps.m_id');
      table.string('title');
      table.string('description');
      table.string('image');
      table.float('longitude');
      table.float('latitude');
      // TODO:
      // table.string('embed_links');
    }),
    knex.schema.createTable('lists', function(table) {
      table.increments('l_id');
      table.string('title');
      table.string('description');
      table.boolean('public');
      // h_id references
    }),
    knex.schema.createTable('contributions', function (table) {
      table.integer('u_id').references('users.id');
      table.integer('l_id').references('lists.l_id');
    }),
    knex.schema.createTable('favourites', function (table) {
      table.integer('u_id').references('users.id');
      table.integer('l_id').references('lists.l_id');
    })
    // TODO:
    // knex.schema.createTable('histories', function(table) {
    //   table.increments('h_id');
    //   table.integer('l_id').refreences('lists.l_id');
    //   table.integer('prev_hid');
    //   table.string('command');
    // });

    // user add to db:
    // insert into users values(...);
    // insert into histories values(h_id, l_id, prev_hid, `delete from users where id = 'x';`)

    // user rollback:
    // var command = select command from histroies where h_id = 'id';
    // knex.schema.raw(command);
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table) {
      table.dropColumns(['email', 'password', 'username']);
    }),
    knex.schema.dropTable('contributions'),
    knex.schema.dropTable('favourites'),
    knex.schema.dropTable('map_points'),
    knex.schema.dropTable('maps'),
    knex.schema.dropTable('lists')
  ]);
};

