const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');


const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

// app.post('/login',(req,res) =>{
//   const code = req.body.code
//   var spotifyApi = new SpotifyWebApi({
//     clientId: 'fe69cc20a6e74584bce6cb310e7ad534',
//     clientSecret: 'ceecd22d58cc4f0abf0bfed4b420d9ea',
//     redirectUri: 'http://localhost:3001'
//   });
//   spotifyApi.authorizationCodeGrant(code).then(data =>{
//     res.json({
//       accessToken: data.body.access_token,
//       refreshToken: data.body.refresh_token,
//       expiresIn: data.body.expires_in,
//     })
//   })
//   .catch(() =>{
//     res.status(400)
//   })
// })


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
