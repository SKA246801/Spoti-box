const router = require('express').Router();
const { Song, User,Vote } = require('../../models');
const sequelize = require('../../config/connection');


// get all users
router.get('/', (req, res) => {
    console.log('======================');
    Song.findAll({
        attributes: [
            'id',
            'spotify_uri',
            'title',
            'artist',
            // use raw MySQL aggregate function query to get a count of how many votes the post has and return it under the name `vote_count`
            [
                sequelize.literal('(SELECT COUNT(*) FROM vote WHERE song.id = vote.song_id)'),
                'vote_count'
            ]
        ],
        // order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});


router.get('/:id', (req, res) => {
    Song.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'spotify_uri',
            'title',
            'artist',
            // use raw MySQL aggregate function query to get a count of how many votes the post has and return it under the name `vote_count`
            [
                sequelize.literal('(SELECT COUNT(*) FROM vote WHERE song.id = vote.song_id)'),
                'vote_count'
            ]
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    Song.create({
        title: req.body.title,
        artist: req.body.artist,
        spotify_uri: req.body.spotify_uri,
        user_id: req.body.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/upvote', (req,res) =>{
    Song.upvote(req.body, {Vote})
            .then(dbPostData => res.json(dbPostData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
})

router.put('/:id', (req, res) => {
    Song.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id',(req,res)=>{
    Song.destroy({
        where:{
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    })
})


module.exports = router;
