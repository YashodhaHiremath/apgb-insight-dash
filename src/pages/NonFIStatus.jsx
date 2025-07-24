import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FileText, Building2, Users, TrendingUp } from "lucide-react";
import DataTable from "@/components/tables/DataTable";
import ROChart from "@/components/charts/ROChart";
import { roSSSData } from "@/data/mockData";

const NonFIStatus = () => {
  const navigate = useNavigate();
  const [selectedMonths, setSelectedMonths] = useState<string[]>(["July"]);

  const months = ["April", "May", "June", "July"];

  const handleMonthChange = (month, checked) => {
    if (checked) {
      setSelectedMonths([...selectedMonths, month]);
    } else {
      setSelectedMonths(selectedMonths.filter(m => m !== month));
    }
  };

  const handleSelectAll = () => {
    setSelectedMonths(months);
  };

  const handleSelectNone = () => {
    setSelectedMonths([]);
  };

  const handleSubmit = () => {
    // Filter data based on selected months - in real app this would be an API call
    console.log("Filtering data for months:", selectedMonths);
  };

  // Calculate totals
  const totalAPY = roSSSData.reduce((sum, ro) => sum + ro.apy, 0);
  const totalPMJJBY = roSSSData.reduce((sum, ro) => sum + ro.pmjjby, 0);
  const totalPMSBY = roSSSData.reduce((sum, ro) => sum + ro.pmsby, 0);

  const overviewCards = [
    {
      title: "Total APY",
      value: totalAPY.toLocaleString(),
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Total PMJJBY",
      value: totalPMJJBY.toLocaleString(),
      icon: Building2,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Total PMSBY",
      value: totalPMSBY.toLocaleString(),
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const tableColumns = [
    { key: 'sno', label: 'S.No.', width: '60px' },
    { key: 'roName', label: 'RO Name', width: '200px' },
    { key: 'apy', label: 'APY' },
    { key: 'pmjjby', label: 'PMJJBY' },
    { key: 'pmsby', label: 'PMSBY' }
  ];

  const handleROClick = (row) => {
    navigate(`/dashboard/non-fi/${encodeURIComponent(row.roName)}`);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            SSS Products Monthwise Status of ALL ROs
          </h1>
          <p className="text-muted-foreground mt-1">
            Social Security Schemes Product Status Report
          </p>
        </div>
        <Badge variant="secondary" className="mt-2 sm:mt-0">
          Non-FI Status Report
        </Badge>
      </div>

      {/* Month Selection */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg">ALL ROS' SUMMARY</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-base font-medium">Select Month(s)</Label>
            <div className="flex gap-4 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
              >
                Select All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectNone}
              >
                None
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            {months.map((month) => (
              <div key={month} className="flex items-center space-x-2">
                <Checkbox
                  id={month}
                  checked={selectedMonths.includes(month)}
                  onCheckedChange={(checked) => 
                    handleMonthChange(month, checked)
                  }
                />
                <Label htmlFor={month}>{month}</Label>
              </div>
            ))}
          </div>

          <Button 
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary/90"
          >
            Submit
          </Button>
        </CardContent>
      </Card>

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
              <p className="text-xs text-muted-foreground">
                For selected months: {selectedMonths.join(", ")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ROChart
          data={roSSSData}
          type="bar"
          title="APY Distribution by RO"
          dataKey="apy"
          nameKey="roName"
        />
        <ROChart
          data={roSSSData}
          type="bar"
          title="PMJJBY Distribution by RO"
          dataKey="pmjjby"
          nameKey="roName"
        />
      </div>

      {/* SSS Data Table */}
      <DataTable
        title={`All RO Wise SSS Status for the month(s) of ${selectedMonths.join(", ")}`}
        data={roSSSData}
        columns={tableColumns}
        onRowClick={handleROClick}
        searchPlaceholder="Search by RO name..."
      />
    </div>
  );
};

export default NonFIStatus;