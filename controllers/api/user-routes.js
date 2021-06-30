const router = require('express').Router()
const User = require('../../models/user')

router.post('/', (req, res) => {
 User.create({
   username: req.body.username
 })
 .then(dbUserData => {
   req.session.save(() => {
     req.session.user_id = dbUserData.id
     req.session.username = dbUserData.username
     res.json(dbUserData)
   })
 })
})

module.exports = router