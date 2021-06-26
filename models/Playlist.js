const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection')

class Playlist extends Model {
    static upvote(body, models) {
        return models.Vote.create({
            user_id: body.user_id,
            playlist_id: body.playlist_id
        }).then(() => {
            return Playlist.findOne({
                where: {
                    id: body.playlist_id
                },
                attributes: [
                    'id', 'title', 'user_id', [sequelize.literal('(SELECT COUNT * FROM vote WHERE playlist.id = vote.post_id)'),
                        'vote_count']
                ]
            })
        })
    }

}


Playlist.init({
    id: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Datatypes.INTEGER
    },
    user_id: {
        type: Datatypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    }
},

    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'playlist'
    }

)


module.exports = Playlist;