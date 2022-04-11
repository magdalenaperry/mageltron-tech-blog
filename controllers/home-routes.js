const router = require('express').Router();
const {
  Post,
  Comment,
  User
} = require('../models');

const serialize = require('../utils/serialize');
const withAuth = require('../utils/auth');

// homepage views all posts, no comments visible
router.get('/', async (req, res) => {
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
   res.render('homepage', {
     loggedIn: req.session.loggedIn,
     posts
   });
});


// Dashboard click, gives you all posts
// gives you create a new post function
// http://localhost:3001/posts
router.get('/posts', withAuth, async (req, res) => {
  const postData = await Post.findAll(
    { include: [User]}
  ).catch((err) => {
    res.json(err);
  });

  const posts = serialize(postData);

  console.log(posts)
  res.render('post', { 
    // loggedIn: req.session.loggedIn,
    posts
  });
});



// click on one post, see comments if logged in
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
    const posts = serialize(postData);
    
    console.log(posts)
    res.render('post-comment', {
      loggedIn: req.session.loggedIn,
      posts
    });
  } catch (err) {
    res.status(500).json(err);
  };
});



// Create new Comment
// functions in insomnia correctly
router.post('/newcomment', async (req, res) => {
  try {
    const commentData = await Comment.create(req.body);
    console.log(req.body);
    
    req.session.save(()=> {
      req.session.loggedIn = true; 
      // rq.session.user_id = commentData.id;

    });

    if (!commentData) {
      res.status(404).json({
        message: 'Comment was not created.'
      });
      return;
    }
    
    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});




// login page sends to api/users/login
router.get('/login', async (req, res) => {
  try {
    console.log(req.session.loggedIn);
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  } catch (err){
    console.log(err);
  }
});



// // SignUp
// router.post('/signup', async (req, res) => {
//   try {
//     const userData = await User.create(req.body);
//     console.log("this is my ", req.body);

//     req.session.save(()=> {
//       req.session.loggedIn = true;
//       req.session.user_id = userData.id;

//       res.status(200).json(userData);
//     })


  
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(err);
//   }
// });




// create new post
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




module.exports = router;