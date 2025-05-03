import React, { useState, useMemo } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GradeTable from '../GradeTable';
import FilterBubble from '../FilterBubble';
import LoanDataContext from '../LoanDataContext';
import '@testing-library/jest-dom';

const mockData = [
  { grade: '1', currentBalance: '100', homeOwnership: 'OWN' },
  { grade: '1', currentBalance: '140', homeOwnership: 'OWN' },
  { grade: '2', currentBalance: '250', homeOwnership: 'RENT' },
  { grade: '3', currentBalance: '300', homeOwnership: 'OWN' },
];

const renderWithContext = (filteredData) => {
  render(
    <LoanDataContext.Provider value={{ filteredData }}>
      <GradeTable />
    </LoanDataContext.Provider>
  );
};

describe('GradeTable', () => {
  test('renders table structure and grade rows', async () => {
    renderWithContext(mockData);


    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });

  test('displays correct total balances per grade', async () => {
    renderWithContext(mockData);

    await waitFor(() => {
      expect(screen.getByText('$240.00')).toBeInTheDocument(); // 1 = 100 + 150
      expect(screen.getByText('$250.00')).toBeInTheDocument(); // 2 = 250
      expect(screen.getByText('$300.00')).toBeInTheDocument(); // 3 = 300
    });
  });

  test('displays blank table when data is empty', async () => {
    renderWithContext([]);

    const cells = screen.queryAllByRole('cell');
    expect(cells.length).toBe(1);
  });

  test('filters out rows based on home ownership selection', async () => {
    const FilterTableWrapper = () => {
      const [filtersState, setFiltersState] = useState({ homeOwnership: [] });

      const filteredData = useMemo(() => {
        if (filtersState.homeOwnership.length === 0) return mockData;
        return mockData.filter(d => filtersState.homeOwnership.includes(d.homeOwnership));
      }, [filtersState]);

      return (
        <LoanDataContext.Provider value={{ filtersState, setFiltersState, filteredData }}>
          <FilterBubble data={mockData} />
          <GradeTable />
        </LoanDataContext.Provider>
      );
    };

    render(<FilterTableWrapper />);

    const trigger = screen.getByText('Home Ownership');
    fireEvent.mouseDown(trigger);

    const options = await screen.findAllByText('OWN');
    fireEvent.click(options[0]);
    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    const cells = screen.getAllByRole('cell');
    const hasB = cells.some(cell => cell.textContent === '2');
    expect(hasB).toBe(false);
  });
});
