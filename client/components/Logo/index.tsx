import { FC } from 'react'
import styled, { keyframes } from 'styled-components'
import handImg from 'public/static/hand.png'
import Image from 'next/image'

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

const StyledTitle = styled.h2`
  font-weight: bold;
  font-size: 24px;
  display: flex;
  align-items: center;
`

const Logo: FC = () => {
  return (
    <StyledTitle>
      <Shake>
        <StyledImage src={handImg} alt="Hand" width={40} height={40} />
      </Shake>
      Clubhouse
    </StyledTitle>
  )
}

export default Logo
