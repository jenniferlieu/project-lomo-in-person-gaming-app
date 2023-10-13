---
sidebar_position: 3
---
# State and API calls
State allows components to manage and update their own data. Unlike props, which are passed from parent to child and are read-only, state is mutable and controlled by the component itself.

`useState` and `useEffect` are two fundamental hooks in React that allow you to manage state and perform side effects in components.

## useState()
**`useState` is used to manage state in functional components. It returns an array with two elements: the current state value and a function to update it.**

In this example, we're using `useState` to maintain the `count` state, and when the button is clicked, it updates the state value in real-time.
```jsx
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Counter;
```

## useEffect()
**`useEffect` is used to perform side effects in components. It takes two arguments: a function to run and an array of dependencies. The function runs when the component mounts and whenever any of the dependencies change.**

How to use in a component:
```jsx
import React, { useState } from 'react';

const MyComponent = () => {
    useEffect(() => {
        // code here
    }, []);

    return ();
}

export default Counter;
```

### Dependency Array 
When you provide a dependency array as the second argument to useEffect, React will monitor the values in that array. If any of those values change between renders, React will re-run the code inside the useEffect.
```jsx
const [count, setCount] = useState(0);

useEffect(() => {
    // This code will run when the component mounts and whenever 'count' changes.
    console.log('Count has changed.');
}, [count]);

return (
    <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
);
```

### Handling State Changes

You can use useEffect to handle state changes and update the UI accordingly. For example, if you have a counter and you want to display a message when the count changes, you can put the code to update the message inside a useEffect that depends on the count state variable.
```jsx
const [count, setCount] = useState(0);
const [message, setMessage] = useState('');

useEffect(() => {
    // This code runs whenever 'count' changes
    setMessage(`Count is now: ${count}`);
}, [count]);

return(
    <div>{message}</div>
);
```

### Performing Side Effects (API Calls)

Besides updating the UI, useEffect is commonly used for performing side effects like **making API requests**, setting up subscriptions, or manipulating the DOM. For example, you can use it to fetch data from an API and update the component's state with the received data.

All routes created in the `api.php` file will build on the `/api/` route. For example, the full '/hello' route will be https://localhost/api/hello. On the frontend, it will be called using only the subpage url `/api/hello`.
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
        };
        
        // call the API using fetch, a builtin http-request package
        // if we use a different http-request package, we can just use that
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