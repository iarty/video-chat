import { FC, useState } from 'react'
import Head from 'next/head'
import WelcomeStep from 'components/InitialSteps/WelcomeStep'
import EnterNameStep from '@/components/InitialSteps/EnterNameStep'
import TwitterStep from '@/components/InitialSteps/TwitterStep'
interface ISteps {
  1: FC
  2: FC
  3: FC
}

const StepComponents: ISteps = {
  1: WelcomeStep,
  2: EnterNameStep,
  3: TwitterStep,
}

const InitialPage: FC = () => {
  const [step, setStep] = useState<number>(3)
  const Step = StepComponents[step as keyof ISteps]
  return (
    <div>
      <Head>
        <title>Clubhouse Clone</title>
      </Head>
      <main>
        <Step />
      </main>
    </div>
  )
}

export default InitialPage
