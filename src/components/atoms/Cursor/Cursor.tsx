import { useEffect, useRef } from 'react';
import { CURSOR_SPEED } from "constants/animation";
import { CURSOR_SIZE } from "constants/size";
import { easePosition } from "utils/animation";
import { StyledCursor, StyledPointer } from './styles';

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  const mouseX = useRef<number>(0.5);
  const mouseY = useRef<number>(0.5);
  const cursorX = useRef<number>(0.5);
  const cursorY = useRef<number>(0.5);

  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const animate: FrameRequestCallback = () => {
      cursorX.current = easePosition(cursorX.current, mouseX.current, CURSOR_SPEED);
      cursorY.current = easePosition(cursorY.current, mouseY.current, CURSOR_SPEED);

      if (!!cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(calc(100vw * ${cursorX.current} - ${CURSOR_SIZE}px / 2), calc(100vh * ${cursorY.current} - ${CURSOR_SIZE}px / 2), 0)`;
      }

      const delta = Math.sqrt(
          Math.pow(mouseX.current - cursorX.current, 2) +
          Math.pow(mouseY.current - cursorY.current, 2)
      );

      if (delta < 0.001 && rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
        return;
      }

      rafId.current = requestAnimationFrame(animate);
    }

    const onMouseMove = (event: MouseEvent) => {
      if (!cursorRef.current) return;
      const {clientX, clientY} = event;

      mouseX.current = clientX / window.innerWidth
      mouseY.current = clientY / window.innerHeight

      if (!rafId.current) rafId.current = requestAnimationFrame(animate);
    };

    addEventListener('mousemove', onMouseMove);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      removeEventListener('mousemove', onMouseMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, []);

  return (
      <StyledCursor
        ref={cursorRef}
        size={CURSOR_SIZE}
      >
        <StyledPointer/>
      </StyledCursor>
  );
};

export default Cursor;
