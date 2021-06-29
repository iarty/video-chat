import { FC, useRef, useEffect, useState, ChangeEvent } from 'react'
import StepsBlock from '../StepsBlock'
import Button from '../Button'
import Avatar from '../Avatar'
import styled from 'styled-components'
import Image from 'next/image'
import congratulationsImg from 'public/static/congratulations.png'
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
  font-size: 18px;
  text-align: center;
  margin-top: 1rem;
`
const StyledSubTitle = styled.p`
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: 16px;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
`

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.colors.secondaryText};
  font-size: 12px;
  margin-top: 0.5rem;
`

const AvatarStep: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [avatarUrl, setAvatarUrl] = useState<string>('')

  const handleChangeAvatar = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
      const preview = URL.createObjectURL(file)
      setAvatarUrl(preview)
    }
  }

  useEffect(() => {
    let refValue: HTMLInputElement
    if (inputRef.current) {
      inputRef.current.addEventListener('change', handleChangeAvatar)
      refValue = inputRef.current
    }

    return () => {
      if (refValue) refValue.removeEventListener('change', handleChangeAvatar)
    }
  }, [])

  return (
    <Wrapper>
      <StyledImage
        src={congratulationsImg}
        alt="Twitter"
        width={40}
        height={40}
      />
      <StyledTitle>Okay, Barbonov Artem!</StyledTitle>
      <StyledSubTitle>How's this photo?</StyledSubTitle>
      <StepsBlock>
        <Avatar url={avatarUrl}>AB</Avatar>
        <StyledLabel htmlFor="avatar">
          Choose a different photo
          <input
            id="avatar"
            type="file"
            onChange={(e: any) => handleChangeAvatar(e)}
            ref={inputRef}
            hidden
          />
        </StyledLabel>
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

export default AvatarStep
