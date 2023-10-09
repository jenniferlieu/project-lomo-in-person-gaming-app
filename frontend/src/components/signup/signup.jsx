import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import './signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(pass1);
        console.log(pass2);
        if (pass1 != pass2) {
            console.log('Password did not match');
        } else {
            console.log('Passwords match');
        }
    }

    return (
        <div className="signup-container">
            <h1 className="mob-head"><strong>Never miss out again!</strong></h1>
            <div className="signup-wrapper" >
                <h1 className="des-head"><strong>Never miss<br />out again!</strong></h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Email:</p>
                    </label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" />
                    <label>
                        <p>Password:</p>
                    </label>
                    <input value={pass1} onChange={(e) => setPass1(e.target.value)} type="password" id="password1" name="password1" />
                    <label>
                        <p>Confirm password:</p>
                    </label>
                    <input value={pass2} onChange={(e) => setPass2(e.target.value)} type="password" id="password2" name="password2" />
                    <div className="submit-button">
                        <button type="submit">Join</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;