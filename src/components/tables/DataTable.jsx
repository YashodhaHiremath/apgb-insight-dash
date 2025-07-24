import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, Printer, FileText, Eye } from "lucide-react";


const DataTable = ({ 
  title, 
  data, 
  columns, 
  onRowClick, 
  showActions = true,
  searchPlaceholder = "Search..."
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((row) =>
    columns.some((column) =>
      String(row[column.key]).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleExport = (type) => {
    // Mock export functionality
    console.log(`Exporting as ${type}`);
  };

  return (
    <Card className="shadow-soft">
      <CardHeader className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-lg">{title}</CardTitle>
          
          {showActions && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('excel')}
                className="text-xs"
              >
                <FileText className="h-3 w-3 mr-1" />
                Excel
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('pdf')}
                className="text-xs"
              >
                <Download className="h-3 w-3 mr-1" />
                PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('print')}
                className="text-xs"
              >
                <Printer className="h-3 w-3 mr-1" />
                Print
              </Button>
            </div>
          )}
        </div>
        
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                {columns.map((column) => (
                  <TableHead 
                    key={column.key} 
                    className="font-semibold"
                    style={{ width: column.width }}
                  >
                    {column.label}
                  </TableHead>
                ))}
                {onRowClick && (
                  <TableHead className="w-16">Action</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow 
                  key={index}
                  className={`hover:bg-muted/30 ${onRowClick ? 'cursor-pointer' : ''}`}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((column) => (
                    <TableCell key={column.key} className="py-3">
                      {typeof row[column.key] === 'number' 
                        ? row[column.key].toLocaleString()
                        : row[column.key]
                      }
                    </TableCell>
                  ))}
                  {onRowClick && (
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRowClick(row);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {filteredData.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No data found
          </div>
        )}
        
        <div className="mt-4 text-sm text-muted-foreground">
          Showing {filteredData.length} of {data.length} entries
        </div>
      </CardContent>
    </Card>
  );
};

export default DataTable;