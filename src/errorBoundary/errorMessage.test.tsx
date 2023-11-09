import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorMessage from './errorMessage';

const testMessage = 'test-text';

it('Renders', () => {
  render(<ErrorMessage message={testMessage} />);
  const message = screen.getByText(testMessage);

  expect(message).not.toBeNull();
});
