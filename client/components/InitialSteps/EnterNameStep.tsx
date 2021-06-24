import { FC } from 'react'
import StepsBlock from '../StepsBlock'
import Button from '../Button'
import styled from 'styled-components'
import Image from 'next/image'
import broodyImg from 'public/static/broody.png'
import { ArrowRightIcon } from 'react-line-awesome'
import { useRouter } from 'next/router'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledImage = styled(Image)``

const StyledTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primaryText};
  font-weight: bold;
  font-size: 24px;
  text-align: center;
`

const StyledSubTitle = styled.p`
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: 20px;
  max-width: 28rem;
  margin-bottom: 2rem;
  margin-top: 1rem;
  text-align: center;
`

const Input = styled.input`
  padding: 1em;
  margin: 1em;
  font-size: 18px;
  background: transparent;
  border: 1px solid #ccd5e0;
  border-radius: 20px;
  outline: 0;
`

const EnterNameStep: FC = () => {
  const router = useRouter()
  return (
    <Wrapper>
      <StyledImage src={broodyImg} alt="Hand" width={40} height={40} />
      <StyledTitle>What's your full name?</StyledTitle>
      <StyledSubTitle>
        People use real names on Clubhouse :) Thnx!
      </StyledSubTitle>
      <StepsBlock>
        <Input type="text" placeholder="Enter Fullname" />
        <Button
          style={{ marginTop: '1.5rem' }}
          onClick={() => router.push('/username')}
        >
          Next <ArrowRightIcon />
        </Button>
      </StepsBlock>
    </Wrapper>
  )
}

export default EnterNameStep
