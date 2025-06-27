
import { LocationData } from "@/types/location";
import { resolveDomainToIP } from "./domainResolver";

const API_KEY = "D509C2C9ABE8F74D05B02858BAB1F0B2";

export const fetchLocationData = async (ipOrDomain: string): Promise<LocationData> => {
  console.log(`Fetching location data for: ${ipOrDomain}`);
  
  try {
    // Resolve domain to IP if necessary
    const ip = await resolveDomainToIP(ipOrDomain);
    console.log(`Resolved ${ipOrDomain} to IP: ${ip}`);
    
    // Use a CORS proxy to bypass CORS restrictions
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const targetUrl = `https://api.ip2location.io/?key=${API_KEY}&ip=${encodeURIComponent(ip)}`;
    const url = proxyUrl + encodeURIComponent(targetUrl);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    const proxyData = await response.json();
    const data = JSON.parse(proxyData.contents);
    console.log("API Response:", data);
    
    // Check if the API returned an error
    if (data.error) {
      throw new Error(data.error.error_message || "API returned an error");
    }
    
    // Add the original input to the response for reference
    return { ...data, original_input: ipOrDomain } as LocationData;
  } catch (error) {
    console.error("Error fetching location data:", error);
    
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error("Failed to fetch location data");
  }
};

export const fetchBulkLocationData = async (domains: string[]): Promise<LocationData[]> => {
  console.log(`Fetching bulk location data for ${domains.length} domains`);
  
  const results: LocationData[] = [];
  
  for (const domain of domains) {
    try {
      const data = await fetchLocationData(domain.trim());
      results.push(data);
      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Failed to fetch data for ${domain}:`, error);
      // Continue with other domains even if one fails
    }
  }
  
  return results;
};
