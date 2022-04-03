const router = require('express').Router();
const { Comment, Post, User } = require('../../models');


// Get all comments 
router.get('/', async (req, res) => {
try { 
const commentData = await Comment.findAll({
  // include: [ { model: User }];
});
if (!commentData) {
  res.status(404).json({
    message: 'No comments found.'
  });
  return;
}
res.status(200).json(commentData);
} catch (err) {
  res.status(500).json(err); 
}

});





module.exports = router; 
