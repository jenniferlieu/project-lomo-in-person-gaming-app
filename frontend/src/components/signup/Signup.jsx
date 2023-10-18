import React, { useState } from 'react';
import './signup.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pass1 === pass2) {
            console.log('Passwords match');
        } else {
            console.log('Passwords did not match');
        }
    }

    const handlePass1Change = (e) => {
        //Checks if pass2 matches pass1 and updates passwordsMatch
        setPasswordsMatch(e.target.value === pass2);
    }

    const handlePass2Change = (e) => {
        //Checks if pass2 matches pass1 and updates passwordsMatch
        setPasswordsMatch(e.target.value === pass1);
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
            <button data-testid="submit-button" type="submit" onClick={animate} className={shake ? `shake` : null}>
                {p}
            </button>
        );

    }


    //need to add a 'username' field
    return (
        <div className="signup-container">
            <h1 className="mob-head"><strong>Never miss out again!</strong></h1>
            <div className="signup-wrapper" >
                <h1 className="des-head"><strong>Never miss<br />out again!</strong></h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='username'>
                        <p>Username:</p>
                    </label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="username" id="username" name="username" />

                    <label htmlFor='email'>
                        <p>Email:</p>
                    </label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" />

                    <label htmlFor='pass1'>
                        <p>Password:</p>
                    </label>
                    <input value={pass1} onChange={(e) => { setPass1(e.target.value); handlePass1Change(e); }} type="password" id="pass1" name="pass1"
                    />

                    <label htmlFor='pass2'>
                        <p>Confirm password:</p>
                    </label>
                    <input value={pass2} onChange={(e) => { setPass2(e.target.value); handlePass2Change(e) }} type="password" id="pass2" name="pass2" />

                    <div className='submit-button'> 
                    <AnimatedButton p="Sign Up" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;