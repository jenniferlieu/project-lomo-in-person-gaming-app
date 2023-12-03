import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import "./signup.css";

const Signup = () => {
  const [usernameInput, setUsername] = useState("");
  const [emailInput, setEmail] = useState("");
  const [pass1Input, setPass1] = useState("");
  const [pass2Input, setPass2] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const { setAuthUser, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (pass1Input === pass2Input) {
      e.preventDefault();
      console.log("Passwords match");
      console.log(usernameInput, emailInput, pass1Input, passwordsMatch);

      //Call API for signup
      try {
        const response = await fetch(
          "https://hku6k67uqeuabts4pgtje2czy40gldpa.lambda-url.us-east-1.on.aws/register",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: usernameInput,
              email: emailInput,
              password: pass1Input,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          console.log("Log in successful");
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
    } else {
      console.log("Passwords did not match");
    }
  };

  const handlePass1Change = (e) => {
    //Checks if pass2 matches pass1 and updates passwordsMatch
    setPasswordsMatch(e.target.value === pass2Input);
  };

  const handlePass2Change = (e) => {
    //Checks if pass2 matches pass1 and updates passwordsMatch
    setPasswordsMatch(e.target.value === pass1Input);
  };

  const AnimatedButton = ({ p }) => {
    const [shake, setShake] = useState(false);

    const animate = () => {
      if (!passwordsMatch) {
        // Button begins to shake
        setShake(true);
      }
    };

    return (
      <button
        data-testid="submit-button"
        type="submit"
        onClick={animate}
        className={`rounded-full bg-sky-900 text-teal-50 px-8 py-2 my-5 mx-auto ${
          shake ? "shake" : ""
        }`}
      >
        {p}
      </button>
    );
  };

  return (
    <div>
      <h1 className="shrink text-6xl sm:hidden text-sky-950 bg-transparent text-center">
        <strong>Never miss out again!</strong>
      </h1>
      <div className="fixed overflow-hidden bg-teal-100 text-sky-950 w-screen h-screen top-200 p-8 sm:w-1/3 sm:h-screen sm:right-0">
        <h1 className="text-6xl hidden text-sky-950 sm:block text-center sm:pb-10">
          <strong>Never miss out again!</strong>
        </h1>
        <form onSubmit={handleSubmit} className="text-lg text-left">
          <label htmlFor="username">Username:</label>
          <input
            value={usernameInput}
            onChange={(e) => setUsername(e.target.value)}
            type="username"
            id="username"
            name="username"
            className="w-full p-1 my-2"
          />

          <label htmlFor="email">Email:</label>
          <input
            value={emailInput}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            className="w-full p-1 my-2"
          />

          <label htmlFor="pass1">Password:</label>
          <input
            value={pass1Input}
            onChange={(e) => {
              setPass1(e.target.value);
              handlePass1Change(e);
            }}
            type="password"
            id="pass1"
            name="pass1"
            className="w-full p-1 my-2"
          />

          <label htmlFor="pass2">Confirm password:</label>
          <input
            value={pass2Input}
            onChange={(e) => {
              setPass2(e.target.value);
              handlePass2Change(e);
            }}
            type="password"
            id="pass2"
            name="pass2"
            className="w-full p-1 my-2"
          />
          <AnimatedButton p="Sign Up" />
          <p className="text-center pt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-teal-700">
              Jump back in!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
