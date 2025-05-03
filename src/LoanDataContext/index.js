import { createContext } from 'react';

const LoanDataContextDefault = {
    filtersState: [], // the state of the filter dropdowns
    setFiltersState: () => undefined,
    filteredData: [] // the filtered data - only the ones that meet the filters conditions
}

const LoanDataContext = createContext(LoanDataContextDefault);

export default LoanDataContext;
