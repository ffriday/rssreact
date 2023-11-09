import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Search from './Search';
import { BrowserRouter } from 'react-router-dom';

describe('Search component', () => {
  it('Renders correcctly', () => {
    render(
      <BrowserRouter>
        <Search defaultValue="" />
      </BrowserRouter>
    );
    const searchButton = screen.queryByText('Search');
    const input = screen.findByPlaceholderText('Type something');
    expect(searchButton).not.toBeNull();
    expect(input).not.toBeNull();
  });
});
