
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { FileText, Image, ArrowRight, Zap, ListOrdered, Key } from "lucide-react";

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 px-4 md:py-32">
        <div className="container max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent animate-fade-up">
            Transform Content Into Concise Insights
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Use AI to summarize long texts, analyze images, and extract key points, all in one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <Button asChild size="lg" className="bg-brand-600 hover:bg-brand-700">
              <Link to="/summary">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border card-hover animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <div className="h-12 w-12 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Text Summarization</h3>
              <p className="text-muted-foreground">
                Convert lengthy documents into concise summaries that capture the essential information.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border card-hover animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="h-12 w-12 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center mb-4">
                <ListOrdered className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple Formats</h3>
              <p className="text-muted-foreground">
                Choose from different output formats including concise gists, bullet points, or visual representations.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border card-hover animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Image className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Image Analysis</h3>
              <p className="text-muted-foreground">
                Upload images including screenshots or handwritten notes for AI-powered interpretation and explanation.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border card-hover animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <div className="h-12 w-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mb-4">
                <Key className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Keyword Highlighting</h3>
              <p className="text-muted-foreground">
                Automatically identify and highlight important keywords and concepts in summaries.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border card-hover animate-fade-up" style={{ animationDelay: "0.5s" }}>
              <div className="h-12 w-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
              <p className="text-muted-foreground">
                Get results quickly with our optimized AI processing, perfect for time-sensitive tasks.
              </p>
            </div>

            {/* Feature 6 - Coming Soon */}
            <div className="bg-white p-6 rounded-lg shadow-sm border card-hover animate-fade-up" style={{ animationDelay: "0.6s" }}>
              <div className="relative h-12 w-12 bg-gray-100 text-gray-500 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-brand-600 text-white text-xs px-2 py-0.5 rounded-full">Soon</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Export & Share</h3>
              <p className="text-muted-foreground">
                Coming soon: Export summaries in various formats and easily share with team members.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-brand-700 to-brand-900 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to streamline your content?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Start transforming your lengthy content into concise, digestible summaries today.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/summary">
              Try It Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
