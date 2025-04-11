
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, FileText } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface TextInputProps {
  onSubmit: (text: string) => void;
  isProcessing: boolean;
}

export default function TextInput({ onSubmit, isProcessing }: TextInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim().length < 50) {
      toast.error("Please enter at least 50 characters for a better summary");
      return;
    }
    onSubmit(text);
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
      toast.success("Text pasted from clipboard");
    } catch (error) {
      toast.error("Failed to paste from clipboard");
      console.error("Clipboard error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="text-input">Enter or paste your text</Label>
        <div className="relative">
          <Textarea
            id="text-input"
            placeholder="Enter or paste text to summarize (minimum 50 characters)..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px] resize-y p-4 pr-12"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={handlePaste}
          >
            <Copy className="h-4 w-4" />
            <span className="sr-only">Paste from clipboard</span>
          </Button>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{text.length} characters</span>
          <span>{Math.ceil(text.length / 5)} words (approx.)</span>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setText("")}
          disabled={isProcessing || text.length === 0}
        >
          Clear
        </Button>
        <Button
          type="submit"
          className={cn(
            "bg-brand-600 hover:bg-brand-700",
            isProcessing && "opacity-70 cursor-not-allowed"
          )}
          disabled={isProcessing || text.length < 50}
        >
          {isProcessing ? (
            <>
              <span className="mr-2">Processing</span>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Summarize
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
