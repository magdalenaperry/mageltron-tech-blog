const { Comment } = require('../models');

const commentData = [
  {
    comment_body: 'This is a bad post!',
    user_id: 2,
    post_id: 3
  },
  {
    comment_body: 'This is a great post!',
    user_id: 1,
    post_id: 2
  },
  {
    comment_body: 'This is a silly post!',
    user_id: 3,
    post_id: 4
  }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;