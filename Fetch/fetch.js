const requestURL = "https://jsonplaceholder.typicode.com/users/"

function sendRequest(method, url, body = null) {
    const headers = {
        'Content-Type': 'application/json',
    }

    return fetch(url, {
        method: method,                 // Метод 'POST'
        body: JSON.stringify(body),     // Что передаем (json) sendObject
        headers: headers                // headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
        return response.json()
    })
}

const sendObject = {
    name: 'Rich',
    age: 29
}
// GET
// sendRequest('GET', requestURL)
// .then(data => console.log(data))
// .catch(err => console.log(err))

// POST
sendRequest('POST', requestURL, sendObject)
    .then(data => console.log(data))
    .catch(err => console.log(err))