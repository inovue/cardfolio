import { jsx, type JSX } from "hono/jsx"
import type { IconNode } from "lucide"

type Props = JSX.IntrinsicElements["div"] & {
  icon: IconNode
}

export function LucideIcon(props: Props) {
  const {
    icon
  } = props
  console.log(props)
  if (!icon) {
    return <svg />
  }

  return (
    <svg viewBox="0 0 24 24">
      {icon.map(([tag, svgProps]) => jsx(tag, { ...svgProps }))}
    </svg>
  )
}