const router = require('express').Router()

router.get('/', (req, res) => {
  res.render('homepage')
})
// USE BELOW FOR LOCAL TESTING?
router.get('/login', (req, res) => {
  var scopes = 'user-read-private user-read-email'
  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + '91a104101faa4f9ebf1e114f0611001b' +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent('http://localhost:3001/name'))

  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + '91a104101faa4f9ebf1e114f0611001b' +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent('https://ancient-harbor-80018.herokuapp.com/name'))
  // >>>>>> > 90 a81baaeafb6d3189be4e0e60ef120cd588b00a
})

router.get('/name', (req, res) => {
  res.render('name')
})

router.get('/chatroom', (req, res) => {
  res.render('chatroom')
})

module.exports = router
