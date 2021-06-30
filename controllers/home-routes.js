const router = require('express').Router()

router.get('/', (req, res) => {
  res.render('homepage')
})

router.get('/login', (req, res) => {
  res.render('login')
//   var scopes = 'user-read-private user-read-email'
//   res.redirect('https://accounts.spotify.com/authorize' +
//   '?response_type=code' +
//   '&client_id=' + process.env.sometext4 +
//   (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
//   '&redirect_uri=' + encodeURIComponent('http://localhost:3001'));
// })

module.exports = router
