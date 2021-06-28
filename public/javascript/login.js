async function loginFormHandler (event) {
  event.preventDefault()

  const spotifyLogin = document.querySelector('#spotify-login').value.trim()
  const password = document.querySelector('#password-login').value.trim()

  if (spotifyLogin && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        spotifyLogin,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      document.location.replace('/dashboard/')
    } else {
      alert(response.statusText)
    }
  }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler)
