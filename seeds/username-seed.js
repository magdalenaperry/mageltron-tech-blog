const { User } = require('../models');

const usernameData = 
[{
    username: 'mageltron',
    email: 'mageltron@gmail.com',
    password: 'abc123'
  },
  {
    username: 'hobo_skinoski',
    email: 'hobo@aol.com',
    password: 'coolDog123'
  },
  {
    username: 'pappy_vanwinkle',
    email: 'pappy@hotmail.com',
    password: 'funCat123'
  }
];

const seedUsername = () => User.bulkCreate(usernameData);

module.exports = seedUsername;