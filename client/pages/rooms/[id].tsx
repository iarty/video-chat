import RoomPage from 'src/components/Room'
import { IConversationCard } from '../../models/room'
import { NextPage } from 'next'

interface IProps {
  room: Pick<IConversationCard, 'title' | 'guests' | 'id'>
}

const Room: NextPage<IProps> = ({ room }) => {
  return <RoomPage title={room.title} users={room.guests} />
}
//TODO: Поправить типизацию
//@ts-ignore
// export const getServerSideProps: GetServerSideProps = async context => {
//   try {
//     const { id } = context.query
//     const { data } = await axios.get<Array<IConversationCard>>(
//       'http://localhost:3000/rooms.json',
//     )
//     const room = data.find(room => room.id === id)
//
//     return {
//       props: {
//         room,
//       },
//     }
//   } catch (e) {}
// }

export default Room
