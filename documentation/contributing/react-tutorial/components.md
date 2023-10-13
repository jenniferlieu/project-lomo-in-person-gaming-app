---
sidebar_position: 2
---
# Components
## Create a component
Create a component `.js` file with the same name as the function.

Variables are called 'Props' in React and can be defined in curly brackets. You can also set default props as well.

```jsx
// src/Greeting.js

import React from 'react';

const Greeting = ({firstName, lastName}) => {
    return (
        <div>
            <h1>Hello, {firstName} {lastName}!</h1>
        </div>
    );
};

Greeting.defaultProps = {
    firstName: "John",
    lastName: "Doe",
};

export default Greeting;
```

## Import component

Imports are relative to the location of the parent component.

To pass props into the component, just list them inside the component's tag.

```jsx
// src/HelloPage.js

import React from 'react';
import Greeting from './Greeting'; // import component

const HelloPage = () => {
    return (
        <div>
            <Greeting firstName="Jane" lastName="Doe" />
        </div>
    );
};

export default Greeting;
```