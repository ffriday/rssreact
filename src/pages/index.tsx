import { ContentLayout, RootLayout, SearchLayout } from '@/components/layout';
import Search from '@/components/search/Search';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import HomeRoute, { THomeProps } from './[search]';

export const getServerSideProps: GetServerSideProps<THomeProps> = (async ({query}) => {
  return { props: { searchQuery: '', urlParams: {} } };
})

export default function Home(params: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <HomeRoute {...params} />
}
