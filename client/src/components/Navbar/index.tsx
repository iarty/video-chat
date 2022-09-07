import Link from 'next/link'
import styled from 'styled-components'
import Logo from '../Logo'
import Avatar from 'src/components/Avatar'
import { NextPage } from 'next'
import { withQueryResolver } from '../../hoc/withQueryResolver'
import { useGetUserInfoQuery } from '../../redux/api/user.api'
import { useRequiredTypedSelector } from '../../hooks/useRequiredSelector'
import { selectUser } from '../../redux/slices/userSlice'

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
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: 1.125rem;
  font-weight: bold;
  margin-right: 0.625rem;
`

interface IProps {
  show: boolean
}

const Navbar: NextPage<IProps> = ({ show }) => {
  const {
    user: { fullname, id, avatarUrl },
  } = useRequiredTypedSelector(selectUser)

  return (
    <NavbarWrapper>
      {show ? (
        <>
          <h2>
            <Logo />
          </h2>

          <Link href={`/profile/${id}`} passHref>
            <UsernameWrapper>
              <Username>{fullname}</Username>
              <Avatar url={avatarUrl} width="40px" height="40px" />
            </UsernameWrapper>
          </Link>
        </>
      ) : (
        <div />
      )}
    </NavbarWrapper>
  )
}

const WithUserQuery = withQueryResolver(useGetUserInfoQuery)(Navbar)

export const WithUserQueryNavbar: NextPage<IProps> = ({ show }) => {
  return <WithUserQuery queryArg={''} disableLoading={!show} show={show} />
}

export default WithUserQueryNavbar
