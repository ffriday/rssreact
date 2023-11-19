import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorMessage from './errorMessage';

const testMessage = 'test-text';

describe('Error handlers', () => {
  it('Error message renders', () => {
    render(<ErrorMessage message={testMessage} />);
    const message = screen.getByText(testMessage);

    expect(message).not.toBeNull();
  });
});
