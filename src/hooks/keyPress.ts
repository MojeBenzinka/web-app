import { useEffect, useState } from "react";

interface IOptions {
  useControl?: boolean;
  useShift?: boolean;
}

const useKeyPress = (targetKey: string, options?: IOptions) => {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState<boolean>(false);
  // If pressed key is our target key then set to true
  const downHandler = (event: KeyboardEvent) => {
    if (options?.useControl && !event.ctrlKey) return;
    if (options?.useShift && !event.shiftKey) return;

    if (event.key === targetKey) {
      setKeyPressed(true);
    }
  };
  // If released key is our target key then set to false
  const upHandler = (event: KeyboardEvent) => {
    if (event.key === targetKey && keyPressed) {
      setKeyPressed(false);
    }
  };
  // Add event listeners
  useEffect(() => {
    if (!window) return;

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
};

export default useKeyPress;
