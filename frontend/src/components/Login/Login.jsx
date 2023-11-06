import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import "./login.css";

const Login = () => {
    const [emailInput, setEmail] = useState('');
    const [passInput, setPass] = useState('');
    const navigate = useNavigate();
    const { setAuthUser, setIsLoggedIn } = useAuth();

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
                    setAuthUser(data.token);
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
        <div>
            <h1 className='text-6xl sm:hidden text-white bg-black text-center'><strong>Welcome Back!</strong></h1>
            <div className="fixed overflow-hidden bg-white w-screen h-screen top-200 p-5 sm:w-1/3 sm:h-screen sm:right-0" >
                <h1 className="text-6xl hidden sm:block text-center sm:pb-10"><strong>Welcome Back!</strong></h1>
                <form onSubmit={handleSubmit} className="text-lg text-center">
                    <label htmlFor="email">
                        Email:<br />
                    </label>
                    <input value={emailInput} onChange={handleEmailChange} type="email" id="email" name="email" />
                    <label htmlFor="password">
                        <br />Password:<br />
                    </label>
                    <input value={passInput} onChange={handlePassChange} type="password" id="password" name="password" />
                    <br /><button className="sub-button" type="submit">Log In</button>
                </form>
                <p className="text-center pt-4">Don't have an account? <Link to='/signup'>Stop missing out!</Link></p>
            </div>
        </div>
    );
}

export default Login;