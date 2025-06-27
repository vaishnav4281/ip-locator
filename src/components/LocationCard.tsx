
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LocationData } from "@/types/location";
import { 
  Globe, 
  MapPin, 
  Building2, 
  Clock, 
  Navigation, 
  Shield,
  Wifi,
  Map
} from "lucide-react";

interface LocationCardProps {
  data: LocationData;
}

export const LocationCard = ({ data }: LocationCardProps) => {
  const infoItems = [
    {
      icon: Globe,
      label: "Country",
      value: `${data.country_name} (${data.country_code})`,
      color: "bg-red-50 text-red-600 border-red-200",
    },
    {
      icon: MapPin,
      label: "City",
      value: data.city_name || "Unknown",
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      icon: Map,
      label: "Region", 
      value: data.region_name || "Unknown",
      color: "bg-red-50 text-red-600 border-red-200",
    },
    {
      icon: Building2,
      label: "ISP",
      value: data.isp || data.as,
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      icon: Clock,
      label: "Timezone",
      value: data.time_zone || "Unknown",
      color: "bg-red-50 text-red-600 border-red-200",
    },
    {
      icon: Navigation,
      label: "Coordinates",
      value: data.loc?.split(',').join(', ') || 
        (data.latitude && data.longitude ? `${data.latitude}, ${data.longitude}` : "Unknown"),
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      icon: Wifi,
      label: "IP Address",
      value: data.ip,
      color: "bg-red-50 text-red-600 border-red-200",
    },
    {
      icon: Shield,
      label: "Proxy Detection",
      value: data.is_proxy || data.proxy?.proxy_type ? "Detected" : "Not Detected",
      color: (data.is_proxy || data.proxy?.proxy_type)
        ? "bg-yellow-50 text-yellow-600 border-yellow-200" 
        : "bg-green-50 text-green-600 border-green-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {infoItems.map((item, index) => (
        <Card key={index} className="bg-white/90 backdrop-blur-sm border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-gray-700 text-sm font-medium">
              <div className={`p-2 rounded-lg border ${item.color}`}>
                <item.icon className="w-4 h-4" />
              </div>
              {item.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-gray-900 font-semibold text-lg break-words">
              {item.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
