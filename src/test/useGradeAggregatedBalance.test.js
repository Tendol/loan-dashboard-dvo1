import { renderHook } from '@testing-library/react-hooks';
import useGradeAggregatedBalance from '../hooks/useGradeAggregatedBalance';

describe('useGradeAggregatedBalance', () => {
  test('aggregates currentBalance by grade', () => {
    const mockData = [
      { grade: '1', currentBalance: 5000 },
      { grade: '2', currentBalance: 3000 },
      { grade: '1', currentBalance: 2000 },
    ];

    const { result } = renderHook(() => useGradeAggregatedBalance(mockData));

    expect(result.current).toEqual([
      { grade: '1', currentBalance: 7000 },
      { grade: '2', currentBalance: 3000 },
    ]);
  });
});
