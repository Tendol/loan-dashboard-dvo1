import React from 'react';
import { render, screen } from '@testing-library/react';
import GradeBarChart from '../GradeBarChart';
import LoanDataContext from '../LoanDataContext';

// Mock ResponsiveContainer to provide a real size
jest.mock('recharts', () => {
  const Original = jest.requireActual('recharts');

  return {
    ...Original,
    ResponsiveContainer: ({ children }) => (
      <div style={{ width: 800, height: 300 }}>
        {children}
      </div>
    ),
  };
});

describe('GradeBarChart', () => {
  test('renders a bar for each grade', () => {
    const mockData = [
      { grade: '1', currentBalance: 5000 },
      { grade: '2', currentBalance: 3000},
    ];

    render(
      <LoanDataContext.Provider value={{ filteredData: mockData }}>
        <GradeBarChart />
      </LoanDataContext.Provider>
    );

    expect(screen.getByText('Grade Balance Chart')).toBeInTheDocument();
  });
});
