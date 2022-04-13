const router = require('express').Router();
const {
  Post,
  Comment,
  User
} = require('../models');

const serialize = require('../utils/serialize');
const withAuth = require('../utils/auth');


// HOMEPAGE VIEWS POSTS, NO COMMENTS! NO USER NAMES!
router.get('/', async (req, res) => {
  const postData = await Post.findAll({
      include: [User]
    }

  ).catch((err) => {
    res.json(err);
  });
  const posts = serialize(postData);
  //  console.log(posts)
  res.render('homepage', {
    loggedIn: req.session.loggedIn,
    posts
  });
});


// Dashboard click, gives you all posts
// gives you create a new post function
// http://localhost:3001/posts
router.get('/posts', withAuth, async (req, res) => {
  const postData = await Post.findAll({
    include: [User]
  }).catch((err) => {
    res.json(err);
  });

  const posts = serialize(postData);

  // console.log(posts)
  res.render('post', {
    loggedIn: req.session.loggedIn,
    posts
  });
});


// VIEW POST BY ID IF SIGNED IN
router.get('/posts/:id', withAuth, async (req, res) => {
  try {
    // finds post by id
    const postData = await Post.findByPk(req.params.id, {
      include: [User, {
        model: Comment,
        include: [User]
      }]
    });
    // if no post data by id is found, return json 404
    if (!postData) {
      res.status(404).json({
        message: 'No post with this id!'
      });
      return;
    };
    // if data by id is found, serialize it
    const posts = serialize(postData);
    // if session is logged in, return the posts comment handlebar page and show serialized posts
    if (req.session.loggedIn) {
      res.render('post-comment',
        posts
      );
    };
// when you click on on post link, these are console.logged
    // console.log(req.session);
    // console.log(req.session.username);
    // console.log(req.session.userId);
    // console.log(posts)
  } catch (err) {
    res.status(500).json(err);
  };
});



// Create new Comment
// functions in insomnia correctly
router.post('/newcomment', async (req, res) => {
  // if(!req.session.loggedIn){
  //   res.status(403).json({
  //     message: 'Login to create comment'
  //   });
  // };
  
  try {
    const commentData = await Comment.create({...req.body, user_id:req.session.userId});
    // console.log(req.body);

    req.session.save(() => {
      req.session.loggedIn = true;
      // req.session.username

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
    // console.log(req.session.loggedIn);
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  } catch (err) {
    console.log(err);
  }
});


// create new post
router.post('/newpost', async (req, res) => {
  if(!req.session.loggedIn){
    res.status(403).json({
      message: 'Login to create a post'
    })
  }
  try {
    const postData = await Post.create({...req.body, user_id:req.session.userId} )

    // console.log(req.session.username);
    // console.log(req.session);

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