const Sequelize = require('sequelize');

class Sequelizer {
  constructor(config) {
    // Set up Sequelize
    this.sequelize = new Sequelize(config.database, config.user, config.password, {
      host: config.host,
      dialect: 'mariadb'
    });
  }

  async testConnection() {
    // Test the connection
    sequelize.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
      return 'success';
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
      return ('error : ' + err);
    });
  }

  // Get a list of tables
  async getTables() {
    // console.log("tsting" + this.sequelize.getQueryInterface().showAllTables());
    return await this.sequelize.getQueryInterface().showAllTables();
  }

  // Create a new table
  async createTable(tableName, columns) {
    return await this.sequelize.getQueryInterface().createTable(tableName, columns);
  }

  // Modify an existing table
  async addColumn(tableName, columnName, column) {
    return await this.sequelize.getQueryInterface().addColumn(tableName, columnName, column);
  }

  // Delete a table
  async dropTable(tableName) {
    return await this.sequelize.getQueryInterface().dropTable(tableName);
  }

  // Create a new row in a table
  async createRow(tableName, data) {
    const Model = this.sequelize.define(tableName, {}, { timestamps: false });
    return await Model.create(data);
  }

  // Update a row in a table
  async updateRow(tableName, data, where) {
    const Model = this.sequelize.define(tableName, {}, { timestamps: false });
    return await Model.update(data, { where });
  }

  // Delete a row from a table
  async deleteRow(tableName, where) {
    const Model = this.sequelize.define(tableName, {}, { timestamps: false });
    return await Model.destroy({ where });
  }
}

module.exports = Sequelizer;