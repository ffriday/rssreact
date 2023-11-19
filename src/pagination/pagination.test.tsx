import { fireEvent, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import Pagination from './pagination';
import { renderWithProviders } from '../tests/renderer';

let location = '';

describe('Pagination', () => {
  beforeEach(() => {
    renderWithProviders(
      <BrowserRouter>
        <Pagination />
      </BrowserRouter>
    );
  });

  it('Renders', () => {
    expect(screen.queryByLabelText('Items:')).not.toBeNull();
  });

  it('Changes url', () => {
    location = window.location.href;
    const prev = screen.getByText('<-');
    const next = screen.getByText('->');

    act(() => {
      fireEvent.click(prev);
    });
    expect(location !== window.location.href).toBeTruthy();

    location = window.location.href;
    act(() => {
      fireEvent.click(next);
    });
    expect(location !== window.location.href).toBeTruthy();
  });

  it('Not changing url on click', async () => {
    location = window.location.href;
    const sizeSelct = await screen.findByRole('combobox');

    act(() => {
      fireEvent.click(sizeSelct);
    });
    expect(location === window.location.href).toBeTruthy();
  });
});
