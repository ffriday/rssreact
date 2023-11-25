import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import HomeRoute, { THomeProps } from './[search]';
import { getItem, getRunningQueriesThunk, getSearch, wrapper } from '@/components/store';
import { getSearchParams, parseParam } from '@/components/helpers/helpers';

export const getServerSideProps: GetServerSideProps<THomeProps> =
  wrapper.getServerSideProps((store) => async ({ query }) => {
    const search = '';
    const urlParams = getSearchParams(query);
    store.dispatch(
      getSearch.initiate({
        query: search,
        size: urlParams.pageSize,
        page: urlParams.pageNumber,
      })
    );
    if(urlParams.uid) {
      store.dispatch(getItem.initiate({uid: urlParams.uid}))
    }
    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return { props: { searchQuery: search, urlParams } };
  });

export default function Home(params: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <HomeRoute {...params} />
}
