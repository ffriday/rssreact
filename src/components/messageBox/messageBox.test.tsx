import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import MessageBox from './messageBox';

const testMessage = 'test-text';

describe('Message box', async () => {
  it('Renders', () => {
    render(<MessageBox message={testMessage} />);
    const message = screen.getByText(testMessage);

    expect(message).not.toBeNull();
  });
});
