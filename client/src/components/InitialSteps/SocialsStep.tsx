import { memo, useCallback, useContext, useEffect } from 'react'
import StepsBlock from '../StepsBlock'
import Button from '../Button'
import styled from 'styled-components'
import Image from 'next/image'
import memoImg from 'public/static/memo.png'
import { GithubIcon, GoogleIcon } from 'react-line-awesome'
import Avatar from '../Avatar'
import { MainContext } from 'pages'
import { NextPage } from 'next'

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

// const StyledSpan = styled.span`
//   color: ${({ theme }) => theme.colors.secondaryText};
//   font-size: 14px;
//   margin-top: 0.5rem;
//   cursor: pointer;
//   &:hover {
//     opacity: 0.9;
//   }
// `
const SocialButtonsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 1rem 0;
`

const SocialsStep: NextPage = memo(function SocialsStep() {
  const { onNextStep, setUserData } = useContext(MainContext)

  const socialAuth = (url: string) => {
    window.open(url, 'Auth')
  }

  const socialAuthHandler = useCallback(
    (e: MessageEvent) => {
      if (e.origin === 'http://localhost:7777') {
        const json = JSON.parse(e.data)
        setUserData(json)
        onNextStep(3)
      }
    },
    [onNextStep, setUserData],
  )

  useEffect(() => {
    window.addEventListener('message', socialAuthHandler)
    return () => window.removeEventListener('message', socialAuthHandler)
  }, [socialAuthHandler])

  return (
    <Wrapper>
      <StyledImage src={memoImg} alt="Twitter" width={40} height={40} />
      <StyledTitle>Do you want import info from Socials?</StyledTitle>
      <StepsBlock>
        <Avatar>EU</Avatar>
        <UserName>Username</UserName>
        <SocialButtonsContainer>
          <Button
            style={{ marginRight: '1rem' }}
            onClick={() => socialAuth('http://localhost:7777/api/auth/google')}
          >
            <GoogleIcon /> Google
          </Button>
          <Button
            onClick={() => socialAuth('http://localhost:7777/api/auth/github')}
          >
            <GithubIcon /> Github
          </Button>
        </SocialButtonsContainer>
        {/*<StyledSpan onClick={() => onNextStep(3)}>*/}
        {/*  Enter my info manually*/}
        {/*</StyledSpan>*/}
      </StepsBlock>
    </Wrapper>
  )
})

export default SocialsStep
