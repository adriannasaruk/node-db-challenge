
exports.up = function(knex) {
  return knex.schema.createTable("projects", tbl => {
      tbl.increments().primary()
      tbl.string("name", 255).notNullable().unique()
      tbl.string("projects_description", 255)
      tbl.boolean("completed").defaultTo(false)
  })
  .createTable("resource", tbl => {
    tbl.increments().primary()
    tbl.string("name", 255).notNullable().unique()
    tbl.text("description", 255)
  })
  .createTable("projects_resource", tbl => {
      tbl.increments().primary()

      tbl.integer("projects_id", 255)
      .notNullable()
      .references("id")
      .inTable("projects")

      tbl.integer("resource_id", 255)
      .notNullable()
      .references("id")
      .inTable("resource")

      tbl.unique(["projects_id", "resource_id"])
  })
    .createTable("task", tbl => {
        tbl.increments().primary()
        tbl.string("description", 255).notNullable()
        tbl.string("notes", 255)
        tbl.boolean("completed").defaultTo(false)
        tbl.integer("project_id", 255)
        .notNullable()
        .references("id")
        .inTable("projects")
  })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("task")
    .dropTableIfExists("projects_resource")
    .dropTableIfExists("resource")
    .dropTableIfExists("projects")
};
