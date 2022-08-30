import styled, { css } from 'styled-components'

const Button = styled.button<{ color?: string }>`
  padding: 10px 20px;
  color: #fff;
  background-color: ${({ color, theme }) => {
    return color ? color : theme.colors.primaryButtonColor
  }};
  font-size: 0.9333rem;
  line-height: 1.3333rem;
  border-radius: 40px;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    opacity 0.15s ease-in-out;
  border: 1px solid #007bff;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.7;
      cursor: not-allowed;
      &:hover {
        opacity: 0.7;
      }
    `}
`

export default Button
