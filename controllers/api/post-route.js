const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

// Get all Posts
// http://localhost:3001/api/posts
// SUCCESSFUL
router.get('/', async (req, res) => {
  const postData = await Post.findAll().catch((err) => {
    res.json(err);
  });
  const posts = postData.map((post) => post.get({
    plain: true
  }));
  res.render('post', {
    posts
  });
});


// get one post by ID
// http://localhost:3001/api/posts/1
// SUCCESSFUL
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    if (!postData) {
      res.status(404).json({
        message: 'No post with this id!'
      });
      return;
    }
    console.log(postData.title)
    console.log(postData)
    const posts = postData.get({ plain: true });
    res.render('post-comment', posts);
  } catch (err) {
    res.status(500).json(err);
  };
});


// Create new Post
router.post('/newpost', async (req, res) => {
  try {
    const postData = await Post.create(req.body);
    if (!postData) {
      res.status(404).json({
        message: 'Post was not created.'
      });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// Update Post by ID
router.put('/:id', async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!postData[0]) {
      res.status(404).json({
        message: 'No post found with this id.'
      })
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Post by ID 
router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!postData) {
      res.status(404).json({
        message: 'No post found with this id.'
      });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;