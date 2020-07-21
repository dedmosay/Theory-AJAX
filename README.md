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