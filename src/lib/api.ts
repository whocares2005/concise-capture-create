
import { toast } from "sonner";

// API interfaces
export interface SummaryRequest {
  text: string;
  format: "gist" | "bullets" | "image";
  apiKey?: string;
}

export interface SummaryResponse {
  summary: string;
  keywords?: string[];
  imageUrl?: string;
  powered?: string;
}

export interface ImageAnalysisRequest {
  image: File;
  apiKey?: string;
}

export interface ImageAnalysisResponse {
  description: string;
  imageUrl: string;
  powered?: string;
}

// Extract keywords function
function extractKeywords(text: string): string[] {
  // This is a simplified implementation
  // In a real app, you would use NLP techniques or AI
  
  // Get all words, remove common words, and pick most frequent ones
  const words = text.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
  
  // Common words to exclude
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

// Generate summary using Gemini API
export async function generateSummary(request: SummaryRequest): Promise<SummaryResponse> {
  try {
    // Check if API key is provided
    if (!request.apiKey) {
      toast.error("Please enter your Gemini API key to generate summaries");
      return {
        summary: "Please provide a Gemini API key to use this feature.",
        powered: "Mock"
      };
    }

    // Determine the format instruction based on the requested format
    let formatInstruction = "";
    
    if (request.format === "gist") {
      formatInstruction = "Provide a comprehensive summary that captures all the main points, ideas, and arguments in the text. Structure it as coherent paragraphs.";
    } 
    else if (request.format === "bullets") {
      formatInstruction = "Create a bullet-point summary (up to 10 points) that captures the key information in the text. Each point should begin with a dash (-) and be on a new line. Make each point concise and contain a complete idea.";
    }
    else if (request.format === "image") {
      // For image generation, we'll still use a placeholder
      return {
        summary: "A summary of the key concepts from the provided text.",
        imageUrl: "https://picsum.photos/seed/summary/800/600",
        powered: "Gemini"
      };
    }

    // Prepare the prompt for Gemini
    const prompt = `
      I need you to summarize the following text.
      ${formatInstruction}
      If it's a bullet point format, start each point with a dash (-) and make sure each point is on a new line.
      
      Here's the text to summarize:
      ${request.text}
    `;

    // Call the Gemini API
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": request.apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      toast.error("Error from Gemini API. Please check your API key and try again.");
      return {
        summary: "Failed to generate summary. Error from Gemini API.",
        powered: "Error"
      };
    }

    const data = await response.json();
    
    // Process the response based on format
    let summary = "";
    if (data.candidates && data.candidates[0]?.content?.parts) {
      summary = data.candidates[0].content.parts[0].text || "";
    }
    
    if (!summary) {
      throw new Error("No summary was generated");
    }
    
    // For bullet points, ensure proper formatting
    if (request.format === "bullets") {
      // If the response doesn't already have proper bullet point format,
      // we'll format it ourselves by splitting on dashes or new lines
      const lines = summary.split('\n').filter(line => line.trim().length > 0);
      
      // Check if there are bullet points already (lines starting with - or •)
      const hasBullets = lines.some(line => line.trim().match(/^[-•*]\s/));
      
      if (!hasBullets) {
        // Format each line as a bullet point
        summary = lines.map(line => line.trim().replace(/^[•*-]?\s*/, '- ')).join('\n');
      }
    }
    
    // Extract keywords for gist format
    let keywords: string[] = [];
    if (request.format === "gist") {
      keywords = extractKeywords(request.text);
    }
    
    return {
      summary,
      keywords: keywords.length > 0 ? keywords : undefined,
      powered: "Gemini"
    };
  } catch (error) {
    console.error("Error generating summary:", error);
    toast.error("Failed to generate summary. Please try again.");
    return {
      summary: "An error occurred while generating the summary. Please try again.",
      powered: "Error"
    };
  }
}

// Analyze image using Gemini API
export async function analyzeImage(request: ImageAnalysisRequest): Promise<ImageAnalysisResponse> {
  try {
    // Check if API key is provided
    if (!request.apiKey) {
      toast.error("Please enter your Gemini API key to analyze images");
      return {
        description: "Please provide a Gemini API key to use this feature.",
        imageUrl: URL.createObjectURL(request.image),
        powered: "Mock"
      };
    }

    // Create file URL for display
    const imageUrl = URL.createObjectURL(request.image);
    
    // Convert the image to Base64
    const base64Image = await convertImageToBase64(request.image);
    
    // Prepare the prompt for image analysis
    const prompt = "Describe this image in detail, focusing on its main content, visible elements, and any text that appears in it. Provide a comprehensive but concise explanation.";

    // Call Gemini API for image analysis
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-vision:generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": request.apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              },
              {
                inline_data: {
                  mime_type: request.image.type,
                  data: base64Image
                }
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      toast.error("Error from Gemini API. Please check your API key and try again.");
      return {
        description: "Failed to analyze image. Error from Gemini API.",
        imageUrl,
        powered: "Error"
      };
    }

    const data = await response.json();
    
    let description = "";
    if (data.candidates && data.candidates[0]?.content?.parts) {
      description = data.candidates[0].content.parts[0].text || "";
    }
    
    if (!description) {
      throw new Error("No description was generated");
    }
    
    return {
      description,
      imageUrl,
      powered: "Gemini"
    };
  } catch (error) {
    console.error("Error analyzing image:", error);
    toast.error("Failed to analyze image. Please try again.");
    return {
      description: "An error occurred while analyzing the image. Please try again.",
      imageUrl: URL.createObjectURL(request.image),
      powered: "Error"
    };
  }
}

// Helper function to convert image to Base64
async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      } else {
        reject(new Error('Failed to convert image to Base64'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
