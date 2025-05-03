import React from 'react';
import { Table, Skeleton, Card } from 'antd';
import _ from 'lodash';
import LoanDataContext from '../LoanDataContext';
import useGradeAggregatedBalance from "../hooks/useGradeAggregatedBalance"

const GradeTable = () => {

  const {filteredData: data} = React.useContext(LoanDataContext)

  const grades = _.compact(_.uniq(data?.map((item) => item.grade))).sort();

  // get the balance per grade
  const totalsPerGrade = useGradeAggregatedBalance(data);

  const gradeBalanceMap = totalsPerGrade.reduce((acc, item) => {
    acc[item.grade] = item.currentBalance;
    return acc;
  }, {});

  // data for antd Table
  const dataSource = [
    {
      key: 'total-row',
      label: 'Total', 
      ...gradeBalanceMap
    },
  ];

  // each grade has it's own column
  const columns = grades.map((grade) => ({
    title: grade,
    dataIndex: grade,
    key: grade,
    render: (value) => {
      const num = Number(value);
      return isNaN(num)
        ? '$0.00'
        : `$${num.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
    },
  
  }));



  return (
    <Card style={{ minHeight: 300 }} title="Grade Balance Table">
      <div style={{ overflowX: 'auto', width: '100%' }}>
        {data ? (
          <Table
            key={columns.map((col) => col.key).join('-')}
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            scroll={{ x: true }}
          />
        ) : (
          <Skeleton />
        )}
      </div>
    </Card>
  );
};

export default GradeTable;
