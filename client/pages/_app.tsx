import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from 'src/layout'
import { wrapper } from '../src/redux/store'

const MyApp = wrapper.withRedux(({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
})

export default MyApp
