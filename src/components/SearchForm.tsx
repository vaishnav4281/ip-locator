
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { fetchLocationData } from "@/utils/api";
import { LocationData } from "@/types/location";

interface SearchFormProps {
  onSearch: (data: LocationData | null) => void;
  onLoading: (loading: boolean) => void;
  onError: (error: string | null) => void;
  isLoading: boolean;
}

export const SearchForm = ({ onSearch, onLoading, onError, isLoading }: SearchFormProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) {
      onError("Please enter an IP address or domain");
      return;
    }

    onError(null);
    onLoading(true);

    try {
      const data = await fetchLocationData(input.trim());
      onSearch(data);
    } catch (error) {
      onError(error instanceof Error ? error.message : "Failed to fetch location data");
      onSearch(null);
    } finally {
      onLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Enter IP address or domain (e.g., 8.8.8.8 or google.com)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-400 focus:ring-red-400/20 h-12 text-base"
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 text-white h-12 px-8 shadow-md font-medium"
          >
            <Search className="w-4 h-4 mr-2" />
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>
    </form>
  );
};
