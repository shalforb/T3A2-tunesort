// src/__tests__/LoginForm.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../components/LoginForm';
import { BrowserRouter } from 'react-router-dom';
import useLoginUser from '../hooks/useLoginUser';

jest.mock('../hooks/useLoginUser');

describe('LoginForm', () => {
    test('renders Login form and submits correctly', async () => {
        const mockLoginUser = jest.fn().mockResolvedValue({ token: 'dummy-token' });
        useLoginUser.mockReturnValue({
            loginUser: mockLoginUser,
            loading: false,
            error: null,
            success: true,
        });

        render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        );

        const emailInput = screen.getByPlaceholderText(/email address/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const submitButton = screen.getByRole('button', { name: /login/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        fireEvent.click(submitButton);

        expect(mockLoginUser).toHaveBeenCalledWith('test@example.com', 'password123');
        expect(screen.getByText('Logged in successfully!')).toBeInTheDocument();
    });

    test('shows error message on failure', () => {
        useLoginUser.mockReturnValue({
            loginUser: jest.fn(),
            loading: false,
            error: 'Invalid email or password',
            success: false,
        });

        render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        );

        expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
    });
});
