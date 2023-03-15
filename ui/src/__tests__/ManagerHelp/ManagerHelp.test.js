import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ManagerHelp from '../../components/pages/ManagerHelp/ManagerHelp';
import '@testing-library/jest-dom/extend-expect';

test('renders ManagerHelp component and fills in form fields', () => {
    render(<ManagerHelp />);
    const nameField = screen.getByTestId('name-field');
    const messageField = screen.getByTestId('message-field');
  
    fireEvent.change(nameField, { target: { value: 'John Doe' } });
    fireEvent.change(messageField, { target: { value: 'This is a test message' } });
  
    expect(nameField.value).toBe('John Doe');
    expect(messageField.value).toBe('This is a test message');
  });