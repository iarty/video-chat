import StepsBlock from '../StepsBlock'
import Button from '../Button'
import styled, { keyframes } from 'styled-components'
import Image from 'next/image'
import handImg from 'public/static/hand.png'
import { ArrowRightIcon } from 'react-line-awesome'

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  5% { transform: rotate(15deg); }
  10% { transform: rotate(-15deg); }
  15% { transform: rotate(15deg); }
  20% { transform: rotate(-15deg); }
  25% { transform: rotate(15deg); }
  30% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
`
const Shake = styled.div`
  display: inline-block;
  margin-right: 10px;
  animation: ${rotate} 3s ease-in-out 2s infinite;
  animation-duration: 5s;
  transform-origin: 50% 100%;
`

const StyledImage = styled(Image)`
  margin-right: 10px;
`

const StyledTitle = styled.h1`
  font-weight: bold;
  font-size: 24px;
  display: flex;
  align-items: center;
`

const FirstP = styled.p`
  color: #4f4f4f;
  font-size: 20px;
  max-width: 28rem;
  margin-top: 2rem;
  text-align: center;
`

const SecondP = styled(FirstP)`
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  font-size: 14px;
`

const StyledSpan = styled.span`
  color: #4070ff;
  font-size: 14px;
  margin-top: 0.5rem;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`

const WelcomeStep = () => {
  return (
    <StepsBlock>
      <StyledTitle>
        <Shake>
          <StyledImage src={handImg} alt="Hand" width={40} height={40} />
        </Shake>
        Clubhouse
      </StyledTitle>
      <FirstP>
        Hey, we're still opening up but anyone can join with an invite from an
        existing user!
      </FirstP>
      <SecondP>
        Sign up to see if you have friends on Clubhouse who can let you in. We
        can't wait for you to join!
      </SecondP>
      <Button style={{ marginTop: '1.5rem' }}>
        Get your username <ArrowRightIcon />
      </Button>
      <StyledSpan>Have an invite key? Sign in</StyledSpan>
    </StepsBlock>
  )
}

export default WelcomeStep
