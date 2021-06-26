import { FC, useState } from 'react'
import Head from 'next/head'
import WelcomeStep from 'components/InitialSteps/WelcomeStep'
import EnterNameStep from '@/components/InitialSteps/EnterNameStep'
import TwitterStep from '@/components/InitialSteps/TwitterStep'
import AvatarStep from '@/components/InitialSteps/AvatarStep'
import PhoneNumberStep from '@/components/InitialSteps/PhoneNumberStep'
interface ISteps {
  1: FC
  2: FC
  3: FC
  4: FC
  5: FC
}

const StepComponents: ISteps = {
  1: WelcomeStep,
  2: EnterNameStep,
  3: TwitterStep,
  4: AvatarStep,
  5: PhoneNumberStep,
}

const InitialPage: FC = () => {
  const [step, setStep] = useState<number>(5)
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
