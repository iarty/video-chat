import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primaryText: string
      secondaryText: string
      primaryButtonColor: string
      secondaryButtonColor: string
    }
  }
}
