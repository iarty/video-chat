import styled from 'styled-components'
import { EllipsisVIcon } from 'react-line-awesome'
import Avatar from '../../src/components/Avatar'
import Button from '../../src/components/Button'
import BackButton from '../../src/components/BackButton'
import { NextPage } from 'next'
import { useGetUserByIdQuery } from '../../src/redux/api/user.api'
import {
  withQueryResolver,
  WithQueryResolverData,
} from '../../src/hoc/withQueryResolver'
import { useRouter } from 'next/router'
import { FC } from 'react'

const ProfilePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
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

type Resolvers = WithQueryResolverData<typeof useGetUserByIdQuery>

interface IProfileProps extends Resolvers {
  disableReload?: () => void
}

const ProfilePage: FC<IProfileProps> = ({ queryData }) => {
  const { fullname, username, avatarUrl } = queryData

  return (
    <ProfilePageWrapper>
      <BackButton container={false} title="Back" />
      <div>
        <UserInfoWrapper>
          <AvatarBlock>
            <Avatar url={avatarUrl} width="100px" height="100px" />
            <div>
              <p>{fullname}</p>
              <p>@{username}</p>
            </div>
            <OutlinedButton>Follow</OutlinedButton>
            <StyledEllipsis />
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
        <UserDescriptionWrapper>{'about'}</UserDescriptionWrapper>
      </div>
    </ProfilePageWrapper>
  )
}

const WithProfilePageQuery = withQueryResolver(useGetUserByIdQuery)(ProfilePage)

const WithUserQueryProfilePage: FC = () => {
  const {
    query: { id },
  } = useRouter()

  if (typeof id !== 'string') return <div />

  return <WithProfilePageQuery queryArg={id} disableLoading={false} />
}

export default WithUserQueryProfilePage
