import styled from 'styled-components'

const Button = styled.button`
  padding: 10px 20px;
  color: #fff;
  background-color: #6881e7;
  font-size: 0.9333rem;
  line-height: 1.3333rem;
  border-radius: 40px;
  border-color: #007bff;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    opacity 0.15s ease-in-out;
  border: 1px solid transparent;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`

export default Button
