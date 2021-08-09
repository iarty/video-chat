import { FC } from 'react'
import styled from 'styled-components'
import Button from 'components/Button'
import { CompactDiscIcon, PlusIcon } from 'react-line-awesome'
import ConversationCard from '@/components/ConversationCard'
import Link from 'next/link'

const RoomsPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2.5rem;
  height: calc(100% - 2.5rem);
`

const RoomsTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const RoomsTitleInner = styled(RoomsTitleWrap)`
  h3 {
    margin-right: 20px;
    font-size: 28px;
    font-weight: bold;
  }
`
const CardWrap = styled.div`
  display: flex;
  margin-top: 2rem;
`
const StyledLink = styled.a`
  color: inherit;
  text-decoration: none;
`

const Rooms: FC = () => {
  return (
    <RoomsPageWrapper>
      <RoomsTitleWrap>
        <RoomsTitleInner>
          <h3>All conversations</h3>
          <Button color="#c4c4c4">
            <CompactDiscIcon />
            Explore
          </Button>
        </RoomsTitleInner>
        <Button color="#45c936">
          <PlusIcon /> Start room
        </Button>
      </RoomsTitleWrap>
      <CardWrap>
        <Link href="/rooms/test" passHref>
          <StyledLink>
            <ConversationCard
              title="Create clubhouse clone"
              avatars={[
                'https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png',
                'https://www.monteirolobato.edu.br/public/assets/admin/images/avatars/avatar1_big.png',
              ]}
              guests={['Artem Barbonov', 'Vasya Pupkin', 'Ivan Ivanov']}
              guestsCount={44}
              speakersCount={3}
            />
          </StyledLink>
        </Link>
      </CardWrap>
    </RoomsPageWrapper>
  )
}

export default Rooms
