import { FC } from 'react'
import { IProps } from '../model'

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
