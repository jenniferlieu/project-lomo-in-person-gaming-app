import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './signup.css';

const Signup = () => {
    const [usernameInput, setUsername] = useState('');
    const [emailInput, setEmail] = useState('');
    const [pass1Input, setPass1] = useState('');
    const [pass2Input, setPass2] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const { setIsLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        if (pass1Input === pass2Input) {
            e.preventDefault();
            console.log('Passwords match');
            console.log(usernameInput, emailInput, pass1Input, passwordsMatch);

            //Call API for signup
            try {
                const response = await fetch('http://localhost/register', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: usernameInput,
                        email: emailInput,
                        password: pass1Input,
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
        } else {
            console.log('Passwords did not match');
        }
    }

    const handlePass1Change = (e) => {
        //Checks if pass2 matches pass1 and updates passwordsMatch
        setPasswordsMatch(e.target.value === pass2Input);
    }

    const handlePass2Change = (e) => {
        //Checks if pass2 matches pass1 and updates passwordsMatch
        setPasswordsMatch(e.target.value === pass1Input);
    }

    const AnimatedButton = ({ p }) => {
        const [shake, setShake] = useState(false);

        const animate = () => {
            if (!passwordsMatch) {
                // Button begins to shake
                setShake(true);
            }
        }

        return (
            <button data-testid="submit-button" type="submit" onClick={animate} className={shake ? `shake submit-button` : `submit-button`}>
                {p}
            </button>
        );

    }

    return (
        <div className="signup-container">
            <h1 className="mob-head"><strong>Never miss out again!</strong></h1>
            <div className="signup-wrapper" >
                <h1 className="des-head"><strong>Never miss<br />out again!</strong></h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='username'>
                        Username:
                    </label>
                    <input value={usernameInput} onChange={(e) => setUsername(e.target.value)} type="username" id="username" name="username" />

                    <label htmlFor='email'>
                        Email:
                    </label>
                    <input value={emailInput} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" />

                    <label htmlFor='pass1'>
                        Password:
                    </label>
                    <input value={pass1Input} onChange={(e) => { setPass1(e.target.value); handlePass1Change(e); }} type="password" id="pass1" name="pass1"/>

                    <label htmlFor='pass2'>
                        Confirm password:
                    </label>
                    <input value={pass2Input} onChange={(e) => { setPass2(e.target.value); handlePass2Change(e) }} type="password" id="pass2" name="pass2" />
                    <AnimatedButton p="Sign Up" />
                    <p className='text-center pt-3'>Already have an account? <Link to='/login'>Jump back in!</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Signup;