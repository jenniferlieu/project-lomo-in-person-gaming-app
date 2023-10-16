import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from './components/Login/Login';

function login(email, password) {
    const { getByLabelText, getByText } = render(<Login />);
        const emailInput = getByLabelText('Email:');
        const passInput = getByLabelText('Password:');
        const subButton = getByText('Log In');

        //"Test user" inputs information
        fireEvent.change(emailInput, { target: { value: 'test@test.com ' } });
        fireEvent.change(passInput, { target: { value:'testpass' } });

        //"Test user" submits form
        fireEvent.click(subButton);
}

describe('Login Component', () => {
    it('renders the login page', () => {
        const { getByText, getByLabelText } = render(<Login />);

        //Makes sure the form is showing up on the page
        expect(getByText('Log In')).toBeInTheDocument();
        expect(getByLabelText('Email:')).toBeInTheDocument();
        expect(getByLabelText('Password:')).toBeInTheDocument();
    });

    it('handles form input and submission', () => {
        login('test@test.com','testpass');
    });

    it('should log the input value to the console', () => {
        //Creates a spy for 'console.log'
        const consoleLogSpy = jest.spyOn(console, 'log');

        //Perform a test login
        login('test@test.com','testpass');        

        //Check if the console.log method was called with the expected message
        expect(consoleLogSpy).toHaveBeenCalledWith('test@test.com', 'testpass');

        consoleLogSpy.mockRestore();
    });
});