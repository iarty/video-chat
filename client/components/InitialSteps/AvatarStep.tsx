import { memo, useContext, useState } from 'react'
import StepsBlock from '../StepsBlock'
import Button from '../Button'
import Avatar from '../Avatar'
import styled from 'styled-components'
import Image from 'next/image'
import congratulationsImg from 'public/static/congratulations.png'
import { ArrowRightIcon } from 'react-line-awesome'
import { MainContext } from 'pages'
import { apiV1 } from '../../core/request'
import { NextPage } from 'next'
import { AxiosResponse } from 'axios'

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
  cursor: pointer;
  font-size: 12px;
  margin-top: 0.5rem;
`

const uploadAvatar = async (file: File): Promise<AxiosResponse> => {
  const formData = new FormData()
  formData.append('avatar', file)
  return await apiV1.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

const AvatarStep: NextPage = memo(function AvatarStep() {
  const { onNextStep, userData, setFieldValueHelper } = useContext(MainContext)

  const [avatarUrl, setAvatarUrl] = useState<string>(userData?.avatarUrl || '')

  const handleChangeAvatar = async (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
      const { data } = await uploadAvatar(file)
      const avatarUrl = process.env.API_URL + data.url
      setAvatarUrl(avatarUrl)
      setFieldValueHelper('avatarUrl', avatarUrl)
    }
  }

  return (
    <Wrapper>
      <StyledImage
        src={congratulationsImg}
        alt="Twitter"
        width={40}
        height={40}
      />
      <StyledTitle>{`Okay, ${userData?.fullname || ''}!`}</StyledTitle>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <StyledSubTitle>How's this photo?</StyledSubTitle>
      <StepsBlock>
        <Avatar url={avatarUrl}>AB</Avatar>
        <StyledLabel htmlFor="avatar">
          Choose a different photo
          <input
            id="avatar"
            type="file"
            onChange={(e: any) => handleChangeAvatar(e)}
            hidden
          />
        </StyledLabel>
        <Button style={{ marginTop: '1.5rem' }} onClick={() => onNextStep(5)}>
          Next <ArrowRightIcon />
        </Button>
      </StepsBlock>
    </Wrapper>
  )
})

export default AvatarStep
