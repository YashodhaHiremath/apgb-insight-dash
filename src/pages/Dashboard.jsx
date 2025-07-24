import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  TrendingUp, 
  Users, 
  CreditCard,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";
import ROChart from "@/components/charts/ROChart";
import TransactionChart from "@/components/charts/TransactionChart";
import DataTable from "@/components/tables/DataTable";
import { roPointsData, roTransactionData, monthlyData } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Calculate totals for overview cards
  const totalPoints = roPointsData.reduce((sum, ro) => sum + ro.totalPoints, 0);
  const totalActivePoints = roPointsData.reduce((sum, ro) => sum + ro.activePoints, 0);
  const totalBranches = roPointsData.reduce((sum, ro) => sum + ro.branches, 0);
  const totalTransactions = roTransactionData.reduce((sum, ro) => sum + ro.totalTxnCount, 0);

  const overviewCards = [
    {
      title: "Total Points",
      value: totalPoints.toLocaleString(),
      change: "+12.5%",
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Active Points",
      value: totalActivePoints.toLocaleString(),
      change: "+8.2%", 
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Total Branches",
      value: totalBranches.toLocaleString(),
      change: "+3.1%",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Total Transactions",
      value: totalTransactions.toLocaleString(),
      change: "+15.8%",
      icon: CreditCard,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const tableColumns = [
    { key: 'sno', label: 'S.No.', width: '60px' },
    { key: 'roName', label: 'RO Name', width: '200px' },
    { key: 'totalPoints', label: 'Total Points' },
    { key: 'activePoints', label: 'Active Points' },
    { key: 'selectionPending', label: 'Selection Pending' },
    { key: 'pointNotRequired', label: 'Point Not Required' },
    { key: 'branches', label: 'Branches' }
  ];

  const handleROClick = (row) => {
    navigate(`/dashboard/ro-details/${encodeURIComponent(row.roName)}`);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">
            Real-time banking operations and analytics
          </p>
        </div>
        <Badge variant="secondary" className="mt-2 sm:mt-0">
          Last updated: {new Date().toLocaleTimeString()}
        </Badge>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewCards.map((card, index) => (
          <Card key={index} className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{card.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ROChart
          data={roPointsData}
          type="pie"
          title="RO Wise Points Distribution"
          dataKey="totalPoints"
          nameKey="roName"
        />
        <ROChart
          data={roPointsData}
          type="bar"
          title="Active Points by RO"
          dataKey="activePoints"
          nameKey="roName"
        />
      </div>

      {/* Transaction Trends */}
      <TransactionChart
        data={monthlyData}
        title="Monthly Transaction Trends"
        description="Transaction volume and amount trends over time"
      />

      {/* RO Points Status Table */}
      <DataTable
        title="All RO Wise Points Status"
        data={roPointsData}
        columns={tableColumns}
        onRowClick={handleROClick}
        searchPlaceholder="Search by RO name..."
      />
    </div>
  );
};

export default Dashboard;