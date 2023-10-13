---
sidebar_position: 3
---
# Event Handling

Events are like when a user clicks a button. That button click needs to be handled.

In this example, when a button is clicked, it calls the function `handleClick()`, and it will display an alert saying 'Button clicked!'

```jsx
// src/Form.js

import React from 'react';

const Form = () => {
    function handleClick {
        alert('Button clicked!');
    }

    return(
        <button onClick={handleClick}>Click me</button>
    );
};

export default Form;
```