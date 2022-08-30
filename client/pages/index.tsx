import { createContext, Dispatch, SetStateAction, useState } from 'react'
import Head from 'next/head'
import WelcomeStep from 'components/InitialSteps/WelcomeStep'
import EnterNameStep from '@/components/InitialSteps/EnterNameStep'
import SocialsStep from '@/components/InitialSteps/SocialsStep'
import AvatarStep from '@/components/InitialSteps/AvatarStep'
import PhoneNumberStep from '@/components/InitialSteps/PhoneNumberStep'
import EnterActivateCodeStep from '@/components/InitialSteps/EnterActivateCodeStep'
import { NextPage } from 'next'
import { IUserData } from '../models/user'
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

interface IMainContext {
  onNextStep: (val: number) => void
  setUserData: Dispatch<SetStateAction<IUserData | undefined>>
  setFieldValueHelper: (
    field: keyof IUserData,
    value: ValueOf<IUserData>,
  ) => void
  step: number
  userData: IUserData | undefined
}

type ValueOf<T> = T[keyof T]

export const MainContext = createContext<IMainContext>({} as IMainContext)

const InitialPage: NextPage = () => {
  const [step, setStep] = useState<number>(1)
  const [userData, setUserData] = useState<IUserData>()
  const Step = StepComponents[step as keyof ISteps]
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
  console.log({ userData })
  return (
    <div>
      <Head>
        <title>Clubhouse Clone</title>
      </Head>
      <main>
        <MainContext.Provider
          value={{
            step,
            onNextStep,
            setUserData,
            userData,
            setFieldValueHelper,
          }}
        >
          <Step />
        </MainContext.Provider>
      </main>
    </div>
  )
}

export default InitialPage
