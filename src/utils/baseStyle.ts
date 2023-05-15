import type { CSSProperties } from 'vue'

export const railStyle = ({
  focused,
  checked,
}: {
  focused: boolean
  checked: boolean
}) => {
  const style: CSSProperties = {}
  if (checked) {
    style.background = '#1fcc6b'
    if (focused)
      style.boxShadow = '0 0 0 2px #d0305040'
  }
  else {
    style.background = '#cc1a1a'
    if (focused)
      style.boxShadow = '0 0 0 2px #2080f040'
  }
  return style
}
