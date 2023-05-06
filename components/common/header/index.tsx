import { HeaderDesktop } from './header-destop'
import { HeaderMobile } from './header-mobile'

export interface HeaderProps {}

export function Header(props: HeaderProps) {
  return (
    <>
      <HeaderMobile />
      <HeaderDesktop />
    </>
  )
}
