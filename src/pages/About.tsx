
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <Layout>
      <div className="container max-w-4xl py-12">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">
          About ConciseCapture
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            We're on a mission to make information processing more efficient and accessible for everyone.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">Our Mission</h2>
          <p>
            In today's information-rich world, we're constantly bombarded with content. 
            ConciseCapture was created to help you quickly extract the essence of long texts, 
            understand complex images, and capture key insights without spending hours consuming content.
          </p>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">How It Works</h2>
          <p>
            Our platform uses advanced AI algorithms to:
          </p>
          <ul className="space-y-2 my-4">
            <li>
              <strong>Analyze text:</strong> Identify key themes, important facts, and core messages
            </li>
            <li>
              <strong>Process images:</strong> Interpret visual content and explain it in clear language
            </li>
            <li>
              <strong>Highlight keywords:</strong> Surface the most important concepts in any content
            </li>
            <li>
              <strong>Format outputs:</strong> Present information in your preferred format for easy consumption
            </li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-10 mb-4">Future Development</h2>
          <p>
            We're constantly improving our platform with plans to add:
          </p>
          <ul className="space-y-2 my-4">
            <li>PDF processing capabilities</li>
            <li>Handwritten note recognition</li>
            <li>Collaboration features for teams</li>
            <li>Export options in various formats</li>
            <li>Topic categorization</li>
            <li>Save/history features</li>
          </ul>
          
          <div className="mt-12 bg-muted p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Ready to try it yourself?</h3>
            <p className="mb-6">
              Experience the power of intelligent content summarization and start saving time today.
            </p>
            <Button asChild className="bg-brand-600 hover:bg-brand-700">
              <Link to="/summary">
                Try ConciseCapture
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
