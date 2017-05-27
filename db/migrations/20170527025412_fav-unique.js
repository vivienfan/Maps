exports.up = function(knex, Promise) {
  return knex.schema.alterTable('favourites', function(t) {
    t.unique(['u_id', 'l_id']);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('favourites', function(t) {
    t.dropUnique(['u_id', 'l_id']);
  });
};
