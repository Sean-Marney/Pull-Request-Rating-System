import ManagerHelp from '../../components/pages/ManagerHelp/ManagerHelp';
import "@testing-library/jest-dom";
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import emailjs from "emailjs-com";

jest.mock('emailjs-com');

describe('ManagerHelp', () => {
  it('renders the ManagerHelp component', () => {
    render(<ManagerHelp />);
    const pageTitle = screen.getByRole('heading', { name: 'Manager Help' });
    expect(pageTitle).toBeInTheDocument();
  });

  it('sends an email when the form is submitted', async () => {
    const mockSendForm = jest.fn().mockResolvedValue({});

    emailjs.sendForm.mockImplementationOnce(mockSendForm);

    render(<ManagerHelp />);
    const nameInput = screen.getByTestId('name-label');
    const emailInput = screen.getByTestId('email-label');
    const messageInput = screen.getByTestId('message-label');
    const sendButton = screen.getByRole('button', { name: 'Send' });

    fireEvent.change(nameInput.querySelector('input'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(emailInput.querySelector('input'), {
      target: { value: 'johndoe@example.com' },
    });
    fireEvent.change(messageInput.querySelector('textarea'), {
      target: { value: 'This is a test message.' },
    });
    fireEvent.click(sendButton);
    expect(mockSendForm).toHaveBeenCalledTimes(1);
    expect(mockSendForm).toHaveBeenCalledWith(
      "service_ddgstfy",
      "template_e4arkwr",
      expect.any(HTMLFormElement),
      "7coZYu5AFawFbosmz"
    );
  });
});