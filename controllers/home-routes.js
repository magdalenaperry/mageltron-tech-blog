const router = require('express').Router();
const {
  Post,
  Comment,
  User
} = require('../models');


router.get('/', async (req, res) => {
  res.render('homepage')
});


// Get all Posts
// http://localhost:3001/posts
// SUCCESSFUL
router.get('/posts', async (req, res) => {
  const postData = await Post.findAll({
      include: [User]
    }

  ).catch((err) => {
    res.json(err);
  });
  const posts = postData.map((post) => post.get({
    plain: true
  }));
  console.log(posts)
  res.render('post', {
    posts
  });
});

// get one post by ID
// http://localhost:3001/posts/#
// SUCCESSFUL
router.get('/posts/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [User, {
        model: Comment,
        include: [User]
      }]
    });
    if (!postData) {
      res.status(404).json({
        message: 'No post with this id!'
      });
      return;
    }
    const posts = postData.get({
      plain: true
    });
    console.log(posts)
    // console.log(posts.comments[0].user);
    res.render('post-comment', posts);
  } catch (err) {
    res.status(500).json(err);
  };
});



module.exports = router;