import { forwardRef, Ref } from 'react';
import { StyledCursor, StyledPointer } from './styles';

interface IProps {
  size: number;
}

const Cursor = forwardRef((
    { size }: IProps,
    ref?: Ref<HTMLDivElement>
) => (
    <StyledCursor
      ref={ref}
      size={size}
    >
      <StyledPointer/>
    </StyledCursor>
));

export default Cursor;
