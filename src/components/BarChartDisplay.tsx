
import { useIssues } from "@/contexts/IssueContext";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { useNavigate } from "react-router-dom";

const BarChartDisplay = () => {
  const { getBarChartData } = useIssues();
  const navigate = useNavigate();
  
  const data = getBarChartData();
  
  const handleClick = (data: any) => {
    if (data && data.id) {
      navigate(`/issues/${data.id}`);
    }
  };
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded">
          <p className="font-semibold">{label}</p>
          <p className="text-app-blue">{`Priority: ${payload[0].payload.priority}`}</p>
          <p className="text-app-orange">{`Votes: ${payload[1].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[400px] w-full bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Issue Priority vs Community Votes</h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
            onClick={handleClick}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end"
              height={70}
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="priority" name="Priority Level" fill="#10B981" />
            <Bar dataKey="votes" name="Community Votes" fill="#F97316" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No data available</p>
        </div>
      )}
    </div>
  );
};

export default BarChartDisplay;
