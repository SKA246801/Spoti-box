const router = require('express').Router()

router.get('/', (req, res) => {
  res.render('homepage')
})

router.get('/login', (req, res) => {
  var scopes = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + '91a104101faa4f9ebf1e114f0611001b' +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent('http://localhost:3001/name'));
})

router.get('/name', (req, res) => {
  res.render('name')
})

router.get('/chatroom', (req, res) => {
  res.render('chatroom')
})

module.exports = router
