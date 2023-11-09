import { fireEvent, render, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import Pagination from './pagination';

const baseNumber = 10;
let location = '';

describe('Pagination', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Pagination
          firstPage={false}
          lastPage={false}
          numberOfElements={baseNumber}
          pageNumber={Math.floor(baseNumber / 2)}
          pageSize={baseNumber}
          totalElements={baseNumber * baseNumber}
          totalPages={baseNumber}
        />
      </BrowserRouter>
    );
  });

  it('Renders', () => {
    expect(screen.queryByLabelText('Items:')).not.toBeNull();
    expect(screen.findAllByRole('option')).not.toBeNull();
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
});
