const router = require('express').Router();
const {
  Comment,
  Post,
  User
} = require('../../models');

router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      // include: [ { model: User }];
    });
    if (!userData) {
      res.status(404).json({
        message: 'No comments found.'
      });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }

  });



module.exports = router;