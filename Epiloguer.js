const epilogue = require('epilogue');
const Sequelizer = require('./Sequelizer');
const config = require('./config'); // Import the configuration object

class Epiloguer {
  constructor(app, config) {
    this.app = app;
    this.config = config;

    // Set up Sequelize using the pool variable
    // this.sequelize = new Sequelize(config.db.database, config.db.user, config.db.password,
    //     { 
    //         dialect: 'mariadb',
    //         host: config.db.host
    // });

    this.sequelizer = new Sequelizer(this.config.db);

    // Define some example models
    // this.User = this.sequelize.define('User', {
    //   firstName: Sequelize.STRING,
    //   lastName: Sequelize.STRING,
    //   email: Sequelize.STRING
    // });

    // Initialize epilogue
    epilogue.initialize({ app: this.app, sequelize: this.sequelize });

    // Create REST resources for the User model
    // this.userResource = epilogue.resource({
    //   model: this.User,
    //   endpoints: ['/users', '/users/:id']
    // });
  }
}

module.exports = Epiloguer;