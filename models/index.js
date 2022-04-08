const Comment = require('./comment');
const Post = require('./post'); 
const User = require('./user');

User.hasMany(Post, {
  foreignKey: 'user_id', 
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
  foreignKey: 'user_id', 
  onDelete: 'CASCADE'
})

Post.belongsTo(User, {
  foreignKey: 'user_id' 
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
})

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});








module.exports = {
  Comment, 
  Post, 
  User
}