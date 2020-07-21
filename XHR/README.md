### Fetch, XMLHttpRequest (XHR), Ajax
 Запросы на сервер [JSONPlaceholder](https://jsonplaceholder.typicode.com/) 

 ### XHR 

 - XML
 - HTTP
 - Request
### GET
 Получение тестовых данных с помощью метода GET

 ```js
const requestURL = "https://jsonplaceholder.typicode.com/users/"

const xhr = new XMLHttpRequest()

// Открываем запрос
xhr.open('GET', requestURL) 

// Отправляем запрос на сервер
xhr.send()
 ```

### onload 

 Перед методом send() можно вывести данные в log(), можно проверить тип данных.

 ```js
 xhr.onload = () => {
    console.log(typeof(xhr.response));
}
 ```
 Будет выведена string

 Поэтому переведем данные в формат JSON

 ```js
  console.log(JSON.parse(xhr.response));
 ``` 
 Будут получены данные в виде объекта
 ```
 (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
 ```

Или можно сразу сказать, чтобы принимал тип json

```js
xhr.responseType = 'json'
```

### onerror
Вывести ошибку можно с помощью метода onerror

```js 
xhr.onerror = () => {
    console.log(xhr.response)
}
```

Также существуют ошибки, которые нельзя обработать с помощью onerror. Такие как пользователь не найден и т. д. поэтому можно добавить 

```js
xhr.onload = () => {
    // Если ошибка больше 400, то вернет статус ошибки
    if (xhr.status >= 400) {
        console.error(xhr.response);
    } else {
        console.log(xhr.response);
    }
}
```  

### Promise

Создадим функцию sendRequest и в ней будем выполнять асинхронный код

```js

function sendRequest() {
    return new Promise( (resolve, reject) => {
        //Обернутый код
    }) 
    xhr.send()
}
```

Эта функция должна принимать на вход method и url

```js
sendRequest('GET', requestURL)

function sendRequest(method, url) {...}
```
Нужно учитывать, что так как sendRequest содержит Promise, то он должен вернуть в .then()

```js
sendRequest('GET', requestURL)
.then(data => console.log(data))
.catch(err => console.log(err))
```
### reject
В случае ошибки срабатывает метод reject

### resolve
Если все хорошо и данные без ошибок, то resolve
```js
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
```

### POST

Метод POST должен принимать параметры body
```js
function sendRequest(method, url, body=null) {...
    // принимаем данные для отправки
    xhr.send(body)
}

sendRequest('POST', requestURL, sendObject)
.then(data => console.log(data))
.catch(err => console.log(err))
```

Однако можно увидеть, что данные которые мы отпралялем, выглядят не корректно
Со статусом 201 (created)

Request Payload говорит, что передали 
```js
[object Object]
```

Поэтому при отправке должны оберуть в JSON.stringify, чтобы привести json к строке
```js
 xhr.send(JSON.stringify(body))
```
 Request Payload
```js
{name: "Rich", age: 29}
```

А поскольку мы работаем с text/plan то должны явно это указать

```js
function sendRequest(method, url, body=null) {
    return new Promise((resolve, reject) => {...
   xhr.setRequestHeader('Content-type', 'application/json')
   ...
    xhr.send(JSON.stringify(body))
```

Теперь мы получаем отправленный объект
```js
{name: "Rich", age: 29, id: 11}
```