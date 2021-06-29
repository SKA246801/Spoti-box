const User = require("./User");

const Song = require("./Song")

// const Vote = require("./Vote")


User.hasMany(Song, {
    foreignKey: 'user_id'
});

Song.belongsTo(User, {
    foreignKey: 'user_id',
});





// User.belongsToMany(Playlist, {
//     through: Vote,
//     as: 'voted_playlist',
//     foreignKey: 'user_id'
// })


// Playlist.belongsToMany(User, {
//     through: Vote,
//     as: 'voted_playlist',
//     foreignKey: 'playlist_id'
// })

// Vote.belongsTo(User, {
//     foreignKey: 'user_id',
// })

// Vote.belongsTo


module.exports = { User,Song };