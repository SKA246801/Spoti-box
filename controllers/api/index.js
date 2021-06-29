const router = require('express').Router();
const userRoutes = require('./user-routes');
const songRoutes = require('./song-routes');

router.use('/users', userRoutes);
router.use('/songs', songRoutes);



module.exports = router;