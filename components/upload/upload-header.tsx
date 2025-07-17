import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export default function UploadHeader() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      {/* Enhanced AI-Powered Badge */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-600 rounded-full blur-sm opacity-75 animate-pulse"></div>
        <Badge
          variant="secondary"
          className="relative px-6 py-3 text-sm font-semibold bg-white/95 backdrop-blur-sm border-2 border-rose-200 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        >
          <Sparkles className="h-4 w-4 mr-2 text-rose-600 animate-pulse" />
          <span className="text-rose-800 font-medium">AI-Powered Content Creation</span>
        </Badge>
      </div>

      {/* Enhanced Title */}
      <div className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
        Start Uploading{' '}
        <span className="relative inline-block">
          <span className="relative z-10 px-3 py-1 text-white">Your PDFs</span>
          <span 
            className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-600 -rotate-1 rounded-lg transform skew-y-1 shadow-lg" 
            aria-hidden="true"
          ></span>
        </span>
        {' '}into summaries
      </div>

      {/* Enhanced Description */}
      <div className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center">
        <p className="flex items-center justify-center gap-2">
          Upload your PDF and let our AI do the magic!
          <span className="text-xl animate-bounce">✨</span>
        </p>
      </div>
    </div>
  );
}