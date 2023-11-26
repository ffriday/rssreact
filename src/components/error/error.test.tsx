import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ErrorServer from '@/pages/500';
import ErrorNotFound from '@/pages/404';
import DefaultError from '@/pages/error';
import FakeError from './fakeError';
import { act } from 'react-dom/test-utils';

const testMessage = 'test-error';

describe('Error pages', async () => {
  it('Renders 404 page', async () => {
    render(<ErrorNotFound message={testMessage} />);
    const message = screen.getByText(testMessage);

    expect(message).not.toBeNull();
  });

  it('Renders 500 page', async () => {
    render(<ErrorServer message={testMessage} />);
    const message = screen.getByText(testMessage);

    expect(message).not.toBeNull();
  });

  it('Renders error page', async () => {
    render(<DefaultError message={testMessage} />);
    const message = screen.getByText(testMessage);

    expect(message).not.toBeNull();
  });

  it('Renders fakeError page', async () => {
    render(<FakeError />);
    const button = screen.getByText('Error');
    expect(button).not.toBeNull();

    expect(() => fireEvent.click(button)).toThrowError('Test error');
  });
});
