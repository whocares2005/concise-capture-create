
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import TextInput from "@/components/summary/TextInput";
import ImageInput from "@/components/summary/ImageInput";
import FormatSelector from "@/components/summary/FormatSelector";
import SummaryResult from "@/components/summary/SummaryResult";
import ImageResult from "@/components/summary/ImageResult";
import { FileText, Image } from "lucide-react";
import { generateSummary, analyzeImage, SummaryResponse, ImageAnalysisResponse } from "@/lib/api";

export default function Summary() {
  const [activeTab, setActiveTab] = useState<string>("text");
  const [outputFormat, setOutputFormat] = useState<string>("gist");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [geminiApiKey, setGeminiApiKey] = useState<string>(() => {
    // Load API key from localStorage if available
    return localStorage.getItem("gemini_api_key") || "";
  });
  
  const [textSummary, setTextSummary] = useState<SummaryResponse | null>(null);
  const [imageAnalysis, setImageAnalysis] = useState<ImageAnalysisResponse | null>(null);
  
  // Save API key to localStorage when it changes
  useEffect(() => {
    if (geminiApiKey) {
      localStorage.setItem("gemini_api_key", geminiApiKey);
    }
  }, [geminiApiKey]);
  
  const handleTextSubmit = async (text: string) => {
    setIsProcessing(true);
    try {
      const result = await generateSummary({
        text,
        format: outputFormat as "gist" | "bullets" | "image",
        apiKey: geminiApiKey
      });
      setTextSummary(result);
    } catch (error) {
      console.error("Text processing error:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleImageSubmit = async (file: File) => {
    setIsProcessing(true);
    try {
      const result = await analyzeImage({ 
        image: file,
        apiKey: geminiApiKey
      });
      setImageAnalysis(result);
    } catch (error) {
      console.error("Image processing error:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <Layout>
      <div className="container max-w-6xl py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Content Summarizer</h1>
          <p className="text-muted-foreground">
            Transform lengthy content into concise summaries or analyze images with AI
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div>
            <Card>
              <CardContent className="p-6">
                <Tabs 
                  defaultValue="text" 
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="mb-6"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="text" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Text Input
                    </TabsTrigger>
                    <TabsTrigger value="image" className="flex items-center gap-2">
                      <Image className="h-4 w-4" />
                      Image Input
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="text" className="mt-6">
                    <div className="space-y-6">
                      <FormatSelector 
                        selectedFormat={outputFormat} 
                        onFormatChange={setOutputFormat}
                        apiKey={geminiApiKey}
                        onApiKeyChange={setGeminiApiKey}
                      />
                      <TextInput 
                        onSubmit={handleTextSubmit} 
                        isProcessing={isProcessing} 
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="image" className="mt-6">
                    <div className="space-y-6">
                      <FormatSelector 
                        selectedFormat="gist" 
                        onFormatChange={() => {}} // No-op for image analysis
                        apiKey={geminiApiKey}
                        onApiKeyChange={setGeminiApiKey}
                      />
                      <ImageInput 
                        onSubmit={handleImageSubmit} 
                        isProcessing={isProcessing} 
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* Results Section */}
          <div>
            {activeTab === "text" && textSummary && (
              outputFormat === "image" ? (
                <ImageResult 
                  imageUrl={textSummary.imageUrl || ""} 
                  description={textSummary.summary}
                  poweredBy={textSummary.powered} 
                />
              ) : (
                <SummaryResult 
                  content={textSummary.summary} 
                  type={outputFormat as "gist" | "bullets"} 
                  keywords={textSummary.keywords}
                  poweredBy={textSummary.powered}
                />
              )
            )}
            
            {activeTab === "image" && imageAnalysis && (
              <ImageResult 
                imageUrl={imageAnalysis.imageUrl} 
                description={imageAnalysis.description}
                poweredBy={imageAnalysis.powered} 
              />
            )}
            
            {!textSummary && !imageAnalysis && (
              <div className="flex items-center justify-center h-full min-h-[400px] bg-muted/30 rounded-lg border border-dashed">
                <div className="text-center px-6">
                  <p className="text-muted-foreground mb-2">
                    {activeTab === "text" 
                      ? "Enter text to generate a summary" 
                      : "Upload an image to analyze"}
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    Results will appear here after processing
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
