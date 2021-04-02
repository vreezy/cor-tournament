import { renderHook } from '@testing-library/react-hooks'
import useWindowsSize from './useWindowSize'

test('should increment counter', () => {
  const { result } = renderHook(() => useWindowsSize());

  expect(result.current.width).toBe(1024);
})