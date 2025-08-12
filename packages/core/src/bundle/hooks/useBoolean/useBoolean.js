import { useState } from 'react';
/**
 * @name useBoolean
 * @description - Hook provides opportunity to manage boolean state
 * @category State
 * @usage necessary

 * @param {boolean} [initialValue=false] The initial boolean value
 * @returns {UseBooleanReturn} An object containing the boolean state value and utility functions to manipulate the state
 *
 * @example
 * const [on, toggle] = useBoolean()
 */
export const useBoolean = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  const toggle = (value) => setValue((prevValue) => value ?? !prevValue);
  return [value, toggle];
};
