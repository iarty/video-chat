import { FC } from 'react'
import styled from 'styled-components'
import { ArrowLeftIcon } from 'react-line-awesome'
import { useRouter } from 'next/router'
import Avatar from '@/components/Avatar'
import Button from '@/components/Button'

const ProfilePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 80vh;
`

const BackWrapper = styled.div`
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 1rem;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`

const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
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
      color: ${({ theme }) => theme.colors.primaryText};
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

const ProfilePage: FC = () => {
  const router = useRouter()

  return (
    <ProfilePageWrapper>
      <BackWrapper onClick={() => router.back()}>
        <ArrowLeftIcon /> Back
      </BackWrapper>
      <div>
        <UserInfoWrapper>
          <AvatarBlock>
            <Avatar url="https://image.flaticon.com/icons/png/512/147/147144.png" />
            <div>
              <p>Barbonov Artem </p>
              <p>@abarbonov</p>
            </div>
            <Button>Follow</Button>
          </AvatarBlock>
          <FollowersWrapper>
            <FollowInner>
              <p>2</p>
              <p>followers</p>
            </FollowInner>
            <FollowInner>
              <p>0</p>
              <p>following</p>
            </FollowInner>
          </FollowersWrapper>
        </UserInfoWrapper>
        <div>Description</div>
      </div>
    </ProfilePageWrapper>
  )
}

export default ProfilePage
