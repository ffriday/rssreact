import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen, act } from '@testing-library/react';
import Search from './Search';
import { BrowserRouter } from 'react-router-dom';
import { LSKey } from '../constants/types';
import { loadLastSearch } from '../helpers/helpers';

const valueForInput = 'test-text';
const valueForLS = `second-${valueForInput}`;

describe('Search component', () => {
  beforeEach(() => {
    window.localStorage.setItem(LSKey.lastSearch, valueForLS);
    render(
      <BrowserRouter>
        <Search defaultValue={loadLastSearch()} />
      </BrowserRouter>
    );
  });

  it('Renders', () => {
    const searchButton = screen.getByRole('button');
    const input = screen.getByRole('searchbox');

    expect(searchButton).not.toBeNull();
    expect(input).not.toBeNull();
  });

  it('Loads value from LS', () => {
    expect(screen.queryByDisplayValue(valueForLS)).not.toBeNull();
  });

  it('Saves value to LS', () => {
    const searchButton = screen.getByRole('button');
    const input = screen.getByRole('searchbox');

    act(() => {
      fireEvent.change(input, { target: { value: valueForInput } });
      fireEvent.click(searchButton);
    });

    expect(screen.queryByDisplayValue(valueForInput)).not.toBeNull();
    expect(screen.queryByDisplayValue(valueForLS)).toBeNull();
    expect(
      window.localStorage.getItem(LSKey.lastSearch) === valueForInput
    ).toBeTruthy();
  });
});
