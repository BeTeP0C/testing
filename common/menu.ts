import { IconProps } from "../types/icons"
import { House } from "../components/Icons/House"
import { Stats } from "../components/Icons/Stats"
import { Card } from "../components/Icons/Card"
import { Settings } from "../components/Icons/Settings"

export const menu = [
  {
    id: 1,
    Icon: House,
    href: "/",
    active: true,
  },
  {
    id: 2,
    Icon: Stats,
    href: "/",
    active: false,
  },
  {
    id: 3,
    Icon: Card,
    href: "/",
    active: false,
  },
  {
    id: 4,
    Icon: Settings,
    href: "/",
    active: false,
  }
]
