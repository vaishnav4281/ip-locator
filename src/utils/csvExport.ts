import { LocationData } from "@/types/location";

export const exportToCSV = async (data: LocationData): Promise<void> => {
  try {
    // Get ISP from as field if isp is unknown
    const isp = data.isp || data.as || "Unknown";
    // Get domain from original_input field (which contains the original domain/IP input)
    const domain = data.original_input || data.domain || data.org || data.organization || data.hostname || "Unknown";

    const csvData = [
      ["Field", "Value"],
      ["IP Address", data.ip],
      ["Country", `${data.country_name} (${data.country_code})`],
      ["Region", data.region_name || "Unknown"],
      ["City", data.city_name || "Unknown"],
      ["Latitude", data.latitude?.toString() || "Unknown"],
      ["Longitude", data.longitude?.toString() || "Unknown"],
      ["Timezone", data.time_zone || "Unknown"],
      ["ISP", isp],
      ["ASN", data.asn || "Unknown"],
      ["Domain", domain],
      ["Zip Code", data.zip_code || "Unknown"],
      ["Is Proxy", data.is_proxy ? "Yes" : "No"]
    ];

    const csvContent = csvData
      .map(row => row.map(field => `"${field}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `geolocation-${data.ip}-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error('Error exporting CSV:', error);
    throw error;
  }
};

export const exportBulkToCSV = async (dataArray: LocationData[]): Promise<void> => {
  try {
    if (!dataArray || dataArray.length === 0) {
      throw new Error('No data to export');
    }

    const headers = ['IP Address', 'Country', 'Region', 'City', 'Latitude', 'Longitude', 'Timezone', 'ISP', 'ASN', 'Domain', 'Zip Code', 'Is Proxy'];

    const csvData = [
      headers,
      ...dataArray.map(data => {
        // Get ISP from as field if isp is unknown
        const isp = data.isp || data.as || "Unknown";
        // Get domain from original_input field (which contains the original domain/IP input)
        const domain = data.original_input || data.domain || data.org || data.organization || data.hostname || "Unknown";
        return [
          data.ip || "Unknown",
          `${data.country_name || "Unknown"} (${data.country_code || "Unknown"})`,
          data.region_name || "Unknown",
          data.city_name || "Unknown",
          data.latitude?.toString() || "Unknown",
          data.longitude?.toString() || "Unknown",
          data.time_zone || "Unknown",
          isp,
          data.asn || "Unknown",
          domain,
          data.zip_code || "Unknown",
          data.is_proxy ? "Yes" : "No"
        ];
      })
    ];

    const csvContent = csvData
      .map(row => row.map(field => `"${field}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    
    // Create and trigger download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `bulk-geolocation-${new Date().toISOString().split('T')[0]}.csv`;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Error exporting CSV:', error);
    throw error instanceof Error ? error : new Error('Failed to export CSV');
  }
};
