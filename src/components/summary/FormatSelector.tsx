
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, ListOrdered, Image } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface FormatSelectorProps {
  selectedFormat: string;
  onFormatChange: (format: string) => void;
  apiKey: string;
  onApiKeyChange: (apiKey: string) => void;
}

export default function FormatSelector({ 
  selectedFormat, 
  onFormatChange,
  apiKey,
  onApiKeyChange
}: FormatSelectorProps) {
  const [showApiKey, setShowApiKey] = useState(false);
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Select output format</Label>
        <Tabs 
          defaultValue={selectedFormat} 
          onValueChange={onFormatChange}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="gist" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Complete Summary</span>
              <span className="sm:hidden">Summary</span>
            </TabsTrigger>
            <TabsTrigger value="bullets" className="flex items-center gap-2">
              <ListOrdered className="h-4 w-4" />
              <span className="hidden sm:inline">Bullet Points</span>
              <span className="sm:hidden">Bullets</span>
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              <span className="hidden sm:inline">Generate Image</span>
              <span className="sm:hidden">Image</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="gemini-api-key">
            <span className="flex items-center gap-1">
              Gemini API Key
              <div className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-green-100 text-green-600 text-xs font-medium">
                G
              </div>
            </span>
          </Label>
          <button
            type="button"
            className="text-xs text-blue-600 hover:underline"
            onClick={() => setShowApiKey(!showApiKey)}
          >
            {showApiKey ? "Hide" : "Show"}
          </button>
        </div>
        <Input 
          id="gemini-api-key"
          type={showApiKey ? "text" : "password"}
          placeholder="Enter your Gemini API key"
          value={apiKey}
          onChange={(e) => onApiKeyChange(e.target.value)}
          className="font-mono text-sm"
        />
        <p className="text-xs text-muted-foreground">
          Get a key from <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google AI Studio</a>
        </p>
      </div>
    </div>
  );
}
