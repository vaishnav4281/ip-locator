
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LocationData } from "@/types/location";
import { Globe, MapPin, ExternalLink } from "lucide-react";

interface BulkResultsProps {
  results: LocationData[];
}

export const BulkResults = ({ results }: BulkResultsProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">
        Bulk Results ({results.length} processed)
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((data, index) => (
          <Card key={index} className="bg-white border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-gray-900 text-lg">
                <div className="p-2 rounded-lg bg-gradient-to-r from-red-50 to-blue-50 border border-gray-200">
                  <Globe className="w-4 h-4 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">{data.ip}</div>
                  {(data as any).original_input && (data as any).original_input !== data.ip && (
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <ExternalLink className="w-3 h-3" />
                      <span className="truncate">{(data as any).original_input}</span>
                    </div>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span className="text-gray-600 text-sm">
                  {data.city_name}, {data.country_name}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-red-50 text-red-600 border-red-200">
                  {data.country_code}
                </Badge>
                {data.region_name && (
                  <Badge className="bg-blue-50 text-blue-600 border-blue-200">
                    {data.region_name}
                  </Badge>
                )}
                {data.is_proxy && (
                  <Badge className="bg-yellow-50 text-yellow-600 border-yellow-200">
                    Proxy
                  </Badge>
                )}
              </div>
              
              <div className="text-xs text-gray-500">
                ISP: {data.isp || data.as}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
