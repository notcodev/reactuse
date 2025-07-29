import { useReducer } from 'react';

/** The use rerender return type */
type UseRerenderReturn = () => void;

/**
 * @name useRerender
 * @description - Hook that defines the logic to force rerender a component
 * @category Debug
 *
 * @returns {UseRerenderReturn} The rerender function
 *
 * @example
 * const rerender = useRerender();
 */
export const useRerender = (): UseRerenderReturn => useReducer(() => ({}), {})[1];
