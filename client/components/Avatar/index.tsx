import { FC } from 'react'
import styled from 'styled-components'

const StyledAvatarDiv = styled.div<{ isSaying: boolean }>`
  background-color: #e5e5e5;
  font-size: 30px;
  font-weight: 600;
  border-radius: 50%;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${props => props.isSaying && '3px solid #cecece'};
  box-shadow: ${props => props.isSaying && '0px 0px 10px 5px #8cbdff'};
`
interface IAvatar {
  url?: string
  width?: string
  height?: string
  isSaying?: boolean
}

const Avatar: FC<IAvatar> = ({
  url,
  width = '120px',
  height = '120px',
  isSaying = false,
  children,
}) => {
  return (
    <StyledAvatarDiv
      style={{ width, height, backgroundImage: `url(${url})` }}
      isSaying={isSaying}
    >
      {url ? null : <p>{children}</p>}
    </StyledAvatarDiv>
  )
}

export default Avatar
