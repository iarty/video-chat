import { FC } from 'react'
import { useRouter } from 'next/router'
import RoomPage from 'components/Room'

const Room: FC = () => {
  const router = useRouter()
  const { id } = router.query

  return <RoomPage title="Тестовая комната" users={['1', '2', '3']} />
}

export default Room
