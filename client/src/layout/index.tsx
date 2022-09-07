import styled, {
  createGlobalStyle,
  ThemeProvider,
  css,
} from 'styled-components'
import reset from 'styled-reset'
import { useRouter } from 'next/router'
import WithUserQueryNavbar from '../components/Navbar'
import { theme } from '@/styles/theme'

export const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    background-color: #e8e3d7;

  }
`

const ChildWrapper = styled.div<{ container: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 87px);
  ${({ container }) =>
    container &&
    css`
      margin-left: 80px;
      margin-right: 80px;
    `}
`

const Layout = ({ children }: { children: any }) => {
  const router = useRouter()
  const isShow = router.pathname !== '/'

  return (
    <>
      <GlobalStyle />
      <WithUserQueryNavbar show={isShow} />
      <ThemeProvider theme={theme}>
        <ChildWrapper container={router.pathname !== '/rooms/[id]'}>
          {children}
        </ChildWrapper>
      </ThemeProvider>
    </>
  )
}

export default Layout
