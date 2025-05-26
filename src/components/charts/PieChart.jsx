import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import PropTypes from "prop-types";

function PieChart({
  data,
  nameKey,
  valueKey,
  colors = ["#0066ff", "#10b981", "#f59e0b", "#ef4444"],
  height = 300,
}) {
  // Custom label renderer for better alignment and visibility
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    // Skip labels for small segments
    if (percent < 0.05) return null;

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const label = `${data[index][nameKey]}: ${(percent * 100).toFixed(0)}%`;

    return (
      <text
        x={x}
        y={y}
        fill="#000"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={14}
        className="capitalize"
      >
        {label}
      </text>
    );
  };

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey={valueKey}
            nameKey={nameKey}
            labelLine={false}
            label={renderCustomLabel}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              textTransform: "capitalize",
              fontSize: "14px",
            }}
          />
          <Legend
            formatter={(value) =>
              value.charAt(0).toUpperCase() + value.slice(1)
            }
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}
PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  nameKey: PropTypes.string.isRequired,
  valueKey: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string),
  height: PropTypes.number,
};

export default PieChart;
