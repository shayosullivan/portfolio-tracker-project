const sequelize = require('../config/connection');
const { Stock, User } = require('../models');
const stockData = require('./stock-seeds.json');
const userData = require('./user-seeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {});

  await Stock.bulkCreate(stockData, {});

  process.exit(0);
};

seedDatabase();
