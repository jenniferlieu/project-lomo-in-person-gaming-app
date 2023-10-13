---
sidebar_position: 4
---
# Conditional rendering

Using if statements to render a specific component or different component depending on who's logged in.

```jsx
// src/Greeting.js

import React from 'react';

const Greeting = () => {
    const isLoggedIn = false;
    if (isLoggedIn) {
        return <h1>Welcome back!</h1>;
    } else {
        return <h1>Please sign up.</h1>;
    }
};

export default Greeting;
```

The terniary operator `{condition ? trueExpression : falseExpression}` can also be used in JSX.
```jsx
// src/Greeting.js

import React from 'react';

const Greeting = () => {
    const isLoggedIn = false;

    return(
        <div>
            {isLoggedIn ? <p>Welcome, User!</p> : <p>Please log in.</p>}
        </div>
    );
};

export default Greeting;
```