import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import "./login.css";

const Login = () => {
    const [emailInput, setEmail] = useState('');
    const [passInput, setPass] = useState('');
    const navigate = useNavigate();
    const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePassChange = (e) => {
        setPass(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(emailInput, passInput);

        if (emailInput === 'test@test.com' && passInput === 'testpass') {
            setIsLoggedIn(true);
            console.log('Test log in was successful');
            navigate('/');
        }
        else {
            try {
                const response = await fetch('http://localhost/login', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: emailInput,
                        password: passInput
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setIsLoggedIn(true);
                    console.log("Log in successful");
                    navigate('/');
                } else {
                    const data = await response.json();
                    const error = data.message;
                    console.log(error);
                }
            }
            catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div className="login-container">
            <h1 className="mob-head"><strong>Welcome Back!</strong></h1>
            <div className="login-wrapper" >
                <h1 className="des-head"><strong>Welcome<br />Back!</strong></h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        Email:
                    </label>
                    <input value={emailInput} onChange={handleEmailChange} type="email" id="email" name="email" />
                    <label htmlFor="password">
                        Password:
                    </label>
                    <input value={passInput} onChange={handlePassChange} type="password" id="password" name="password" />
                        <button className="sub-button" type="submit">Log In</button>
                </form>
                <p className="text-center pt-4">Don't have an account? <Link to='/signup'>Stop missing out!</Link></p>
            </div>
        </div>
    );
}

export default Login;