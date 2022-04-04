const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

// Get all Posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      // include: [ { model: User }];
    });
    if (!postData) {
      res.status(404).json({
        message: 'No Posts found.'
      });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }

});

// Create new Post
router.post('/', async (req, res) => {
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

// Get Post by ID
router.get('/:id', async (req, res) => {
  try {
    // finds by the primary key
    const postData = await Post.findByPk(req.params.id, {
      // include: [{
      //   model: Product
      // }]
    });
    if (!postData) {
      res.status(404).json({
        message: 'No Post found with this id.'
      });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
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