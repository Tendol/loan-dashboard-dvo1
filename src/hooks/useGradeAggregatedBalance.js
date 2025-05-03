import { useMemo } from 'react';
import _ from 'lodash';


// custom hook to get the aggreated balance per grade
const useGradeAggregatedBalance = (data) => {
  return useMemo(() => {
    if (!Array.isArray(data)) return [];

    const grades = _.compact(_.uniq(data?.map((item) => item.grade))).sort();

    return grades.map((grade) => {
      const totalBalance = _.sumBy(
        data.filter((item) => item.grade === grade),
        (item) => {
          const value = parseFloat(item.currentBalance);
          return isNaN(value) ? 0 : value;
        }
      );

      return { grade, currentBalance: totalBalance };
    });
  }, [data]);
};

export default useGradeAggregatedBalance;
