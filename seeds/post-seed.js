const {
  Post
} = require('../models');

const postData = [{
    title: 'String vs. Boolean',
    post_body: 'Does anyone know the difference between a string and a boolean?',
    user_id: 3
  },
  {
    title: 'Programming Languge Timeframe',
    post_body: 'How long does it take to learn a new programming language? ',
    user_id: 3
  }, {
    title: 'Array methods',
    post_body: 'What method can I use to add an item to an array?',
    user_id: 2
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;