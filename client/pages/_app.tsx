import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from '../store'
import {Provider} from 'react-redux';


function MyApp({ Component, pageProps }: AppProps) {
  const {store, props} = wrapper.useWrappedStore(Component);

  return (
      <Provider store={store}>
          <Component {...pageProps} />
      </Provider>
  )
}

export default MyApp;
