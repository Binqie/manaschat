import { FC } from 'react'
interface IProps {
    children?: React.ReactNode
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
    justify?: string
    align?: string
}
const FlexContainer: FC<IProps> = ({
  children,
  direction = 'row',
  justify = 'start',
  align = 'start',
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
      }}
    >
      {children}
    </div>
  )
}

export default FlexContainer
