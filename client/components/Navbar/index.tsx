import { FC } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Logo from '../Logo'
import Avatar from 'components/Avatar'

const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.25rem 3.125rem;
  border-bottom: 2px solid #ede1c7;
`

const UsernameWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`
const Username = styled.p`
  font-size: 1.125rem;
  font-weight: bold;
  margin-right: 0.625rem;
`

const Navbar: FC<{ show: boolean }> = ({ show }) => {
  return (
    <NavbarWrapper>
      {show ? (
        <>
          <h2>
            <Logo />
          </h2>

          <Link href="/profile/1" passHref>
            <UsernameWrapper>
              <Username>Barbonov Artem</Username>
              <Avatar
                url={'https://www.blexar.com/avatar.png'}
                width="40px"
                height="40px"
              />
            </UsernameWrapper>
          </Link>
        </>
      ) : (
        <div />
      )}
    </NavbarWrapper>
  )
}

export default Navbar
