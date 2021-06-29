const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')

class Song extends Model {}


Song.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING
    },
    artist: {
        type: DataTypes.STRING
    },
    spotify_uri: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
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