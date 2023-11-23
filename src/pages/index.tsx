import { ContentLayout, RootLayout, SearchLayout } from '@/components/layout';
import Search from '@/components/search/Search';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

type THomeProps = {
  test: string;
}

export const getServerSideProps = (async (context) => {
  return { props: { test: 'foo' } }
}) satisfies GetServerSideProps<THomeProps>

export default function Home({test}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log('>>>', test)

  return (
      <RootLayout>
        <SearchLayout>
          <Search test={test}/>
        </SearchLayout>
        <ContentLayout>lol</ContentLayout>
      </RootLayout>
  );
}
