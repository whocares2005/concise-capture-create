
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <span className="bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent font-bold text-xl">
            ConciseCapture
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-brand-600 transition-colors">
            Home
          </Link>
          <Link to="/summary" className="text-sm font-medium hover:text-brand-600 transition-colors">
            New Summary
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-brand-600 transition-colors">
            About
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          <Button className="bg-brand-600 hover:bg-brand-700">Get Started</Button>
        </div>
      </div>
    </header>
  );
}
