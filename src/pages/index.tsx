import { ContentLayout, RootLayout, SearchLayout } from '@/components/layout';
import Search from '@/components/search/Search';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export type THomeProps = {
  searchQuery: string;
}

export const getServerSideProps: GetServerSideProps<THomeProps> = (async ({query}) => {
  return { props: { searchQuery: '' } };
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
