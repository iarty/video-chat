import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import WelcomeStep from 'src/components/InitialSteps/WelcomeStep'
import EnterNameStep from '../../src/components/InitialSteps/EnterNameStep'
import SocialsStep from '../../src/components/InitialSteps/SocialsStep'
import AvatarStep from '../../src/components/InitialSteps/AvatarStep'
import PhoneNumberStep from '../../src/components/InitialSteps/PhoneNumberStep'
import EnterActivateCodeStep from '../../src/components/InitialSteps/EnterActivateCodeStep'
import { NextPage } from 'next'
import { IUserData } from '../../models/user'

interface ISteps {
  1: NextPage
  2: NextPage
  3: NextPage
  4: NextPage
  5: NextPage
  6: NextPage
}

const StepComponents: ISteps = {
  1: WelcomeStep,
  2: SocialsStep,
  3: EnterNameStep,
  4: AvatarStep,
  5: PhoneNumberStep,
  6: EnterActivateCodeStep,
}

interface ISmsCode {
  id: number
  user_id: number
  code: string
}

interface IMainContext {
  onNextStep: (val: number) => void
  setUserData: Dispatch<SetStateAction<IUserData | undefined>>
  setFieldValueHelper: (
    field: keyof IUserData,
    value: ValueOf<IUserData>,
  ) => void
  step: number
  userData: IUserData | undefined
  smsCode: ISmsCode | undefined
  setSmsCode: Dispatch<SetStateAction<ISmsCode | undefined>>
}

type ValueOf<T> = T[keyof T]

export const MainContext = createContext<IMainContext>({} as IMainContext)

const getCurrentStep = (): number => {
  const data = window.localStorage.getItem('curStep')

  if (typeof window === 'undefined' || !data) {
    return 1
  }

  return JSON.parse(data)
}

const getCurrentData = (): IUserData | undefined => {
  try {
    const userData = window.localStorage.getItem('userData')
    if (userData) {
      return JSON.parse(userData)
    }
    return undefined
  } catch (e) {
    return undefined
  }
}

const getCurrentCode = (): ISmsCode | undefined => {
  try {
    const code = window.localStorage.getItem('code')
    if (code) {
      return JSON.parse(code)
    }
    return undefined
  } catch (e) {
    return undefined
  }
}

const InitialPage: NextPage = () => {
  const [step, setStep] = useState<number>(1)
  const [userData, setUserData] = useState<IUserData>()
  const [smsCode, setSmsCode] = useState<ISmsCode>()
  const Step = StepComponents[step as keyof ISteps]

  useEffect(() => {
    if (typeof window !== undefined) {
      if (userData) {
        window.localStorage.setItem('userData', JSON.stringify(userData))
      }
      if (step !== 1) {
        window.localStorage.setItem('curStep', JSON.stringify(step))
      }

      if (smsCode) {
        window.localStorage.setItem('curCode', JSON.stringify(smsCode))
      }
    }
  }, [userData, step, smsCode])

  useEffect(() => {
    if (typeof window !== undefined) {
      setStep(getCurrentStep())
      setUserData(getCurrentData())
      setSmsCode(getCurrentCode())
    }
  }, [])

  const onNextStep = (pageNumber: number) => setStep(pageNumber)

  const setFieldValueHelper = (
    field: keyof IUserData,
    value: ValueOf<IUserData>,
  ) => {
    setUserData(prevState => ({
      ...prevState,
      [field]: value,
    }))
  }

  return (
    <MainContext.Provider
      value={{
        step,
        onNextStep,
        setUserData,
        userData,
        setFieldValueHelper,
        smsCode,
        setSmsCode,
      }}
    >
      <Step />
    </MainContext.Provider>
  )
}

export default InitialPage
