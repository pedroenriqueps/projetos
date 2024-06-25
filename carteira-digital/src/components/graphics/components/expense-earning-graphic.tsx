"use client";

import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import Loading from "../loading";

interface ExpenseItem {
  valueNumber: string;
  description: string;
  date: string;
}

type PropsComponent = {
  graphichName: string;
  data: ExpenseItem[];
};

const colors = [
  "#8884d8",
  "#83a6ed",
  "#8dd1e1",
  "#82ca9d",
  "#a4de6c",
  "#d0ed57",
  "#ffc658",
  "#ff8042",
  "#ffbb28",
  "#ff7300",
  "#d0ed57",
  "#a4de6c",
  "#82ca9d",
  "#8dd1e1",
  "#83a6ed",
  "#8884d8",
  "#8884d8",
  "#83a6ed",
  "#8dd1e1",
  "#82ca9d",
  "#a4de6c",
  "#d0ed57",
  "#ffc658",
  "#ff8042",
  "#ffbb28",
  "#ff7300",
  "#d0ed57",
  "#a4de6c",
];

function ExpenseEarningGraphic({ graphichName = "", data }: PropsComponent) {
  const chartData = data.map((item, index) => ({
    name: item.description,
    value: parseFloat(item.valueNumber),
    fill: colors[index % colors.length],
  }));

  return (
    <div className="flex flex-col items-center justify-start p-4 rounded-lg">
      <h2 className="text-lg text-center font-extrabold bg-slate-800 p-4 rounded-md shadow-xl">
        {graphichName}
      </h2>
      {chartData.length > 0 ? (
        <PieChart width={300} height={400}>
          <Pie
            data={chartData}
            dataKey="value"
            cx={150}
            cy={150}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default ExpenseEarningGraphic;
