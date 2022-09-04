
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
class PieChartData extends React.Component {
   COLORS = ["#8884d8", "#669900", "#b30059", "#8a8a5c", "#663300","#ff4d4d","#99ff33","#cc33ff","#e6e600","#1a75ff"];
   pieData = this.props.countYear
     
   CustomTooltip = ({ active, payload, label }) => {
      if (active) {
         return (
         <div
            className="custom-tooltip"
            style={{
               backgroundColor: "#ffff",
               padding: "5px",
               border: "1px solid #cccc"
            }}
         >
            <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
         </div>
      );
   }
   return null;
};
render() {
   return (
      <PieChart width={900} height={500}>
      <Pie
         data={this.pieData}
         color="#000000"
         dataKey="value"
         nameKey="name"
         cx="50%"
         cy="50%"
         outerRadius={200}
         fill="#8884d8"
      >
         {this.pieData.map((entry, index) => (
            <Cell
               key={`cell-${index}`}
               fill={this.COLORS[index % this.COLORS.length]}
            />
         ))}
      </Pie>
      <Tooltip content={<this.CustomTooltip />} />
      <Legend />
      </PieChart>
      );
   }
}
export default PieChartData;

