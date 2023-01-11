import "../styles/globals.css"
import type { AppProps } from "next/app"
import { wrapper } from "../store"
import { Provider } from "react-redux"
import ErrorBoundary from "../components/errorBoundary"

function MyApp({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(Component)

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </Provider>
  )
}

export default MyApp
