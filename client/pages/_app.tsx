import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from 'layout'
import { setupInterceptors } from '../core/request'

const MyApp = ({ Component, pageProps }: AppProps) => {
  setupInterceptors()
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
export default MyApp
