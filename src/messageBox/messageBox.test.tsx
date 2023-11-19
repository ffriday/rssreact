import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import MessageBox from './messageBox';

const testMessage = 'test-text';

it('Renders', () => {
  render(<MessageBox message={testMessage} />);
  const message = screen.getByText(testMessage);

  expect(message).not.toBeNull();
});
