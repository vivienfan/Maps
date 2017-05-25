
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('maps', function(table) {
      table.string('title');
      table.string('description');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.table('maps', function(table) {
    table.dropColumns(['title', 'description']);
  });
};
