import { FC } from 'react'
import { Preloader, Oval } from 'react-preloader-icon'
import styled from 'styled-components'

const StyledP = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-top: 1rem;
`
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

interface IProps {
  msg?: string
}
const Loader: FC<IProps> = ({ msg = 'Loading...' }) => {
  return (
    <StyledDiv>
      <Preloader
        use={Oval}
        size={48}
        strokeWidth={8}
        strokeColor="#6b6b6b"
        duration={800}
      />
      <StyledP>{msg}</StyledP>
    </StyledDiv>
  )
}

export default Loader
