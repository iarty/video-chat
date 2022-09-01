import jwtDecode from 'jwt-decode'

export const verify = async (token: string): Promise<boolean> => {
  const currentTimestamp = new Date().getTime() / 1000
  if (!token) return false

  const { iat, exp } = await jwtDecode(token)

  return exp > currentTimestamp
}
