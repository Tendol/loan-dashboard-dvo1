import { Select, Space, Button } from 'antd';
import React,  { useMemo } from 'react';
import _ from 'lodash';
import LoanDataContext from '../LoanDataContext';

const { Option } = Select;

// filter bubble to filter data per field
const FilterBubble = ({data }) => {

  const {filtersState, setFiltersState} = React.useContext(LoanDataContext)
  const filters = useMemo(() => {
    if (!Array.isArray(data)) return {};

    return {
      homeOwnership: _.chain(data)
        .map('homeOwnership')
        .uniq()
        .compact()
        .sortBy()
        .value(),
      quarter: _.chain(data).map('quarter').uniq().compact().sortBy().value(),
      term: _.chain(data)
        .map((item) => item?.term?.trim())
        .uniq()
        .compact()
        .sortBy()
        .value(),
      year: _.chain(data).map('year').uniq().compact().sortBy().value(),
    };
  }, [data]);

  const handleChange = (field, value) => {
    setFiltersState((prev) => ({ ...prev, [field]: value }));
  };

  const resetFilterState = () => {

    // allow brower to repaint before updaing the state 
    // otherwise there is conflict with browser's layout - ResizeObserver error
    // [Render] → [DOM updates] → [Browser paints] → [Then run your logic safely]
    
    setTimeout(() => {
      setFiltersState({
        homeOwnership: [],
        quarter: [],
        term: [],
        year: [],
      });
      // your layout-sensitive updates
    }, 0);
  };

  return (
    <Space wrap style={{ marginBottom: 16 }}>
      <Select
        placeholder="Home Ownership"
        allowClear
        mode="multiple"
        value={filtersState.homeOwnership}
        onChange={(val) => handleChange('homeOwnership', val)}
        style={{ width: '200px' }}
      >
        {filters.homeOwnership?.map((val) => (
          <Option key={val} value={val}>
            {val}
          </Option>
        ))}
      </Select>

      <Select
        placeholder="Quarter"
        allowClear
        mode="multiple"
        value={filtersState.quarter}
        onChange={(val) => handleChange('quarter', val)}
        style={{ width: '100px' }}
      >
        {filters.quarter?.map((val) => (
          <Option key={val} value={val}>
            {val}
          </Option>
        ))}
      </Select>

      <Select
        placeholder="Term"
        allowClear
        mode="multiple"
        value={filtersState.term}
        onChange={(val) => handleChange('term', val)}
        style={{ width: '150px' }}
      >
        {filters.term?.map((val) => (
          <Option key={val} value={val}>
            {val}
          </Option>
        ))}
      </Select>

      <Select
        placeholder="Year"
        allowClear
        mode="multiple"
        value={filtersState.year}
        onChange={(val) => handleChange('year', val)}
        style={{ width: '100px' }}
      >
        {filters.year?.map((val) => (
          <Option key={val} value={val}>
            {val}
          </Option>
        ))}
      </Select>
      <Button
        onClick={resetFilterState}
        disabled={Object.values(filtersState).every((arr) => arr.length === 0)}
      >
        {' '}
        Reset{' '}
      </Button>
    </Space>
  );
};

export default FilterBubble;
