const router = require('express').Router();
const {
  Comment,
  Post,
  User
} = require('../../models');

router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      // include: [ { model: Post }];
    });
    if (!userData) {
      res.status(404).json({
        message: 'No user found.'
      });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }

  });


// Create new User
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    if (!userData) {
      res.status(404).json({
        message: 'User was not created.'
      });
      return;
    }
    // res.status(200).json(userData);
    res.render('login', userData)
  } catch (err) {
    res.status(400).json(err);
  }
});



// Get User by ID
router.get('/:id', async (req, res) => {
  try {
    // finds by the primary key
    const userData = await User.findByPk(req.params.id, {
      // include: [{
      //   model: Product
      // }]
    });
    if (!userData) {
      res.status(404).json({
        message: 'No User found with this id.'
      });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update User by ID
router.put('/:id', async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!userData[0]) {
      res.status(404).json({
        message: 'No User found with this id.'
      })
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete User by ID 
router.delete('/:id', async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!userData) {
      res.status(404).json({
        message: 'No User found with this id.'
      });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;