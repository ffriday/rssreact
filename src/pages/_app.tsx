import ErrorBoundary from '@/components/error/ErrorBoundary';
import { wrapper } from '@/components/store';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

export default function App({ Component, ...rest }: AppProps) {
  const {
    store,
    props: { pageProps },
  } = wrapper.useWrappedStore(rest);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ErrorBoundary>
  );
}
