import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import { getData } from './request/api';
import GradeTable from './GradeTable';
import FilterBubble from './FilterBubble';
import GradeBarChart from './GradeBarChart';
import { Space, Card, Spin } from 'antd';
import LoanDataContext from './LoanDataContext';

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // store the filters
  const [filtersState, setFiltersState] = useState({
    homeOwnership: [],
    quarter: [],
    term: [],
    year: [],
  });

  // fetch the data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];

    // filter the data per the filters selected from the dropdown
    return data.filter((item) => {
      return (
        (filtersState.homeOwnership.length === 0 ||
          filtersState.homeOwnership.includes(item.homeOwnership)) &&
        (filtersState.quarter.length === 0 ||
          filtersState.quarter.includes(item.quarter)) &&
        (filtersState.term.length === 0 ||
          filtersState.term.includes((item.term || '').trim())) &&
        (filtersState.year.length === 0 ||
          filtersState.year.includes(item.year))
      );
    });
  }, [data, filtersState]);

  return (
    <Space
      direction="vertical"
      style={{ width: '100%' }}
      size="large"
      extra={<> {loading && <Spin />} </>}
    >
      <LoanDataContext.Provider
        value={{ filtersState, setFiltersState, filteredData }}
      >
        <Card>
          <FilterBubble data={data} />
          <GradeTable data={filteredData} />
        </Card>
        <GradeBarChart data={filteredData} />
      </LoanDataContext.Provider>
    </Space>
  );
};

export default App;
