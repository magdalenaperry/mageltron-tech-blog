const router = require('express').Router();
const {
  Comment,
  Post,
  User
} = require('../../models');
const serialize = require('../../utils/serialize');


// Create new User
// router.post('/newuser', async (req, res) => {
//   try {
//     const userData = await User.create(req.body);
//     if (!userData) {
//       res.status(404).json({
//         message: 'User was not created.'
//       });
//       return;
//     }
//     res.status(200).json(userData);
//     res.render('login', userData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });


// router.post('/signup', async (req, res) => {
//   try {
//     const dbUserData = await User.create(req.body);
//     console.log(req.body)

//     req.session.save(() => {
//       req.session.loggedIn = true;
//       req.session.user_id = dbUserData.id;

//       res.status(200).json(dbUserData);
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });


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
    console.log(serializedUserData);
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = serializedUserData.id;
      req.session.username = serializedUserData.username;
      req.session.email = serializedUserData.email;

      console.log(req.session.username);
      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in!'})
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});






// router.get('/', async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       // include: [ { model: Post }];
//     });
//     if (!userData) {
//       res.status(404).json({
//         message: 'No user found.'
//       });
//       return;
//     }
//     res.status(200).json(userData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
  
// });






// // Get User by ID
// router.get('/:id', async (req, res) => {
//   try {
//     // finds by the primary key
//     const userData = await User.findByPk(req.params.id, {
//       // include: [{
//       //   model: Product
//       // }]
//     });
//     if (!userData) {
//       res.status(404).json({
//         message: 'No User found with this id.'
//       });
//       return;
//     }
//     res.status(200).json(userData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Update User by ID
// router.put('/:id', async (req, res) => {
//   try {
//     const userData = await User.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//     });
//     if (!userData[0]) {
//       res.status(404).json({
//         message: 'No User found with this id.'
//       })
//       return;
//     }
//     res.status(200).json(userData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



// // Delete User by ID 
// router.delete('/:id', async (req, res) => {
//   try {
//     const userData = await User.destroy({
//       where: {
//         id: req.params.id
//       }
//     })
//     if (!userData) {
//       res.status(404).json({
//         message: 'No User found with this id.'
//       });
//       return;
//     }
//     res.status(200).json(userData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



module.exports = router;