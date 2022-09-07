import styled from 'styled-components'
import { EllipsisVIcon, HandPeaceIcon } from 'react-line-awesome'
import { useRouter } from 'next/router'
import Button from 'src/components/Button'
import User from 'src/components/User'
import Link from 'next/link'
import BackButton from '../BackButton'
import { NextPage } from 'next'

const RoomsPageWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 3rem);
  margin-top: 3rem;
`
const RoomsPageInner = styled.div`
  background-color: #fff;
  height: 100%;
  border-radius: 50px 50px 0 0;
  padding: 40px;
`

const RoomTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledButton = styled(Button)`
  color: #f94848;
  font-weight: 500;
`
const RoomTitle = styled.div`
  font-size: 32px;
  font-weight: bold;
`

const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const AvatarBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div:nth-of-type(2) {
    font-weight: bold;
    margin: 0 30px;
    p:first-child {
      font-size: 32px;
    }

    p:last-child {
      font-size: 14px;
      margin-top: 5px;
      color: #969696;
      opacity: 0.7;
    }
  }
`

const FollowersWrapper = styled.div`
  display: flex;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  justify-content: space-between;
`

const FollowInner = styled.div`
  text-align: center;
  margin: 10px;
  p:first-child {
    font-weight: bold;
    font-size: 25px;
  }
  p:last-child {
    color: ${({ theme }) => theme.colors.primaryText};
    font-weight: bold;
    font-size: 14px;
  }
`

const UserDescriptionWrapper = styled.div`
  font-size: 1.125rem;
  margin-top: 2rem;
  line-height: 1.875rem;
`

const OutlinedButton = styled(Button)`
  background-color: transparent;
  border: 1px solid #6881e7;
  color: #6881e7;
  padding-top: 5px;
  padding-bottom: 5px;
  &:hover {
    background-color: #6881e7;
    color: #fff;
  }
`

const StyledEllipsis = styled(EllipsisVIcon)`
  font-size: 24px;
  color: #969696;
  cursor: pointer;
`

interface IRoomsProps {
  title: string
  users: string[]
}

const RoomPage: NextPage<IRoomsProps> = ({ title, users = [1] }) => {
  const router = useRouter()
  const { id } = router.query
  return (
    <RoomsPageWrap>
      <BackButton container href="/rooms" title="All rooms" />
      <RoomsPageInner>
        <RoomTitleWrap>
          <RoomTitle>{title}</RoomTitle>
          <div>
            <Link href="/" passHref>
              <a>
                <StyledButton color="#e5e5e5">
                  <HandPeaceIcon style={{ marginRight: '5px' }} />
                  Leave quietly
                </StyledButton>
              </a>
            </Link>
          </div>
        </RoomTitleWrap>
        <div>
          {users.map((data, i) => (
            <User key={i} name={data as string} />
          ))}
        </div>
      </RoomsPageInner>
    </RoomsPageWrap>
  )
}

export default RoomPage
