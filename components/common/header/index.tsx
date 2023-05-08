import { HeaderDesktop } from './header-destop'
import { HeaderMobile } from './header-mobile'

export interface HeaderProps {}

export default function Header(props: HeaderProps) {
  return (
    <>
      <HeaderMobile />
      <HeaderDesktop />
    </>
  )
}
