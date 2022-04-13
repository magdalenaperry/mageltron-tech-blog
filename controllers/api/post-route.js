const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

// Create new Post 
// http://localhost:3001/api/posts/newpost
// linked to public/js/add-post.js and post.handlebars
// SUCCESSFUL

// router.post('/newpost', async (req, res) => {
//   try {
//     const postData = await Post.create(req.body);
//     if (!postData) {
//       res.status(404).json({
//         message: 'Post was not created.'
//       });
//       return;
//     }
//     res.status(200).json(postData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });


// // Update Post by ID
// router.put('/:id', async (req, res) => {
//   try {
//     const postData = await Post.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//     });
//     if (!postData[0]) {
//       res.status(404).json({
//         message: 'No post found with this id.'
//       })
//       return;
//     }
//     res.status(200).json(postData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });





module.exports = router;