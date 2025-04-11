
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Image, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ImageInputProps {
  onSubmit: (file: File) => void;
  isProcessing: boolean;
}

export default function ImageInput({ onSubmit, isProcessing }: ImageInputProps) {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (image) {
      onSubmit(image);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      if (!file.type.startsWith("image/")) {
        toast.error("Please drop an image file");
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const clearImage = () => {
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="image-upload">Upload an image</Label>
        
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-4 transition-colors",
            "hover:border-brand-400 focus-within:border-brand-400",
            preview ? "border-brand-400" : "border-muted"
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {preview ? (
            <div className="relative">
              <img 
                src={preview} 
                alt="Preview" 
                className="max-h-[300px] mx-auto rounded object-contain"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={clearImage}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove image</span>
              </Button>
              <p className="text-sm text-center mt-2 text-muted-foreground">
                {image?.name} ({(image?.size || 0) / 1024 < 1000 
                  ? `${Math.round((image?.size || 0) / 1024)} KB` 
                  : `${Math.round((image?.size || 0) / 1024 / 1024 * 10) / 10} MB`})
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="mb-4 rounded-full bg-muted p-3">
                <Image className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="mb-2 text-sm font-medium">
                Drag and drop your image here
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                SVG, PNG, JPG or GIF (max. 5MB)
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Select Image
              </Button>
              <input
                id="image-upload"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className={cn(
            "bg-brand-600 hover:bg-brand-700",
            isProcessing && "opacity-70 cursor-not-allowed"
          )}
          disabled={isProcessing || !image}
        >
          {isProcessing ? (
            <>
              <span className="mr-2">Processing</span>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            </>
          ) : (
            <>
              <Image className="mr-2 h-4 w-4" />
              Analyze Image
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
