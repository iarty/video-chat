import { createContext, FC, useState } from 'react'
import Head from 'next/head'
import WelcomeStep from 'components/InitialSteps/WelcomeStep'
import EnterNameStep from '@/components/InitialSteps/EnterNameStep'
import TwitterStep from '@/components/InitialSteps/TwitterStep'
import AvatarStep from '@/components/InitialSteps/AvatarStep'
import PhoneNumberStep from '@/components/InitialSteps/PhoneNumberStep'
import EnterActivateCodeStep from '@/components/InitialSteps/EnterActivateCodeStep'
interface ISteps {
  1: FC
  2: FC
  3: FC
  4: FC
  5: FC
  6: FC
}

const StepComponents: ISteps = {
  1: WelcomeStep,
  2: EnterNameStep,
  3: TwitterStep,
  4: AvatarStep,
  5: PhoneNumberStep,
  6: EnterActivateCodeStep,
}

interface IMainContext {
  onNextStep: (val: number) => void
  step: number
}

export const MainContext = createContext<IMainContext>({} as IMainContext)

const InitialPage: FC = () => {
  const [step, setStep] = useState<number>(1)
  const Step = StepComponents[step as keyof ISteps]
  const onNextStep = (pageNumber: number) => setStep(pageNumber)
  return (
    <div>
      <Head>
        <title>Clubhouse Clone</title>
      </Head>
      <main>
        <MainContext.Provider value={{ step, onNextStep }}>
          <Step />
        </MainContext.Provider>
      </main>
    </div>
  )
}

export default InitialPage
