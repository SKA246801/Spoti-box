const users = []

//Join user to chat
function userJoin(id, username){
    const user = username.username  
    const room = username.room
    const newUser = { user, id, room}
    users.push(newUser)
    return newUser
}

function getCurrentUser(id) {
    console.log(id)
    console.log(users)
    const index = users.findIndex(user => user.id === id)
    if(index !== -1) {
        return users.splice(index, 1)
    }
} 

// User leaves
function userLeave(id) {
    console.log(id);
    const index = users.findIndex(user => user.id === id)
    if(index !== -1) {
        return users.splice(index, 1)
    }
}

function getRoomUsers(room) {
    return users.filter(user => user.room === room)
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}