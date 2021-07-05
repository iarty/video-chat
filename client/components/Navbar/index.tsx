import { FC } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Logo from '../Logo'
import Image from 'next/image'
import Avatar from 'public/static/broody.png'

const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 50px;
`

const UsernameWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`
const Username = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
`
const Navbar: FC = () => {
  return (
    <NavbarWrapper>
      <h2>
        <Logo />
      </h2>

      <Link href="/profile/1" passHref>
        <UsernameWrapper>
          <Image width="40px" height="40px" src={Avatar} alt="userPhoto" />
          <Username>Barbonov Artem</Username>
        </UsernameWrapper>
      </Link>
    </NavbarWrapper>
  )
}

export default Navbar
