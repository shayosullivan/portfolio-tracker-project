const User = require('./User');
const Stock = require('./Stock');

User.hasMany(Stock, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Stock.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Stock };
