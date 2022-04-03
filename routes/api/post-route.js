const router = require('express').Router();
const { Comment, Post, User } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      // include: [ { model: User }];
    });
    if (!postData) {
      res.status(404).json({
        message: 'No comments found.'
      });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;