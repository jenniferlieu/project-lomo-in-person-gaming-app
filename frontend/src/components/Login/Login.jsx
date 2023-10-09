<<<<<<< HEAD
import React, { useState } from "react";
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(pass);
    }

    return (
        <div className="login-container">
            <h1 className="mob-head"><strong>Welcome Back!</strong></h1>
            <div className="login-wrapper" >
                <h1 className="des-head"><strong>Welcome<br />Back!</strong></h1>
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

=======
import React, { useState } from "react";
import "./login.css";
import "./fonts/Inkbleed-Regular.ttf";


const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(pass);
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

>>>>>>> fa65e9ebd969ab96a2dd177b9879d6f54b76c04a
export default Login;