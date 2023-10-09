import React, {useState} from "react";

const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }
    
    return (
        <div className="login-wrapper">
            <form onSubmit={handleSubmit}>
                <label for="email">
                    Email:
                </label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" />
                <label>
                    Password:
                </label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" id="password" name="password" />
                <div>
                    <button type="submit">Log In</button>
                </div>
            </form>
        </div>
    );
}

export default Login;