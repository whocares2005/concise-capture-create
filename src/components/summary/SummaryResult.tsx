
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Download, Check, FileText, ListOrdered } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface SummaryResultProps {
  content: string;
  type: "gist" | "bullets";
  keywords?: string[];
  poweredBy?: string;
}

export default function SummaryResult({ content, type, keywords = [], poweredBy }: SummaryResultProps) {
  const [copied, setCopied] = useState(false);
  const [highlightedContent, setHighlightedContent] = useState(content);

  useEffect(() => {
    let formattedContent = content;
    
    // If the content is bullet points, we don't need to highlight keywords
    if (type !== "bullets" && keywords.length > 0) {
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
        formattedContent = formattedContent.replace(
          regex, 
          '<span class="highlight">$1</span>'
        );
      });
    }
    
    setHighlightedContent(formattedContent);
  }, [content, keywords, type]);

  const copyToClipboard = () => {
    // Remove HTML tags for plain text copy
    const plainText = content.replace(/<[^>]*>/g, '');
    navigator.clipboard.writeText(plainText);
    setCopied(true);
    toast.success("Copied to clipboard");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const downloadSummary = () => {
    // Remove HTML tags for plain text download
    const plainText = content.replace(/<[^>]*>/g, '');
    const blob = new Blob([plainText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `summary-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Summary downloaded");
  };

  // Format bullet points from string to list items
  const formatBulletPoints = (bulletText: string) => {
    // Split by newlines and filter out empty lines
    const lines = bulletText.split('\n').filter(line => line.trim().length > 0);
    
    // Process each line to ensure it has proper bullet format
    return lines.map((line, idx) => {
      // Remove existing bullet characters and trim whitespace
      const cleanLine = line.trim().replace(/^[-•*]\s*/, '');
      return (
        <li key={idx} className="text-sm">
          {cleanLine}
        </li>
      );
    });
  };

  return (
    <Card className="animate-fade-up">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-medium">
          {type === "gist" ? "Summary" : "Key Points"}
          {poweredBy === "Gemini" && (
            <span className="ml-2 text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
              Powered by Gemini
            </span>
          )}
        </CardTitle>
        <div className="bg-primary/10 rounded-full p-1">
          {type === "gist" ? (
            <FileText className="h-4 w-4 text-primary" />
          ) : (
            <ListOrdered className="h-4 w-4 text-primary" />
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className={cn(
          "max-h-[500px] overflow-y-auto p-1",
          type === "bullets" ? "space-y-2" : ""
        )}>
          {type === "bullets" ? (
            // Display as a list for bullet points with improved formatting
            <ul className="list-disc pl-5 space-y-2">
              {formatBulletPoints(content)}
            </ul>
          ) : (
            // Display as paragraphs for gist with highlighted keywords
            <div 
              className="text-sm space-y-4 whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: highlightedContent }}
            />
          )}
        </div>
        
        {keywords && keywords.length > 0 && type === "gist" && (
          <div className="mt-4 pt-3 border-t">
            <p className="text-sm font-medium mb-2">Keywords:</p>
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword, index) => (
                <span 
                  key={index} 
                  className="text-xs bg-brand-100 text-brand-800 px-2 py-1 rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}
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
            onClick={downloadSummary}
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
