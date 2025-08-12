import { useEffect, useState } from 'react';
/**
 * @name usePointerLock
 * @description - Hook that provides reactive pointer lock
 * @category Browser
 * @usage low
 *
 * @browserapi pointerLockElement https://developer.mozilla.org/en-US/docs/Web/API/Document/pointerLockElement
 *
 * @returns {UsePointerLockReturn} An object containing the pointer lock element and functions to interact with the pointer lock
 *
 * @example
 * const { supported, lock, unlock, element } = usePointerLock();
 */
export const usePointerLock = () => {
  const supported = typeof document !== 'undefined' && 'pointerLockElement' in document;
  const [element, setElement] = useState();
  useEffect(() => {
    if (!supported) return;
    const handlePointerLockChange = () => {
      if (!supported) return;
      const currentElement = document.pointerLockElement ?? element;
      if (currentElement && currentElement === element) {
        setElement(document.pointerLockElement);
      }
    };
    const handlePointerLockError = () => {
      if (!supported) return;
      const currentElement = document.pointerLockElement ?? element;
      if (currentElement && currentElement === element) {
        const action = document.pointerLockElement ? 'release' : 'acquire';
        throw new Error(`Failed to ${action} pointer lock.`);
      }
    };
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    document.addEventListener('pointerlockerror', handlePointerLockError);
    return () => {
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      document.removeEventListener('pointerlockerror', handlePointerLockError);
    };
  }, []);
  const lock = (event) => {
    if (!supported) return false;
    if (event instanceof Event) return false;
    event.currentTarget.requestPointerLock();
    setElement(event.currentTarget);
    return true;
  };
  const unlock = () => {
    if (!supported) return false;
    if (!element) return false;
    document.exitPointerLock();
    setElement(undefined);
    return true;
  };
  return {
    supported,
    element,
    lock,
    unlock
  };
};
