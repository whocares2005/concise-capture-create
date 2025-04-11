import { toast } from "sonner";

// Mock API service for demo purposes
// In a production application, this would connect to a real backend

export interface SummaryRequest {
  text: string;
  format: "gist" | "bullets" | "image";
}

export interface SummaryResponse {
  summary: string;
  keywords?: string[];
  imageUrl?: string;
}

export interface ImageAnalysisRequest {
  image: File;
}

export interface ImageAnalysisResponse {
  description: string;
  imageUrl: string;
}

// Mock delay to simulate API call
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock text summary function
export async function generateSummary(request: SummaryRequest): Promise<SummaryResponse> {
  try {
    // Simulate API delay
    await delay(2000);
    
    // Mock summary based on format
    let summary = "";
    
    if (request.format === "gist") {
      // Create a more comprehensive summary
      const paragraphs = request.text.split('\n\n');
      
      // Use all the paragraphs but condense them
      summary = paragraphs.map(para => {
        // Keep sentences that appear meaningful (longer than 20 chars)
        return para.split(/[.!?]+/)
          .filter(s => s.trim().length > 20)
          .join(". ");
      }).join("\n\n");
      
      // If still very long, trim it down a bit
      if (summary.length > 1000) {
        summary = summary.substring(0, 1000) + "...";
      }
      
      // Extract mock keywords
      const keywords = extractKeywords(request.text);
      
      return {
        summary,
        keywords
      };
    } 
    else if (request.format === "bullets") {
      // Create more comprehensive bullet points
      const sentences = request.text.split(/[.!?]+/);
      
      // Take up to 10 meaningful points (instead of just 5)
      const points = sentences
        .filter(s => s.trim().length > 20)  // Only sentences with reasonable length
        .slice(0, 10)  // Take up to 10 points
        .map(s => s.trim())
        .join("\n");
        
      return {
        summary: points
      };
    }
    else if (request.format === "image") {
      // Mock image generation - return a placeholder image
      return {
        summary: "An image representing the key concepts from the provided text.",
        imageUrl: "https://picsum.photos/seed/summary/800/600"  // Random image from Lorem Picsum
      };
    }
    
    return {
      summary: "Summary could not be generated for the requested format."
    };
  } catch (error) {
    console.error("Error generating summary:", error);
    toast.error("Failed to generate summary. Please try again.");
    throw error;
  }
}

// Mock image analysis function
export async function analyzeImage(request: ImageAnalysisRequest): Promise<ImageAnalysisResponse> {
  try {
    // Simulate API delay
    await delay(2000);
    
    // Create file URL
    const imageUrl = URL.createObjectURL(request.image);
    
    // Mock description
    const description = "This image appears to contain various elements that would typically be analyzed by computer vision. The analysis would include details about objects, people, colors, text, and other visual elements present in the image. In a production environment, this would be processed by an AI vision model to provide accurate descriptions and insights about the image content.";
    
    return {
      description,
      imageUrl
    };
  } catch (error) {
    console.error("Error analyzing image:", error);
    toast.error("Failed to analyze image. Please try again.");
    throw error;
  }
}

// Helper function to extract mock keywords
function extractKeywords(text: string): string[] {
  // This is a simplified mock implementation
  // In a real app, you would use NLP techniques or AI
  
  // Get all words, remove common words, and pick most frequent ones
  const words = text.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
  
  // Mock common words to exclude
  const commonWords = new Set([
    "that", "this", "with", "from", "they", "have", "what", "were", "when", "where", 
    "will", "would", "could", "should", "their", "there", "about", "which", "these"
  ]);
  
  // Count word frequency
  const wordCounts: Record<string, number> = {};
  
  for (const word of words) {
    if (!commonWords.has(word)) {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }
  }
  
  // Sort by frequency and get top 5 words
  return Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word);
}
