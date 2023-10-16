---
sidebar_position: 1
---
# Frontend Unit Tests

## App

## Account Creation

### Login

<details>
    <summary>Render Test</summary>
    <div>
        <em>Tests if the form properly renders on the page.</em>
        <br/><br/>
        <strong>Expects:</strong>
        <ul>
            <li>An input field labeled "Email:"</li>
            <li>An input field labeled "Password:</li>
            <li>A button with the text "Log In"</li>
        </ul>
    </div>
</details>

<details>
    <summary>Submission Test</summary>
    <div>
        <em>Tests if the inputted data can be properly submitted.</em>
        <br/><br/>
        <strong>Inputs:</strong>
        <ul>
            <li>Email: "test@test.com"</li>
            <li>Password: "testpass"</li>
            <li>A click on the "Log In" button</li>
        </ul>
    </div>
</details>

<details>
    <summary>Console Log Test</summary>
    <div>
        <em>Tests if the submitted data is written in the console.</em>
        <br/><br/>
        <strong>Inputs:</strong>
        <ul>
            <li>Email: "test@test.com"</li>
            <li>Password: "testpass"</li>
        </ul>
        <br/>
        <strong>Expected:</strong>
        <ul>
            <li>Email: "test@test.com"</li>
            <li>Password: "testpass"</li>
        </ul>
    </div>
</details>
