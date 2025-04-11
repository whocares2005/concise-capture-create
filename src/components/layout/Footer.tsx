
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-10">
      <div className="container flex flex-col gap-4 md:flex-row md:justify-between">
        <div className="flex flex-col gap-2">
          <Link to="/" className="font-semibold text-lg">
            <span className="bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">
              ConciseCapture
            </span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs">
            Transform lengthy content into concise summaries with our AI-powered platform.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Product</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/summary" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Text Summary
              </Link>
              <Link to="/summary" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Image Analysis
              </Link>
            </nav>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Company</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </nav>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Legal</h3>
            <nav className="flex flex-col gap-2">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
            </nav>
          </div>
        </div>
      </div>
      
      <div className="container mt-6 border-t pt-6">
        <p className="text-sm text-center text-muted-foreground">
          © {new Date().getFullYear()} ConciseCapture. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
