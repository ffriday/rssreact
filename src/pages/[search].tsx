import AstroItem from '@/components/content/AstroItem';
import AstroObjectList from '@/components/content/AstroObjectList';
import FakeError from '@/components/error/fakeError';
import { parseParam, getSearchParams } from '@/components/helpers/helpers';
import { ContentLayout, RootLayout, SearchLayout } from '@/components/layout';
import Search from '@/components/search/Search';
import {
  getItem,
  getRunningQueriesThunk,
  getSearch,
  wrapper,
} from '@/components/store';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export type THomeProps = {
  searchQuery: string;
  urlParams: Record<string, string>;
};

export const getServerSideProps: GetServerSideProps<THomeProps> =
  wrapper.getServerSideProps((store) => async ({ query }) => {
    const search = parseParam(query.search);
    const urlParams = getSearchParams(query);
    store.dispatch(
      getSearch.initiate({
        query: search,
        size: urlParams.pageSize,
        page: urlParams.pageNumber,
      })
    );
    if (urlParams.uid) {
      store.dispatch(getItem.initiate({ uid: urlParams.uid }));
    }
    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return { props: { searchQuery: search, urlParams } };
  });

export default function HomeRoute({
  searchQuery,
  urlParams,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
      <RootLayout>
        <SearchLayout>
          <Search searchQuery={searchQuery} />
          <FakeError />
        </SearchLayout>
        <ContentLayout>
          <AstroObjectList />
          {urlParams.uid && <AstroItem />}
        </ContentLayout>
      </RootLayout>
  );
}
