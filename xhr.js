const requestURL = "https://jsonplaceholder.typicode.com/users/"

const xhr = new XMLHttpRequest()

function sendRequest(method, url) {
    return new Promise((resolve, reject) => {
        //Обернутый код
        xhr.open(method, url) // Здесь принимаем полученные параметры

        xhr.responseType = 'json'

        xhr.onload = () => {
            if (xhr.status >= 400) {
                // console.error(xhr.response);
                reject(xhr.response);
            } else {
                // console.log(xhr.response);
                resolve(xhr.response)
            }
        }

        xhr.onerror = () => {
            // console.log(xhr.response)
            reject(xhr.response);
        }
        xhr.send()
    })
    
}

sendRequest('GET', requestURL)
.then(data => console.log(data))
.catch(err => console.log(err))
