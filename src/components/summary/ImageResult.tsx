
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Download, Check, Image } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface ImageResultProps {
  imageUrl: string;
  description: string;
}

export default function ImageResult({ imageUrl, description }: ImageResultProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(description);
    setCopied(true);
    toast.success("Copied to clipboard");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const downloadDescription = () => {
    const blob = new Blob([description], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `image-description-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Description downloaded");
  };

  return (
    <Card className="animate-fade-up">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-medium">Image Analysis</CardTitle>
        <div className="bg-primary/10 rounded-full p-1">
          <Image className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 space-y-4">
        <div className="flex justify-center">
          <img 
            src={imageUrl} 
            alt="Analyzed image" 
            className="max-h-[300px] rounded object-contain"
          />
        </div>
        
        <div className="bg-muted p-4 rounded-md">
          <h4 className="text-sm font-medium mb-2">Analysis:</h4>
          <p className="text-sm">{description}</p>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <div className="flex space-x-2 ml-auto">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={copyToClipboard}
          >
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={downloadDescription}
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
