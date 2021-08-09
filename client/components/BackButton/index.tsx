import { FC } from 'react'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import { ArrowLeftIcon } from 'react-line-awesome'
import { useRouter } from 'next/router'

const StyledLink = styled.a<{ container?: boolean }>`
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 2rem;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  ${({ container }) => {
    console.log(container)
    return (
      container &&
      css`
        margin-left: 80px;
        margin-right: 80px;
      `
    )
  }}
`

interface IBackButtonProps {
  title: string
  href?: string
  container: boolean
}

const BackButton: FC<IBackButtonProps> = ({ title, href, container }) => {
  const router = useRouter()
  return href ? (
    <Link href={href} passHref>
      <StyledLink container={container}>
        <ArrowLeftIcon /> {title}
      </StyledLink>
    </Link>
  ) : (
    <StyledLink onClick={() => router.back()} container={container}>
      <ArrowLeftIcon /> {title}
    </StyledLink>
  )
}

export default BackButton
