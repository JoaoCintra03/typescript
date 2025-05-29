/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('categorias', (table) => {
    table.increments('id')
    table.text('nome')
    table.timestamp('created_at')
      .defaultTo(knex.fn.now())
      table.timestamp('update_at')
     .defaultTo(knex.fn.now())
  }).then(() => {
    console.log('criado a tabela de categoria')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('categorias').then(() => {
    console.log('Deletando tabela de categorias');
  })
};
