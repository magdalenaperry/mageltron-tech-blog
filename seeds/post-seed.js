const { Post } = require('../models');

const postData =
[{
    title: 'Great Post',
    post_body: 'This is a very short and informative post about coding',
    user_id: 1
  },
  {
    title: 'Bad Post',
    post_body: 'This is a very short and sort of informative post about coding',
    user_id: 3
  }, {
    title: 'Ok Post',
      post_body: 'This is a very short and sweet  post about coding',
      user_id: 2
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
