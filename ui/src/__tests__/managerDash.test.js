import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from './../components/pages/Dashboard/Dashboard';

test('renders dashboard page', async () => {
  await render(<Dashboard />);
});
