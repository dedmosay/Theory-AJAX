## Fetch

### GET
Чтобы получить данные с помощью метода GET

```js
// GET запрос
sendRequest('GET', requestURL)
.then(data => console.log(data))
.catch(err => console.log(err))
```

```js
function sendRequest(method, url, body=null) {
    // fetch обращаемся к url.(затем получаем text или json)
  return fetch(url).then(response => { 
      return response.json() 
//    return response.text() 
  })
}
```

### POST

```js
// POST
sendRequest('POST', requestURL, sendObject)
.then(data => console.log(data))
.catch(err => console.log(err))
```
Для метода POST должны добавить параметры
```js
{   
    method:method,                  // Метод 'POST'
    body: JSON.stringify(body),     // Что передаем (json) sendObject
    headers: headers                // headers: {'Content-Type': 'application/json'}
}
```