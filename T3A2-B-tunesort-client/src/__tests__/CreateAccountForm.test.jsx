import { render, screen, fireEvent } from '@testing-library/react';
import CreateAccountForm from '../components/CreateAccountForm';
import { BrowserRouter } from 'react-router-dom';
import useCreateUser from '../hooks/useCreateUser';

jest.mock('../hooks/useCreateUser');

describe('CreateAccountForm', () => {
    test('renders Create Account form and submits correctly', async () => {
        const mockCreateUser = jest.fn().mockResolvedValue({ email: 'test@example.com' });
        useCreateUser.mockReturnValue({
            createUser: mockCreateUser,
            loading: false,
            error: null,
            success: true,
        });

        render(
            <BrowserRouter>
                <CreateAccountForm />
            </BrowserRouter>
        );

        const emailInput = screen.getByPlaceholderText(/email address/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const submitButton = screen.getByRole('button', { name: /create account/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        fireEvent.click(submitButton);

        expect(mockCreateUser).toHaveBeenCalledWith('test@example.com', 'password123');
        expect(screen.getByText('User created successfully!')).toBeInTheDocument();
    });

    test('shows error message on failure', () => {
        useCreateUser.mockReturnValue({
            createUser: jest.fn(),
            loading: false,
            error: 'Failed to create user',
            success: false,
        });

        render(
            <BrowserRouter>
                <CreateAccountForm />
            </BrowserRouter>
        );

        expect(screen.getByText('Failed to create user')).toBeInTheDocument();
    });
});
