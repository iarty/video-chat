import { useState, useContext, memo } from 'react'
import StepsBlock from '../StepsBlock'
import Button from '../Button'
import styled from 'styled-components'
import Image from 'next/image'
import telephoneImg from 'public/static/telephone.png'
import { ArrowRightIcon } from 'react-line-awesome'
import NumberFormat, { NumberFormatValues } from 'react-number-format'
import { MainContext } from 'pages'
import { NextPage } from 'next'
import { AxiosResponse } from 'axios'
import { apiV1 } from '../../core/request'

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

const StyledPhoneInput = styled(NumberFormat)`
  padding: 1em;
  margin: 1em;
  font-size: 18px;
  background: transparent;
  border: 1px solid #ccd5e0;
  border-radius: 20px;
  outline: 0;
`

type InputValueState = {
  formattedValue: string
  value: string
}

const sendPhone = async (phone: string): Promise<AxiosResponse> => {
  return await apiV1.post('/auth/phone', { phone })
}

const PhoneNumberStep: NextPage = memo(function PhoneNumberStep() {
  const { onNextStep, setFieldValueHelper, setSmsCode } =
    useContext(MainContext)

  const [phoneValue, setPhoneValue] = useState<InputValueState>(
    {} as InputValueState,
  )
  const isDisabled =
    !phoneValue.formattedValue || phoneValue.formattedValue.includes('_')

  const nextStepHandler = async () => {
    setFieldValueHelper('phone', phoneValue.value)
    const {
      data: { id, user_id, code },
    } = await sendPhone(phoneValue.value)
    setSmsCode({
      id,
      user_id,
      code,
    })
    onNextStep(6)
  }

  return (
    <Wrapper>
      <StyledImage src={telephoneImg} alt="Twitter" width={40} height={40} />
      <StyledTitle>Enter your phone number</StyledTitle>
      <StyledSubTitle>We will send you a confirmation code</StyledSubTitle>
      <StepsBlock>
        <StyledPhoneInput
          format="+(###) ###-###-###"
          mask="_"
          placeholder="+ (996) 555-555-555"
          onValueChange={({ formattedValue, value }: NumberFormatValues) =>
            setPhoneValue({ formattedValue, value })
          }
          value={phoneValue.value}
        />
        <Button
          style={{ marginTop: '1.5rem' }}
          onClick={nextStepHandler}
          disabled={isDisabled}
        >
          Next <ArrowRightIcon />
        </Button>
      </StepsBlock>
    </Wrapper>
  )
})

export default PhoneNumberStep
