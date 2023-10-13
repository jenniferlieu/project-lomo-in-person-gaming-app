---
sidebar_position: 3
---
# Creating API routes

All routes created in the `api.php` file will build on the `/api/` route. For example, the full '/hello' route will be https://localhost/api/hello.

## Route syntax
```php
// public route
Route::<httpRequest>('/url', functionToHandleData())
```

The `<httpRequest>` is the HTTP request verb like `get`, `post`, `patch`, `put`, `delete`.

The `functionToHandle()` will decide what to do with the data. Normally, it references a function in a Controller class, but it can also be a nameless function too.

## Hello World example

Courtesy of Professor Applebaum. 

This simple API creates a public hello world route that returns a JSON message string of 'Hello World'.

```php
// api.php

Route::get('/hello', function (){
    return response()->json(['message': 'Hello world from Laravel!']);
});
```

### Test the GET API request
There are various ways to test the GET method:
  - Go to http://localhost/api/hello in the browser
  - Run `curl http://localhost/api/hello`
  - Use the _Desktop_ version of Postman

### Call API from a component in React

```jsx
// MyComponent.js

import { useEffect, useState } from 'react'

function MyComponent() => {
    const [hello, setHello] = useState("hello");

    useEffect(() => {
        // http request options 
        var requestOptions = {
            method: 'GET',
            headers: {
                "Accept": "application/json" // MUST SEND WITH THIS
            },
            redirect: 'follow'
        };
        
        // calls the API using fetch, a builtin http-request package
        // if we decide to use a different package, we can just use that
        // the point is that api calls must be in the useEffect() function
        fetch("http://localhost/api/hello", requestOptions)
            .then(response => response.json())
            .then(response => {
                let message = JSON.stringify(response.message);
                console.log(message);
                setHello(message);
            })
            .catch(error => console.log('error', error));
    }, []);

    return (
        <>
            {hello} // display the response
        </>
    )
}
export default MyComponent
```

## Mass create routes with Route Resource

The `Route::resource()` method automatically defines all the CRUD routes and methods in the Controller class and maps each of the routes to its corresponding 'resource' methods.

Read more about the `Route::resource()` method and usage in the [Laravel controller docs](https://laravel.com/docs/10.x/controllers)

**The route and method mappings:**
- GET /resource: Maps to the index method, which displays a list of resource items.
- ~~GET /resource/create: Maps to the create method, which displays a form to create a new resource item.~~
- POST /resource: Maps to the store method, which processes the submission of the create form to store a new resource item.
- GET /resource/{resource}: Maps to the show method, which displays the details of a specific resource item.
- ~~GET /resource/{resource}/edit: Maps to the edit method, which displays a form to edit an existing resource item.~~
- PUT / PATCH /resource/{resource}: Maps to the update method, which processes the submission of the edit form to update an existing resource item.
- DELETE /resource/{resource}: Maps to the destroy method, which handles the deletion of a specific resource item.

**Usage example**

Creates a route for each method in the BeaconController class except for the 'edit' and 'create' methods.
```php
use App\Http\Controller\BeaconController;

Route::resource('beacons', BeaconController::class, [
    'except': ['edit', 'create']
]);
```