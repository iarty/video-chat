import { ChangeEvent, memo, useContext, useState } from 'react'
import StepsBlock from '../StepsBlock'
import Button from '../Button'
import styled from 'styled-components'
import Image from 'next/image'
import codeImg from 'public/static/code.png'
import { ArrowRightIcon } from 'react-line-awesome'
import { useRouter } from 'next/router'
import Preloader from 'src/components/Preloader'
import { NextPage } from 'next'
import { MainContext } from '../../../pages'
import { AxiosResponse } from 'axios'
import axiosInstance from '../../redux/axiosInstance'

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
  margin-bottom: 2rem;
`
const StyledSubTitle = styled.p`
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: 12px;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
  max-width: 350px;
`

const StyledCodeInput = styled.input`
  margin: 0.5rem;
  font-size: 18px;
  background: transparent;
  border: 1px solid #ccd5e0;
  border-radius: 20px;
  width: 50px;
  height: 60px;
  font-weight: bold;
  outline: 0;
  text-align: center;
`

const activate = async (id: number): Promise<AxiosResponse> => {
  return await axiosInstance.get(`/auth/activate/${id}`)
}

const EnterActivateCodeStep: NextPage = memo(function EnterActivateCodeStep() {
  const router = useRouter()
  const { smsCode } = useContext(MainContext)
  const [codeValue] = useState<Array<string>>(
    smsCode?.code.split('') || ['', '', '', ''],
  )
  const [loading, setLoading] = useState<boolean>(false)
  const isDisabled = codeValue.some(el => !el)

  const onSubmit = async () => {
    try {
      setLoading(true)
      if (smsCode?.id) {
        await activate(smsCode.id)
      }
      window.localStorage.clear()
      await axiosInstance.get('https://jsonplaceholder.typicode.com/todos')
      await router.push('/rooms')
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <Wrapper>
      {loading ? (
        <Preloader msg="Activation in progress..." />
      ) : (
        <>
          <StyledImage src={codeImg} alt="Twitter" width={40} height={40} />
          <StyledTitle>Enter your activate code</StyledTitle>
          <StepsBlock>
            <div>
              {codeValue.map((code, index) => (
                <StyledCodeInput
                  key={code + index}
                  type="tel"
                  placeholder="X"
                  maxLength={1}
                  id={String(index)}
                  value={code}
                  disabled
                />
              ))}
            </div>
            <Button
              style={{ marginTop: '1.5rem' }}
              onClick={onSubmit}
              disabled={isDisabled}
            >
              Next <ArrowRightIcon />
            </Button>
            <StyledSubTitle>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              By entering your number, you're agreeing to our Terms of Service
              and Privacy Policy. Thanks!
            </StyledSubTitle>
          </StepsBlock>
        </>
      )}
    </Wrapper>
  )
})

export default EnterActivateCodeStep
