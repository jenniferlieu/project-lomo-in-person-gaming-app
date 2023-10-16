import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Signup from '../src/components/signup/Signup.jsx';

function signup(user, email, pass1, pass2) {
    const { getByLabelText, getByText } = render(<Signup />);
    const usernameInput = getByLabelText('Username:');
    const emailInput = getByLabelText('Email:');
    const pass1Input = getByLabelText('Password:');
    const pass2Input = getByLabelText('Confirm password:');
    const subButton = getByText('Sign Up');

    //"Test user" inputs information
    fireEvent.change(usernameInput, { taret: { value: user } })
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(pass1Input, { target: { value: pass1 } });
    fireEvent.change(pass2Input, { target: { value: pass2 } });

    //"Test user" submits form
    fireEvent.click(subButton);
}

//Creates a spy for 'console.log'
const consoleLogSpy = jest.spyOn(console, 'log');

describe('Sign Up Component', () => {
    it('renders the signup page', () => {
        const { getByText, getByLabelText } = render(<Signup />);

        //Makes sure the form is showing up on the page

        expect(getByText('Username:')).toBeInTheDocument();
        expect(getByLabelText('Email:')).toBeInTheDocument();
        expect(getByLabelText('Password:')).toBeInTheDocument();
        expect(getByLabelText('Confirm password:')).toBeInTheDocument();
        expect(getByText('Sign Up')).toBeInTheDocument();
    });

    it('handles a valid form input and submission', () => {
        signup('test_user', 'test@test.com', 'testpass', 'testpass');
    });

    it('should log the input value to the console', () => {
        //Perform a test sign up
        signup('test_user', 'test@test.com', 'testpass', 'testpass');

        //Check if the console.log method was called with the expected message
        expect(consoleLogSpy).toHaveBeenCalledWith('test_user', 'test@test.com', 'testpass', 'testpass');
        expect(consoleLogSpy).toHaveBeenCalledWith('Passwords match');

        consoleLogSpy.mockRestore();
    });

    it('should display a button animation upon invalid entry', () => {
        //Perform a test sign up with mismatching data
        signup('test_user', 'test@test.com', 'testpass', 'wrongpass');

        //Check if the console.log method was called with the expected message
        expect(consoleLogSpy).toHaveBeenCalledWith('test_user', 'test@test.com', 'testpass', 'wrongpass');
        expect(consoleLogSpy).toHaveBeenCalledWith('Passwords did not match');

        //Checks if the animated element has the animated id
        expect(subButton).toHaveClass('animated');

        consoleLogSpy.mockRestore();
    });
});