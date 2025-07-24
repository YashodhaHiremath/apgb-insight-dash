import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, TrendingUp, CreditCard } from "lucide-react";
import DataTable from "@/components/tables/DataTable";
import ROChart from "@/components/charts/ROChart";
import { cspDataByBranch } from "@/data/mockData";

const BranchDetails = () => {
  const { branchName } = useParams();
  const navigate = useNavigate();
  
  const decodedBranchName = decodeURIComponent(branchName || "");
  const cspData = cspDataByBranch[decodedBranchName] || [];

  // Calculate totals for this branch
  const totalTransactions = cspData.reduce((sum, csp) => sum + csp.totalTxnCount, 0);
  const totalCSPs = cspData.length;
  const avgTransactionsPerCSP = totalCSPs > 0 ? Math.round(totalTransactions / totalCSPs) : 0;

  const overviewCards = [
    {
      title: "Total CSPs",
      value: totalCSPs.toString(),
      icon: Users,
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
      title: "Avg. per CSP",
      value: avgTransactionsPerCSP.toLocaleString(),
      icon: CreditCard,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const tableColumns = [
    { key: 'sno', label: 'S.No.', width: '60px' },
    { key: 'cspName', label: 'CSP ID/Name', width: '250px' },
    { key: 'onusTxnCount', label: 'ONUS TXN Count' },
    { key: 'offusTxnCount', label: 'OFFUS TXN Count' },
    { key: 'fiTxnCount', label: 'FI TXN Count' },
    { key: 'cardTxnCount', label: 'Card TXN Count' },
    { key: 'totalTxnCount', label: 'Total TXN Count' },
    { key: 'bankTotalCount', label: 'Bank Total Count' }
  ];

  const handleCSPClick = (row) => {
    navigate(`/dashboard/csp-details/${encodeURIComponent(row.cspName)}`);
  };

  if (cspData.length === 0) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{decodedBranchName}</h1>
            <p className="text-muted-foreground">Branch Details</p>
          </div>
        </div>
        
        <Card className="shadow-soft">
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-lg text-muted-foreground">No CSP data available for this branch</p>
              <Button 
                onClick={() => navigate(-1)} 
                className="mt-4"
                variant="outline"
              >
                Go Back
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
          <h1 className="text-3xl font-bold text-foreground">{decodedBranchName}</h1>
          <p className="text-muted-foreground">
            Branch Details - CSP wise transaction data
          </p>
        </div>
        <Badge variant="secondary">
          {totalCSPs} CSPs
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
          data={cspData.slice(0, 10)} // Show top 10 CSPs in chart
          type="bar"
          title="Top CSPs by Transaction Volume"
          dataKey="totalTxnCount"
          nameKey="cspName"
        />
        <ROChart
          data={cspData.slice(0, 6)} // Show top 6 CSPs in pie chart
          type="pie"
          title="CSP Transaction Distribution"
          dataKey="totalTxnCount"
          nameKey="cspName"
        />
      </div>

      {/* CSP Data Table */}
      <DataTable
        title={`${decodedBranchName} - CSP wise Transaction Data`}
        data={cspData}
        columns={tableColumns}
        onRowClick={handleCSPClick}
        searchPlaceholder="Search by CSP name or ID..."
      />
    </div>
  );
};

export default BranchDetails;