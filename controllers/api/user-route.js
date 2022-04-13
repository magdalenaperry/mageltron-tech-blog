const router = require('express').Router();
const {
  Comment,
  Post,
  User
} = require('../../models');
const serialize = require('../../utils/serialize');

// NEW USER!-----UPDATED FROM MINI
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    const serializedUserData = serialize(userData);

    req.session.save(() => {
      req.session.userId = serializedUserData.id;
      req.session.username = serializedUserData.username;
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// LOGOUT SUCCESSFUL!-----UPDATED FROM MINI
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


// LOGIN ---UPDATED FROM MINI
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!userData) {
      res
        .status(400)
        .json({
          message: 'Incorrect email or password, please try again'
        });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({
          message: 'Incorrect email or password, please try again'
        });
      return;
    }
    var serializedUserData = serialize(userData);
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = serializedUserData.id;
      req.session.username = serializedUserData.username;
      req.session.email = serializedUserData.email;

      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in!'})
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;