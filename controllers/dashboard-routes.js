const router = require('express').Router();
const {
  Post,
  Comment,
  User
} = require('../models');

const serialize = require('../utils/serialize');
const withAuth = require('../utils/auth');

router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.userId
      }, 
      include: [User, Comment]
    });
    const posts = serialize(postData);
    // const posts = postData.map((post) => post.get({
      // plain: true
    // }));

    console.log(posts);
    res.render('dashboard', {posts});
  } catch (err) {
    console.log(err);
  }
})

// // Delete comment by ID 
// router.delete('/:id', async (req, res) => {
//   try {
//     const commentData = await Comment.destroy({
//       where: {
//         id: req.params.id
//       }
//     })
//     if (!commentData) {
//       res.status(404).json({
//         message: 'No comment found with this id.'
//       });
//       return;
//     }
//     res.status(200).json(commentData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });




module.exports = router;