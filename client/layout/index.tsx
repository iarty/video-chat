import { createGlobalStyle, ThemeProvider } from 'styled-components'
import reset from 'styled-reset'

export const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    background-color: #e8e3d7;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`
const theme = {
  colors: {
    primaryText: '#4f4f4f',
    secondaryText: '#4070ff',
  },
}

const Layout = ({ children }: { children: any }) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  )
}

export default Layout
