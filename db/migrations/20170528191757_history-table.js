
exports.up = function(knex, Promise) {
  return knex.schema.createTable('history', function(table) {
    table.timestamp('timestamp');
    table.string('username');
    table.string('change');
    table.integer('m_id').references('maps.m_id').onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('history');
};
