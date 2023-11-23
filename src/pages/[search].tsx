import { getQuery } from '@/components/helpers/helpers';
import { ContentLayout, RootLayout, SearchLayout } from '@/components/layout';
import Search from '@/components/search/Search';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

type THomeProps = {
  searchQuery: string;
}

export const getServerSideProps: GetServerSideProps<THomeProps> = (async ({query}) => {
  return { props: { searchQuery: getQuery(query.search) } };
})

export default function Home({searchQuery}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
      <RootLayout>
        <SearchLayout>
          <Search searchQuery={searchQuery}/>
        </SearchLayout>
        <ContentLayout>lol</ContentLayout>
      </RootLayout>
  );
}
