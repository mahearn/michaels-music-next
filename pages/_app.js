import useGlobalState from '../store/global-state';
import Context from '../store/context';
import Layout from '../components/layout';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const store = useGlobalState();

  return (
    <Context.Provider value={store}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </Context.Provider>
  );
}

export default MyApp;
