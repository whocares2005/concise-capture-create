
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, ListOrdered, Image } from "lucide-react";

interface FormatSelectorProps {
  selectedFormat: string;
  onFormatChange: (format: string) => void;
}

export default function FormatSelector({ selectedFormat, onFormatChange }: FormatSelectorProps) {
  return (
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
            <span className="hidden sm:inline">Gist</span>
          </TabsTrigger>
          <TabsTrigger value="bullets" className="flex items-center gap-2">
            <ListOrdered className="h-4 w-4" />
            <span className="hidden sm:inline">Bullet Points</span>
          </TabsTrigger>
          <TabsTrigger value="image" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            <span className="hidden sm:inline">Generate Image</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
