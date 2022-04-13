const router = require('express').Router();
const postRoutes = require('./post-route');
const userRoutes = require('./user-route');

router.use('/posts', postRoutes);
router.use('/users', userRoutes);

module.exports = router;
