import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import "./login.css";

const Login = () => {
  const [emailInput, setEmail] = useState("");
  const [passInput, setPass] = useState("");
  const navigate = useNavigate();
  const { setAuthUser, setIsLoggedIn, setUserId } = useAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePassChange = (e) => {
    setPass(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(emailInput, passInput);

    if (emailInput === "test@test.com" && passInput === "testpass") {
      setIsLoggedIn(true);
      console.log("Test log in was successful");
      navigate("/");
    } else {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/login`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailInput,
            password: passInput,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          console.log("Log in successful");
          setUserId(data.user.id);
          console.log(data.user.id);
          setAuthUser(data.token);
          navigate("/");
        } else {
          const data = await response.json();
          const error = data.message;
          console.log(error);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-6xl sm:hidden text-sky-950 bg-transparent text-center">
        <strong>Welcome Back!</strong>
      </h1>
      <div className="fixed overflow-hidden bg-teal-100 text-sky-950 w-screen h-screen top-200 p-8 sm:w-1/3 sm:h-screen sm:right-0">
        <h1 className="text-6xl hidden text-sky-950 sm:block text-center sm:pb-10">
          <strong>Welcome Back!</strong>
        </h1>
        <form onSubmit={handleSubmit} className="text-lg text-left">
          <label htmlFor="email">Email:</label>
          <input value={emailInput} onChange={handleEmailChange} type="email" id="email" name="email" className="w-full p-1 my-2" />
          <label htmlFor="password">Password:</label>
          <input value={passInput} onChange={handlePassChange} type="password" id="password" name="password" className="w-full p-1 my-2" />
          <br />
          <button className="rounded-full bg-sky-900 text-teal-50 px-8 py-2 my-5 mx-auto" type="submit">
            Log In
          </button>
        </form>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-teal-700">
            Stop missing out!
          </Link>
        </p>
        <img src="icons/Loom_Logo_01_Artboard_1.svg" alt="Logo" className="mx-auto d-block" />
      </div>
    </div>
  );
};

export default Login;
