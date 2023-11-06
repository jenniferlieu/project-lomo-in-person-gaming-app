import React from 'react';
import { render, fireEvent, screen, } from '@testing-library/react';
import Signup from './components/signup/Signup.jsx';

function signup(user, email, pass1, pass2) {
    const { getByLabelText, container } = render(<Signup />);
    const usernameInput = getByLabelText('Username:');
    const emailInput = getByLabelText('Email:');
    const pass1Input = getByLabelText('Password:');
    const pass2Input = getByLabelText('Confirm password:');
    const subButton = screen.getByTestId('submit-button');

    //"Test user" inputs information
    fireEvent.change(usernameInput, { target: { value: user } })
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(pass1Input, { target: { value: pass1 } });
    fireEvent.change(pass2Input, { target: { value: pass2 } });

    //"Test user" submits form
    fireEvent.click(subButton);
}

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

    // it('should log the input value to the console', () => {
    //     //Creates a spy for 'console.log'
    //     const consoleLogSpy = jest.spyOn(console, 'log');

    //     //Simulates a user signup
    //     signup('test_user', 'test@test.com', 'testpass', 'testpass');

    //     //Check if the console.log method was called with the expected message
    //     expect(consoleLogSpy).toHaveBeenCalled();

    //     consoleLogSpy.mockRestore();
    // });
});