
import { useState } from "react";
import { SearchForm } from "@/components/SearchForm";
import { LocationCard } from "@/components/LocationCard";
import { BulkUpload } from "@/components/BulkUpload";
import { BulkResults } from "@/components/BulkResults";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportToCSV, exportBulkToCSV } from "@/utils/csvExport";
import { fetchBulkLocationData } from "@/utils/api";
import { LocationData } from "@/types/location";

const Index = () => {
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [bulkResults, setBulkResults] = useState<LocationData[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBulkLoading, setIsBulkLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single');

  const handleExportCSV = async () => {
    setIsExporting(true);
    setError(null); // Clear any previous error
    
    try {
      if (locationData) {
        await exportToCSV(locationData);
      } else if (bulkResults.length > 0) {
        await exportBulkToCSV(bulkResults);
      } else {
        throw new Error("No data to export");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to export data";
      console.error("CSV export error:", error);
      setError(errorMessage);
    } finally {
      setIsExporting(false);
    }
  };

  const handleBulkUpload = async (domains: string[]) => {
    setIsBulkLoading(true);
    setError(null);
    
    try {
      const results = await fetchBulkLocationData(domains);
      setBulkResults(results);
      if (results.length === 0) {
        setError("No valid results found for the provided domains");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to process bulk domains");
    } finally {
      setIsBulkLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            IP Geolocation
            <span className="bg-gradient-to-r from-red-500 to-blue-600 bg-clip-text text-transparent">
              {" "}Lookup
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover detailed location information for any IP address or domain. 
            Get insights about country, city, ISP, timezone, and security details.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-1 shadow-sm">
            <button
              onClick={() => setActiveTab('single')}
              className={`flex-1 py-3 px-6 rounded-lg transition-all duration-200 font-medium ${
                activeTab === 'single'
                  ? 'bg-gradient-to-r from-red-500 to-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Single Search
            </button>
            <button
              onClick={() => setActiveTab('bulk')}
              className={`flex-1 py-3 px-6 rounded-lg transition-all duration-200 font-medium ${
                activeTab === 'bulk'
                  ? 'bg-gradient-to-r from-red-500 to-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Bulk Upload
            </button>
          </div>
        </div>

        {activeTab === 'single' ? (
          <>
            {/* Search Form */}
            <div className="max-w-2xl mx-auto mb-8">
              <SearchForm
                onSearch={setLocationData}
                onLoading={setIsLoading}
                onError={setError}
                isLoading={isLoading}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="max-w-2xl mx-auto mb-8">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-700 text-center font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Results */}
            {locationData && (
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Location Details
                  </h2>
                  <Button
                    onClick={handleExportCSV}
                    disabled={isExporting || !locationData}
                    className="bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 text-white shadow-md"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {isExporting ? 'Exporting...' : 'Export CSV'}
                  </Button>
                </div>
                <LocationCard data={locationData} />
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-8 shadow-sm">
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-red-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600">Fetching location data...</p>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Bulk Upload */}
            <div className="max-w-2xl mx-auto mb-8">
              <BulkUpload onBulkUpload={handleBulkUpload} isLoading={isBulkLoading} />
            </div>

            {/* Error Message */}
            {error && (
              <div className="max-w-2xl mx-auto mb-8">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-700 text-center font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Bulk Loading State */}
            {isBulkLoading && (
              <div className="max-w-4xl mx-auto mb-8">
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-8 shadow-sm">
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-red-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600">Processing domains...</p>
                  </div>
                </div>
              </div>
            )}

            {/* Bulk Results */}
            {bulkResults.length > 0 && (
              <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Bulk Results
                  </h2>
                  <Button
                    onClick={handleExportCSV}
                    disabled={isExporting || bulkResults.length === 0}
                    className="bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 text-white shadow-md"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {isExporting ? 'Exporting...' : 'Export CSV'}
                  </Button>
                </div>
                <BulkResults results={bulkResults} />
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          <p>Powered by IP2Location.io API</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
