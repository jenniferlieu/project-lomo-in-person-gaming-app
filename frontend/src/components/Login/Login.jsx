import React, { useState } from "react";
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePassChange = (e) => {
        setPass(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, pass);

        //Make an API call to verify the credentials
        try {
            const response = await fetch('http://localhost/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                //Upon a successful call
                alert("Log in successful");
            }
            else {
                //Upon a failed call
                alert("Log in unsuccessful");
            }
        }
        catch (error) {
            console.error("API call error: ");
            alert("An error has occured during log in");
        }
    };

    return (
        <div className="login-container">
            <h1 className="mob-head"><strong>Welcome Back!</strong></h1>
            <div className="login-wrapper" >
                <h1 className="des-head"><strong>Welcome<br />Back!</strong></h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        <p>Email:</p>
                    </label>
                    <input value={email} onChange={handleEmailChange} type="email" id="email" name="email" />
                    <label htmlFor="password">
                        <p>Password:</p>
                    </label>
                    <input value={pass} onChange={handlePassChange} type="password" id="password" name="password" />
                    <div className="submit-button">
                        <button type="submit">Log In</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;