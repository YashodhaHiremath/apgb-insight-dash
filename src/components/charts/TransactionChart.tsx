import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface TransactionChartProps {
  data: any[];
  title: string;
  description?: string;
}

const TransactionChart = ({ data, title, description }: TransactionChartProps) => {
  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip 
              formatter={(value, name) => [
                name === 'transactions' ? value.toLocaleString() : `₹${value.toLocaleString()}`,
                name === 'transactions' ? 'Transactions' : 'Amount'
              ]}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="transactions"
              stroke="#3B82F6"
              fillOpacity={1}
              fill="url(#colorTransactions)"
              name="Transactions"
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#10B981"
              fillOpacity={1}
              fill="url(#colorAmount)"
              name="Amount"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TransactionChart;