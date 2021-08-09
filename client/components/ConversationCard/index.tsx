import { FC } from 'react'
import Avatar from '../Avatar'
import { UserAltIcon, CommentDotsIcon, CommentIcon } from 'react-line-awesome'
import styled from 'styled-components'

const CardsBlock = styled.div`
  background-color: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 30px 35px;
  border: 1px solid #e8e3d7;
  box-shadow: 0px 2px 1px rgb(0 0 0 / 5%);
  cursor: pointer;
  transition: all 0.15s ease-in-out;
`

const CardsTitle = styled.h3`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 1.25rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  line-height: 30px;
  width: 320px;
`

const CardInner = styled.div`
  display: flex;
  > div:nth-of-type(1) {
    position: relative;
    > div:last-child {
      position: absolute;
      left: 15px;
      top: 25px;
    }
  }
  > div:nth-of-type(2) {
    margin-left: 1.875rem;
    font-size: 14px;
    ul:nth-of-type(1) {
      margin-bottom: 0.9375rem;
      li {
        margin-bottom: 5px;
        font-weight: 400;
      }
    }
    ul:nth-of-type(2) {
      display: flex;
      li:last-child {
        margin-left: 0.625rem;
      }
    }
  }
`

interface IConversationCard {
  title: string
  guests: string[]
  avatars: string[]
  guestsCount: number
  speakersCount: number
}

const ConversationCard: FC<IConversationCard> = ({
  title,
  guests = [],
  avatars = [],
  guestsCount,
  speakersCount,
}) => {
  return (
    <CardsBlock>
      <CardsTitle>{title}</CardsTitle>
      <CardInner>
        <div>
          {avatars.map((url, i) => (
            <Avatar key={url + i} url={url} width="45px" height="45px" />
          ))}
        </div>
        <div>
          <ul>
            {guests.map((name, i) => (
              <li key={name + i}>
                {name}
                <CommentIcon style={{ marginLeft: '5px' }} />
              </li>
            ))}
          </ul>
          <ul>
            <li>
              {guestsCount}
              <UserAltIcon style={{ marginLeft: '3px' }} />
            </li>
            <li>
              {speakersCount}
              <CommentDotsIcon style={{ marginLeft: '3px' }} />
            </li>
          </ul>
        </div>
      </CardInner>
    </CardsBlock>
  )
}

export default ConversationCard
