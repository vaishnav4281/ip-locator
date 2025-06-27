
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Globe, Info } from "lucide-react";

interface BulkUploadProps {
  onBulkUpload: (domains: string[]) => void;
  isLoading: boolean;
}

export const BulkUpload = ({ onBulkUpload, isLoading }: BulkUploadProps) => {
  const [domains, setDomains] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setDomains(content);
      };
      reader.readAsText(file);
    }
  };

  const handleBulkSubmit = () => {
    const domainList = domains
      .split('\n')
      .map(domain => domain.trim())
      .filter(domain => domain.length > 0);
    
    if (domainList.length > 0) {
      onBulkUpload(domainList);
    }
  };

  const domainCount = domains
    .split('\n')
    .map(domain => domain.trim())
    .filter(domain => domain.length > 0).length;

  return (
    <div className="space-y-6">


      {/* Upload Card */}
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-gray-900">
            <div className="p-2 rounded-lg bg-red-50 border border-red-200">
              <Globe className="w-5 h-5 text-red-600" />
            </div>
            Bulk Domain Upload
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* File Upload Section */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Upload from file
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept=".txt,.csv"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                disabled={isLoading}
              />
              <label
                htmlFor="file-upload"
                className={`flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg cursor-pointer transition-all duration-200 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <FileText className="w-4 h-4" />
                Choose File (.txt, .csv)
              </label>
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Text Input Section */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Paste domains/IPs (one per line)
            </label>
            <Textarea
              placeholder="google.com&#10;8.8.8.8&#10;facebook.com&#10;1.1.1.1"
              value={domains}
              onChange={(e) => setDomains(e.target.value)}
              className="bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-400 focus:ring-red-400/20 min-h-[120px] font-mono text-sm"
              disabled={isLoading}
            />
            {domainCount > 0 && (
              <p className="text-sm text-gray-600">
                {domainCount} domain{domainCount !== 1 ? 's' : ''} ready to process
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleBulkSubmit}
            disabled={isLoading || !domains.trim()}
            className="w-full bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 text-white h-12 font-medium"
          >
            <Upload className="w-4 h-4 mr-2" />
            {isLoading ? "Processing..." : `Process ${domainCount} Domain${domainCount !== 1 ? 's' : ''}`}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
