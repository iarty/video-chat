import React, { ReactEventHandler, SyntheticEvent, useState } from 'react'
import { NextPage } from 'next'
import styled from 'styled-components'
import Button from '../Button'
import {
  GlobeIcon,
  IconsIcon,
  LockIcon,
  PlusIcon,
  UsersIcon,
} from 'react-line-awesome'

const ModalOverlay = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`

const Modal = styled.div`
  border-radius: 10px;
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 450px;
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ModalTitle = styled.p`
  font-weight: bold;
  font-size: 20px;
`

const ModalBody = styled.div``
const ModalFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 2px solid #f2f7f6;
  padding-top: 20px;
`

const RoomTypeWrapper = styled.div`
  display: flex;
  margin: 10px 0 30px 0;
  justify-content: space-between;
`

const RoomTypeItem = styled.div<{ selected?: boolean }>`
  background-color: ${({ selected }) => selected && '#e3f1ec'};
  border-radius: 8px;
  padding: 20px 40px;
  text-align: center;
  cursor: pointer;
  p {
    margin-top: 8px;
    font-size: 18px;
    font-weight: bold;
  }
  i {
    font-size: 64px;
  }
`

const Input = styled.input`
  border: none;
  margin: 10px 0 20px 0;
  width: 100%;
  font-size: 20px;
  outline: none;
`

const CloseIcon = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`

const ModalButton = styled(Button)`
  margin-top: 20px;
`

interface IProps {
  onClose: () => void
  show: boolean
}

const CreateRoomModal: NextPage<IProps> = ({ onClose, show }) => {
  const [roomType, setRoomType] = useState('open')
  const [topic, setTopic] = useState<string>('')

  const createRoomHandler = () => {
    console.log(roomType, topic)
  }

  const typeRoomHandler = (event: SyntheticEvent) => {
    const data = event.currentTarget as HTMLElement
    const type = data.dataset.type
    if (type) setRoomType(type)
  }

  return (
    <ModalOverlay show={show}>
      <Modal>
        <ModalHeader>
          <ModalTitle>Create room</ModalTitle>
          <CloseIcon onClick={onClose}>&times;</CloseIcon>
        </ModalHeader>
        <ModalBody>
          <Input
            onInput={e => setTopic(e.target.value)}
            value={topic}
            type="text"
            placeholder="Enter the topic to be discussed"
          />
          <ModalTitle>Room type</ModalTitle>
          <RoomTypeWrapper>
            <RoomTypeItem
              selected={roomType === 'open'}
              onClick={typeRoomHandler}
              data-type="open"
            >
              <GlobeIcon />
              <p>Open</p>
            </RoomTypeItem>
            <RoomTypeItem
              selected={roomType === 'social'}
              onClick={typeRoomHandler}
              data-type="social"
            >
              <UsersIcon />
              <p>Social</p>
            </RoomTypeItem>
            <RoomTypeItem
              selected={roomType === 'closed'}
              onClick={typeRoomHandler}
              data-type="closed"
            >
              <LockIcon />
              <p>Closed</p>
            </RoomTypeItem>
          </RoomTypeWrapper>
        </ModalBody>
        <ModalFooter>
          <ModalTitle>Start a room open to everyone</ModalTitle>
          <ModalButton color="#45c936" onClick={createRoomHandler}>
            <IconsIcon /> Let's go
          </ModalButton>
        </ModalFooter>
      </Modal>
    </ModalOverlay>
  )
}

export default CreateRoomModal
