import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import reset from 'styled-reset'
import Navbar from 'components/Navbar'
import { useRouter } from 'next/router'

export const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    background-color: #e8e3d7;

  }
`
const theme = {
  colors: {
    primaryText: '#4f4f4f',
    secondaryText: '#4070ff',
  },
}

const ChildWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 85px);
`

const Layout = ({ children }: { children: any }) => {
  const router = useRouter()
  const isShow = router.pathname !== '/'

  return (
    <>
      <GlobalStyle />
      <Navbar show={isShow} />
      <ThemeProvider theme={theme}>
        <ChildWrapper>{children}</ChildWrapper>
      </ThemeProvider>
    </>
  )
}

export default Layout
