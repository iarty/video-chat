import styled from 'styled-components'
import Button from 'components/Button'
import { CompactDiscIcon, PlusIcon } from 'react-line-awesome'
import ConversationCard from '@/components/ConversationCard'
import Link from 'next/link'

import { IConversationCard } from '../../models/room'
import { NextApiRequest, NextApiResponse, NextPage } from 'next'

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
const CardsWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  //grid-template-columns: repeat(4, minmax(300px, 1fr));
  gap: 1rem;
  grid-gap: 1rem;
  margin-top: 2rem;
`
const StyledLink = styled.a`
  color: inherit;
  text-decoration: none;
`

interface IProps {
  rooms: IConversationCard[]
}

const Rooms: NextPage<IProps> = ({ rooms }) => {
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
      <CardsWrap>
        {rooms.map(room => (
          <Link key={room.id} href={`/rooms/${room.id}`} passHref>
            <StyledLink>
              <ConversationCard
                id={room.id}
                title={room.title}
                avatars={room.avatars}
                guests={room.guests}
                guestsCount={room.guestsCount}
                speakersCount={room.speakersCount}
              />
            </StyledLink>
          </Link>
        ))}
      </CardsWrap>
    </RoomsPageWrapper>
  )
}

export const getServerSideProps = async ({
  req,
  res,
}: {
  req: NextApiRequest
  res: NextApiResponse
}) => {
  try {
    return {
      props: {
        rooms: [],
      },
    }
  } catch (e) {
    console.error(e)
  }
}

export default Rooms
