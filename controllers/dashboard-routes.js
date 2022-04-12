const router = require('express').Router();
const {
  Post,
  Comment,
  User
} = require('../models');

const serialize = require('../utils/serialize');
const withAuth = require('../utils/auth');

router.get("/", withAuth, (req, res) => {
  try {
    Post.findAll({
      where: {
        userId: req.session.userId
      }
    });
    const posts = serialize(dbPostData);
    console.log(posts);
    res.render("dashboard",
      // layout: "dashboard",
      posts
    );
  } catch (err) {
    console.log(err);
  }
})






module.exports = router;