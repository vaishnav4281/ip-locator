
export interface LocationData {
  ip: string;
  country_code: string;
  country_name: string;
  region_name: string;
  city_name: string;
  latitude: number;
  longitude: number;
  zip_code: string;
  time_zone: string;
  asn: string;
  as: string;
  isp: string;
  domain: string;
  net_speed: string;
  idd_code: string;
  area_code: string;
  weather_station_code: string;
  weather_station_name: string;
  mcc: string;
  mnc: string;
  mobile_brand: string;
  elevation: number;
  usage_type: string;
  address_type: string;
  continent: {
    name: string;
    code: string;
    hemisphere: string[];
    translation: {
      lang: string;
      value: string;
    };
  };
  district: string;
  is_proxy: boolean;
  proxy: {
    last_seen: number;
    proxy_type: string;
    threat: string;
    provider: string;
  };
  original_input?: string;  // Added this field to store the original domain/IP input
  
  // Additional fields from enhanced data
  organization?: string;
  hostname?: string;
  postal?: string;
  continent_code?: string;
  continent_name?: string;
  currency_code?: string;
  currency_name?: string;
  languages?: string[];
  calling_code?: string;
  flag?: string;
  loc?: string;
  org?: string;
}
