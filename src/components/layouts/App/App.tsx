import React, { useState } from 'react';
import reactLogo from 'assets/react.svg';
import viteLogo from 'assets/vite.svg';
import Cursor from "components/atoms/Cursor";
import { CURSOR_SPEED } from "constants/animation";
import { CURSOR_SIZE } from "constants/size";
import useAnimatedCursor from "hooks/useAnimatedCursor";
import 'styles/styles.css';

const App = () => {
  const [count, setCount] = useState(0);
  const { cursorRef, size } = useAnimatedCursor(CURSOR_SPEED, CURSOR_SIZE);

  return (
      <>
        <Cursor
          size={size}
          ref={cursorRef}
        />
        <div className="App">
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo"/>
            </a>
            <a href="https://reactjs.org" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo"/>
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </div>
      </>
  )
}

export default App
