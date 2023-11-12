import { describe, it, expect } from 'vitest';
import { getErrorMessage } from '../helpers/helpers';
import { SearchContext } from '../layouts/RootLayout';

const testMessage = 'test-message';

describe('Function works', async () => {
  it('Returns error message', async () => {
    const message = getErrorMessage(new Error(testMessage));
    expect(message === testMessage).toBeTruthy();
  });

  it('Creates search context', async () => {
    const searchContext = SearchContext;
    expect(searchContext !== undefined).toBeTruthy();
  });
});
