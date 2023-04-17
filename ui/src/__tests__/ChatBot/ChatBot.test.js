import "@testing-library/jest-dom";
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import  ChatBot  from '../../components/pages/ChatBot/ChatBot';
describe('ChatBot', () => {
  it('renders a welcome message', () => {
    const { getByText } = render(<ChatBot />);
    const welcomeMessage = getByText(/welcome/i);
    expect(welcomeMessage).toBeInTheDocument();
  });
   });
