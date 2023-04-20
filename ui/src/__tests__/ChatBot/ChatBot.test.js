import "@testing-library/jest-dom";
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import  ChatBot  from '../../components/pages/ChatBot/ChatBot';

jest.mock("@chatscope/chat-ui-kit-styles/dist/default/styles.css", () => ({

    __esModule: true,
  
    default: "",
  
  }));

describe('ChatBot', () => {
  it('renders a welcome message', () => {
    const { getByText } = render(<ChatBot />);
    const welcomeMessage = getByText(/This tool analyses your input for any programming related terms/i);
    expect(welcomeMessage).toBeInTheDocument();
  });
});
