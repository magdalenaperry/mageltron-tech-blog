const sequelize = require('../config/connection.js');

const seedPosts = require('./post-seed');
// const seedComments = require('./comment-seed');
const seedUsername = require('./username-seed');


const seedAll = async () => {
  await sequelize.sync({
    force: true
  });
  console.log('\n----- DATABASE SYNCED -----\n');
  
  await seedUsername();
  console.log('\n----- USERNAMES SEEDED -----\n');

  await seedPosts();
  console.log('\n----- POSTS SEEDED -----\n');
  
  // await seedComments();
  // console.log('\n----- COMMENTS SEEDED -----\n');



  process.exit(0);
};

seedAll();
