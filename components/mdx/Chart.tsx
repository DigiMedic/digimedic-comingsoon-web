import React from 'react';

interface ChartProps {
  type: string;
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
    }>;
  };
}

const Chart: React.FC<ChartProps> = ({ type, data }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <p>Chart: {type}</p>
      <p>Labels: {data.labels.join(', ')}</p>
      {data.datasets.map((dataset, index) => (
        <div key={index}>
          <p>Dataset {index + 1}: {dataset.label}</p>
          <p>Data: {dataset.data.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default Chart;