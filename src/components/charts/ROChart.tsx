import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ROChartProps {
  data: any[];
  type: 'pie' | 'bar';
  title: string;
  dataKey: string;
  nameKey: string;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16'];

const ROChart = ({ data, type, title, dataKey, nameKey }: ROChartProps) => {
  if (type === 'pie') {
    return (
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>Distribution across Regional Offices</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey={dataKey}
                nameKey={nameKey}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>Comparison across Regional Offices</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey={nameKey} 
              angle={-45}
              textAnchor="end"
              height={80}
              fontSize={12}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey={dataKey} fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ROChart;