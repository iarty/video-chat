import { FC } from 'react'

const User: FC<{ name: string }> = ({ name }) => {
  return <div>{name}</div>
}

export default User
