async function createUsername(e) {
    e.preventDefault()

    const username = document.querySelector('#username').value.trim()

    if (username) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username
            }),
            headers: { 'Content-Type' : 'application/json' }
        })

        if (response.ok) {
            // const url = ('https://ancient-harbor-80018.herokuapp.com/chatroom')
            const url = ('http://localhost:3001/chatroom')
            const user = '?username=' + username
            document.location.replace(url + user)
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('#name-button').addEventListener('click', createUsername)