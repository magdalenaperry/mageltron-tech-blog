const {
  Model,
  DataTypes
} = require('sequelize');
const sequelize = require('../config/connection.js');

class Post extends Model {}

Post.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  post_body: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [1]
    },
  },
  dateCreated: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW
  },
  user_id: {
    type: DataTypes.INTEGER,
    // allowNull: false,
    references: {
      model: 'user',
      key: 'id',
    },
  }
}, {
  sequelize,
  // timestamps: true,
  freezeTableName: true,
  underscored: true,
  modelName: 'post'
})

module.exports = Post;