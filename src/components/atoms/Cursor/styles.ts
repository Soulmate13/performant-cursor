import styled from '@emotion/styled';

interface ICursor {
  size: number;
}

export const StyledCursor = styled.div<ICursor>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  position: fixed;
  top: 0;
  left: 0;
  mix-blend-mode: difference;
  pointer-events: none;
  z-index: 10000;
  will-change: transform;
`;

export const StyledPointer = styled.div`
  width: 17px;
  height: 17px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border: none;
  border-radius: 50%;
  background-color: #fff;

  pointer-events: none;
`;
