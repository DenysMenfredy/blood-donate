'use strict';

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config")[env];
const db = {};


const sequelize = new Sequelize(config.database, config.username, config.password, config,{
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});


fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
    console.log(model.name);
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize
          .authenticate()
          .then(() => {
            console.log("Connection has been established succesfully");
          })
          .catch((err) => {
            console.log("Unable to connect to the database:", err);
          })



db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.group = require('./group')(sequelize, Sequelize);
// db.service = require('./service')(sequelize, Sequelize);
// db.store = require('./store')(sequelize, Sequelize);
// db.appointment = require('./appointment')(sequelize, Sequelize);


module.exports = db;