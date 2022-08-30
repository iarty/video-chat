import { ChangeEvent, memo, useState } from 'react'
import StepsBlock from '../StepsBlock'
import Button from '../Button'
import styled from 'styled-components'
import Image from 'next/image'
import codeImg from 'public/static/code.png'
import { ArrowRightIcon } from 'react-line-awesome'
import { useRouter } from 'next/router'
import Preloader from 'components/Preloader'
import { apiV1 } from 'core/request'
import { NextPage } from 'next'

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

const EnterActivateCodeStep: NextPage = memo(function EnterActivateCodeStep() {
  const router = useRouter()
  const [codeValue, setCodeValue] = useState<Array<string>>(['', '', '', ''])
  const [loading, setLoading] = useState<boolean>(false)
  const isDisabled = codeValue.some(el => !el)

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const el = e.target as HTMLInputElement
    const index = Number(el.getAttribute('id'))
    const value = el.value
    const nextSibling = el.nextSibling as HTMLElement

    setCodeValue(prev => {
      const arr = [...prev]
      arr[index] = value
      return arr
    })

    nextSibling && !codeValue[index + 1] && nextSibling.focus()
  }

  // const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
  //   const el = e.target as HTMLInputElement
  //   const index = Number(el.getAttribute('id'))
  //   if (e.key === 'Backspace') {
  //     el.previousSibling && el.previousSibling.focus()
  //   } else if (e.key !== 'Backspace') {
  //     console.log(controls.current[index + 1].focus)
  //     el.nextSibling && controls.current[index + 1].focus()
  //   }
  // }

  const onSubmit = async () => {
    try {
      setLoading(true)
      await apiV1.get('https://jsonplaceholder.typicode.com/todos')
      router.push('/rooms')
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
                  onChange={handleChangeInput}
                  value={code}
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
