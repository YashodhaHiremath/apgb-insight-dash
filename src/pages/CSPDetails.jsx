import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, CreditCard, FileText } from "lucide-react";

const CSPDetails = () => {
  const { cspName } = useParams();
  const navigate = useNavigate();
  
  const decodedCSPName = decodeURIComponent(cspName || "");

  // Mock data for CSP details
  const cspData = {
    cspName: decodedCSPName,
    totalTransactions: 2450,
    monthlyTarget: 3000,
    achievement: 81.67,
    apy: 145,
    pmjjby: 89,
    pmsby: 67,
    location: "Padderu Village",
    contactNumber: "+91 9876543210",
    activeFrom: "Jan 2023"
  };

  const transactionData = [
    { month: "Jan", transactions: 180, amount: "₹45,000" },
    { month: "Feb", transactions: 210, amount: "₹52,500" },
    { month: "Mar", transactions: 195, amount: "₹48,750" },
    { month: "Apr", transactions: 225, amount: "₹56,250" },
    { month: "May", transactions: 240, amount: "₹60,000" },
    { month: "Jun", transactions: 235, amount: "₹58,750" },
  ];

  const overviewCards = [
    {
      title: "Total Transactions",
      value: cspData.totalTransactions.toLocaleString(),
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Achievement",
      value: `${cspData.achievement}%`,
      icon: CreditCard,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "SSS Products",
      value: (cspData.apy + cspData.pmjjby + cspData.pmsby).toString(),
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">{decodedCSPName}</h1>
          <p className="text-muted-foreground">
            CSP Details - Performance and Transaction Data
          </p>
        </div>
        <Badge variant="secondary">
          Active since {cspData.activeFrom}
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

      {/* CSP Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">CSP Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{cspData.location}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contact</p>
                <p className="font-medium">{cspData.contactNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Target</p>
                <p className="font-medium">{cspData.monthlyTarget.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Achievement</p>
                <p className="font-medium text-green-600">{cspData.achievement}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">SSS Products Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">APY</span>
                <span className="font-bold text-lg">{cspData.apy}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">PMJJBY</span>
                <span className="font-bold text-lg">{cspData.pmjjby}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">PMSBY</span>
                <span className="font-bold text-lg">{cspData.pmsby}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Performance */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg">Monthly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Month</th>
                  <th className="text-left py-2">Transactions</th>
                  <th className="text-left py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactionData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{item.month}</td>
                    <td className="py-2">{item.transactions}</td>
                    <td className="py-2">{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CSPDetails;