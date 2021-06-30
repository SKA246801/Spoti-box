const messageForm = document.getElementById('message-form')
const newMessages = document.querySelector('.messages')
let room = 'Spoti-Box'
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const username = urlParams.get('username')

const socket = io()
// Join chat
socket.emit('joinRoom', {username, room})


// Message from server
socket.on('message', message => {
    outputMessage(message)

    //scroll down
    newMessages.scrollTop = newMessages.scrollHeight
})


messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    //capture input
    const message = e.target.elements.messageBox.value

    // send message to server
    socket.emit('chatMessage', message)

    // clear input after send
    e.target.elements.messageBox.value = ''
    e.target.elements.messageBox.focus()
})

// send message to document
const outputMessage = (message) => {
    const li = document.createElement('li')
    li.classList.add('new-messages')
    li.innerHTML = `<strong>${message.username} ${message.time}</strong> 
    <p> ${message.text}</p>`

    document.querySelector('.messages').appendChild(li)
}
