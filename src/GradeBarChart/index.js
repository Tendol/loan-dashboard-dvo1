import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';
import { Card } from 'antd';
import createGradeColorMap from '../helpers/createGradeColorMap';
import LoanDataContext from '../LoanDataContext';
import useGradeAggregatedBalance from '../hooks/useGradeAggregatedBalance';

const GradeBarChart = () => {
  const { filteredData: data } = React.useContext(LoanDataContext);
  const chartData = useGradeAggregatedBalance(data);

  const grades = data ? data.map((d) => d.grade) : [];
  const gradeColorMap = createGradeColorMap(grades);

  return (
    <Card title="Grade Balance Chart">
      <div style={{ width: '100%', height: 300, margin: '10px' }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            data-testid="BarChart"
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="grade"
              data-testid="XAxis"
              label={{ value: 'Grade', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              data-testid="YAxis"
              label={{
                value: 'Total Balance',
                angle: -90,
                position: 'insideLeft',
                offset: -15,
              }}
            />
            <Tooltip
              formatter={(value) =>
                `$${Number(value).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}`
              }
            />
            <Bar
              dataKey="currentBalance"
              name="Current Balance"
              data-testid="Bar-currentBalance"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={gradeColorMap[entry.grade]}
                  data-testid={`bar-${entry.grade}`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default GradeBarChart;
