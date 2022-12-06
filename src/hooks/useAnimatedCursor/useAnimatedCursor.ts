import { useEffect, useRef } from "react";
import { easePosition } from "utils/animation";
import { INITIAL_POSITION } from "constants/position";

const useAnimatedCursor = (speed: number, size: number) => {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  const mouseX = useRef<number>(INITIAL_POSITION);
  const mouseY = useRef<number>(INITIAL_POSITION);
  const cursorX = useRef<number>(INITIAL_POSITION);
  const cursorY = useRef<number>(INITIAL_POSITION);

  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const animate: FrameRequestCallback = () => {
      cursorX.current = easePosition(cursorX.current, mouseX.current, speed);
      cursorY.current = easePosition(cursorY.current, mouseY.current, speed);

      if (!!cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(calc(100vw * ${cursorX.current} - ${size}px / 2), calc(100vh * ${cursorY.current} - ${size}px / 2), 0)`;
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
      const { clientX, clientY } = event;

      mouseX.current = clientX / window.innerWidth;
      mouseY.current = clientY / window.innerHeight;

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

  return { cursorRef, size };
}

export default useAnimatedCursor;
