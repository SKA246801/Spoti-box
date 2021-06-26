const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection')

class Song extends Model { }


Song.init({
    id: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Datatypes.STRING
    },
    artist: {
        type: Datatypes.STRING
    },
    spotifyuri: {
        type: Datatypes.STRING
    }
},
    {
        sequelize,
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        modelName: 'song'
    }

)

module.exports = Song;