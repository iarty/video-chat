import { memo, useContext } from 'react'
import StepsBlock from '../StepsBlock'
import Button from '../Button'
import styled from 'styled-components'
import { ArrowRightIcon } from 'react-line-awesome'
import { MainContext } from 'pages'
import Logo from 'components/Logo'
import { NextPage } from 'next'

const FirstP = styled.p`
  color: ${({ theme }) => theme.colors.primaryText};
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
  color: ${({ theme }) => theme.colors.secondaryText};
  font-size: 14px;
  margin-top: 0.5rem;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`

const WelcomeStep: NextPage = memo(function WelcomeStep() {
  const { onNextStep } = useContext(MainContext)
  return (
    <StepsBlock>
      <Logo />
      <FirstP>
        Hey, we're still opening up but anyone can join with an invite from an
        existing user!
      </FirstP>
      <SecondP>
        Sign up to see if you have friends on our VideoChat who can let you in.
        We can't wait for you to join!
      </SecondP>
      <Button style={{ marginTop: '1.5rem' }} onClick={() => onNextStep(2)}>
        Get start <ArrowRightIcon />
      </Button>
      <StyledSpan>Have an invite key? Sign in</StyledSpan>
    </StepsBlock>
  )
})

export default WelcomeStep
