const router = require('express').Router();
const sequelize = require('../config/connection');
const { Song, User} = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);
    Song.findAll({
        attributes: [
            'id',
            'spotify_uri',
            'title',
            'artist',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE song.id = vote.song_id)'), 'vote_count']
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            // pass a single post object into the homepage template
            console.log(dbPostData[0]);
            const songs = dbPostData.map(song => song.get({plain: true}));
            res.render('homepage', {songs});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});








module.exports = router;