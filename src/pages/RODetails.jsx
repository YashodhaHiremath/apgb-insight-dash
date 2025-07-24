import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Building2, TrendingUp, Users } from "lucide-react";
import DataTable from "@/components/tables/DataTable";
import ROChart from "@/components/charts/ROChart";
import { branchDataByRO } from "@/data/mockData";

const RODetails = () => {
  const { roName } = useParams();
  const navigate = useNavigate();
  
  const decodedROName = decodeURIComponent(roName || "");
  const branchData = branchDataByRO[decodedROName] || [];

  // Calculate totals for this RO
  const totalTransactions = branchData.reduce((sum, branch) => sum + branch.totalTxnCount, 0);
  const totalBranches = branchData.length;
  const avgTransactionsPerBranch = totalBranches > 0 ? Math.round(totalTransactions / totalBranches) : 0;

  const overviewCards = [
    {
      title: "Total Branches",
      value: totalBranches.toString(),
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Total Transactions",
      value: totalTransactions.toLocaleString(),
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Avg. per Branch",
      value: avgTransactionsPerBranch.toLocaleString(),
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const tableColumns = [
    { key: 'sno', label: 'S.No.', width: '60px' },
    { key: 'branchName', label: 'Branch Name', width: '200px' },
    { key: 'onusTxnCount', label: 'ONUS TXN Count' },
    { key: 'offusTxnCount', label: 'OFFUS TXN Count' },
    { key: 'fiTxnCount', label: 'FI TXN Count' },
    { key: 'cardTxnCount', label: 'Card TXN Count' },
    { key: 'totalTxnCount', label: 'Total TXN Count' },
    { key: 'bankTotalCount', label: 'Bank Total Count' }
  ];

  const handleBranchClick = (row) => {
    navigate(`/dashboard/branch-details/${encodeURIComponent(row.branchName)}`);
  };

  if (branchData.length === 0) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{decodedROName}</h1>
            <p className="text-muted-foreground">Regional Office Details</p>
          </div>
        </div>
        
        <Card className="shadow-soft">
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-lg text-muted-foreground">No branch data available for this RO</p>
              <Button 
                onClick={() => navigate("/dashboard")} 
                className="mt-4"
                variant="outline"
              >
                Return to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">{decodedROName}</h1>
          <p className="text-muted-foreground">
            Regional Office - Branch wise transaction data
          </p>
        </div>
        <Badge variant="secondary">
          {totalBranches} Branches
        </Badge>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {overviewCards.map((card, index) => (
          <Card key={index} className="shadow-soft">
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
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ROChart
          data={branchData}
          type="bar"
          title="Branch wise Total Transactions"
          dataKey="totalTxnCount"
          nameKey="branchName"
        />
        <ROChart
          data={branchData}
          type="pie"
          title="Transaction Distribution"
          dataKey="totalTxnCount"
          nameKey="branchName"
        />
      </div>

      {/* Branch Data Table */}
      <DataTable
        title={`${decodedROName} - Branch wise Transaction Data`}
        data={branchData}
        columns={tableColumns}
        onRowClick={handleBranchClick}
        searchPlaceholder="Search by branch name..."
      />
    </div>
  );
};

export default RODetails;