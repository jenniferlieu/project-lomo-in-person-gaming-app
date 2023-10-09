import React, { useState } from "react";
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="login-container">
            <h1><strong>Welcome<br/>Back!</strong></h1>
            <div className="login-wrapper" >
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Email:</p>
                    </label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" />
                    <label>
                        <p>Password:</p>
                    </label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" id="password" name="password" />
                    <div className="submit-button">
                        <button type="submit">Log In</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;