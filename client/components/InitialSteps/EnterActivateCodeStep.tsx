import { ChangeEvent, KeyboardEvent, FC, useState } from 'react'
import StepsBlock from '../StepsBlock'
import Button from '../Button'
import styled from 'styled-components'
import Image from 'next/image'
import codeImg from 'public/static/code.png'
import { ArrowRightIcon } from 'react-line-awesome'
import { useRouter } from 'next/router'
import Preloader from 'components/Preloader'
import { apiV1 } from 'core/request'

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

const EnterActivateCodeStep: FC = () => {
  const router = useRouter()
  const [codeValue, setCodeValue] = useState<Array<string>>(['', '', '', ''])
  const [loading, setLoading] = useState<boolean>(false)

  const isDisabled = codeValue.some(el => !el)

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const el = e.target as HTMLInputElement
    const index = Number(el.getAttribute('id')) - 1
    const value = el.value

    setCodeValue(prev => {
      const arr = [...prev]
      arr[index] = value
      return arr
    })
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    const el = e.target as HTMLInputElement
    const index = Number(el.getAttribute('id')) - 1

    if (e.key === 'Backspace') {
      el.previousSibling && el.previousSibling.focus()
    } else if (e.key !== 'Backspace' && !codeValue[index + 1]) {
      el.nextSibling && codeValue[index] && el.nextSibling.focus()
    }
  }

  const onSubmit = async () => {
    try {
      setLoading(true)
      await apiV1.get('https://jsonplaceholder.typicode.com/todos')
      router.push('/rooms')
    } catch (error) {
      console.log(error)
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
              <StyledCodeInput
                type="tel"
                placeholder="X"
                maxLength={1}
                id="1"
                onChange={handleChangeInput}
                onKeyUp={handleKeyPress}
                value={codeValue[0]}
              />
              <StyledCodeInput
                type="tel"
                placeholder="X"
                maxLength={1}
                id="2"
                onChange={handleChangeInput}
                onKeyUp={handleKeyPress}
                value={codeValue[1]}
              />
              <StyledCodeInput
                type="tel"
                placeholder="X"
                maxLength={1}
                id="3"
                onChange={handleChangeInput}
                onKeyUp={handleKeyPress}
                value={codeValue[2]}
              />
              <StyledCodeInput
                type="tel"
                placeholder="X"
                maxLength={1}
                id="4"
                onChange={handleChangeInput}
                onKeyUp={handleKeyPress}
                value={codeValue[3]}
              />
            </div>
            <Button
              style={{ marginTop: '1.5rem' }}
              onClick={onSubmit}
              disabled={isDisabled}
            >
              Next <ArrowRightIcon />
            </Button>
            <StyledSubTitle>
              By entering your number, you're agreeing to our Terms of Service
              and Privacy Policy. Thanks!
            </StyledSubTitle>
          </StepsBlock>
        </>
      )}
    </Wrapper>
  )
}

export default EnterActivateCodeStep
