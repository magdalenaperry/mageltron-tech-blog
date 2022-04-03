const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Comment extends Model{

}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      primaryKey: true, 
      autoIncrement: true
    }, 
    comment_body: {
      type:DataTypes.STRING, 
      allowNull: false, 
      validate: {
        len:[1, 255]
      }
    }, 
    user_id: {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      // references: {
      //   model: 'user', 
      //   key: 'id'
      // }
    }, 
    post_id: {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      // references: {
      //   model: 'post', 
      //   key: 'id'
      // }
    }
  }, 
  {
    sequelize, 
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }
)

module.exports = Comment; 