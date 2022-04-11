const router = require('express').Router();
const { Comment, Post, User } = require('../../models');

// http://localhost:3001/api/comments/

// Get all comments 

// router.get('/', async (req, res) => {
//   const commentData = await Comment.findAll(
//     {include: [Post, User]}
//   ).catch((err) => {
//     res.json(err);
//   });
//   const comments = commentData.map((comment) => comment.get({
//     plain: true
//   }));
//   console.log(comments);
//   res.render('all', {
//     comments
//   });
// });

// 


// // Create new Comment
// // functions in insomnia correctly
// router.post('/newcomment', async (req, res) => {
//   try {
//     const commentData = await Comment.create(req.body);
//     if (!commentData) {
//       res.status(404).json({
//         message: 'Comment was not created.'
//       });
//       return;
//     }
//     res.status(200).json(commentData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });






// // Get comment by ID
// router.get('/:id', async (req, res) => {
//   try {
//     // finds by the primary key
//     const commentData = await Comment.findByPk(req.params.id, {
//       include: [{
//         model: Post
//       }]
//     });
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

// // Update ccomment by ID
// router.put('/:id', async (req, res) => {
//   try {
//     const commentData = await Comment.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//     });
//     if (!commentData[0]) {
//       res.status(404).json({
//         message: 'No comment found with this id.'
//       })
//       return;
//     }
//     res.status(200).json(commentData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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
