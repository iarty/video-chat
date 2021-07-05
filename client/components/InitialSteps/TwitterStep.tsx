import { FC, useContext } from 'react'
import StepsBlock from '../StepsBlock'
import Button from '../Button'
import styled from 'styled-components'
import Image from 'next/image'
import memoImg from 'public/static/memo.png'
import { ArrowRightIcon, TwitterIcon } from 'react-line-awesome'
import Avatar from '../Avatar'
import { MainContext } from 'pages'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledImage = styled(Image)``

const UserName = styled.span`
  font-size: 24px;
  margin: 10px 0;
`

const StyledTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primaryText};
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
`

const TwitterStep: FC = () => {
  const { onNextStep } = useContext(MainContext)

  return (
    <Wrapper>
      <StyledImage src={memoImg} alt="Twitter" width={40} height={40} />
      <StyledTitle>Do you want import info from Twitter?</StyledTitle>
      <StepsBlock>
        <Avatar>AB</Avatar>
        <UserName>Barbonov Artem</UserName>
        <Button style={{ marginTop: '1.5rem' }} onClick={() => onNextStep(4)}>
          <TwitterIcon /> Import from Twitter <ArrowRightIcon />
        </Button>
      </StepsBlock>
    </Wrapper>
  )
}

export default TwitterStep
