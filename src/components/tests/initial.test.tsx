import { describe, it, expect } from 'vitest';
import { getSearchParams } from '../helpers/helpers';

const testsUid = '123';

describe('Tests run', async () => {
  it('Tests work correctly', async () => {
    expect(true).toBeTruthy();
  });

  it('Helpers work', async () => {
    const res = getSearchParams({uid: testsUid})
    expect(res.uid === testsUid && res.pageNumber === '' && res.pageSize === '').toBeTruthy();
  });
});
