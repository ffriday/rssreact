import { getQuery, getSearchParams } from '@/components/helpers/helpers';
import { ContentLayout, RootLayout, SearchLayout } from '@/components/layout';
import Search from '@/components/search/Search';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export type THomeProps = {
  searchQuery: string;
  urlParams: Record<string, string>;
}

export const getServerSideProps: GetServerSideProps<THomeProps> = (async ({query}) => {
  const urlParams = getSearchParams(query);
  return { props: { searchQuery: getQuery(query.search), urlParams } };
})

export default function HomeRoute({searchQuery, urlParams}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
      <RootLayout>
        <SearchLayout>
          <Search searchQuery={searchQuery} urlParams={urlParams}/>
        </SearchLayout>
        <ContentLayout>lol</ContentLayout>
      </RootLayout>
  );
}
