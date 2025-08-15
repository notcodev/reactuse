import { renderHook } from '@testing-library/react';
import React from 'react';

import { renderHookServer } from '@/tests';

import { useDidUpdate } from './useDidUpdate';

it('Should use did update', () => {
  const effect = vi.fn();
  renderHook(() => useDidUpdate(effect, []));

  expect(effect).not.toHaveBeenCalled();
});

it('Should use did update on server side', () => {
  const effect = vi.fn();
  renderHookServer(() => useDidUpdate(effect, []));

  expect(effect).not.toHaveBeenCalled();
});

it('Should call effect on subsequent updates when dependencies change', () => {
  const effect = vi.fn();
  const { rerender } = renderHook(({ deps }) => useDidUpdate(effect, deps), {
    initialProps: { deps: [false] }
  });
  expect(effect).not.toHaveBeenCalled();

  rerender({ deps: [false] });
  expect(effect).not.toHaveBeenCalled();

  rerender({ deps: [true] });
  expect(effect).toHaveBeenCalledOnce();
});

it('Should call effect on rerender when dependencies empty', () => {
  const effect = vi.fn();
  const { rerender } = renderHook(() => useDidUpdate(effect));

  expect(effect).not.toHaveBeenCalled();

  rerender();
  expect(effect).toHaveBeenCalledOnce();

  rerender();
  expect(effect).toHaveBeenCalledTimes(2);
});

it('Should not call effect on initial render even in strict mode', () => {
  const effect = vi.fn();
  const { rerender } = renderHook(() => useDidUpdate(effect, []), {
    wrapper: React.StrictMode
  });

  expect(effect).not.toHaveBeenCalled();

  rerender();
  expect(effect).not.toHaveBeenCalled();
});
