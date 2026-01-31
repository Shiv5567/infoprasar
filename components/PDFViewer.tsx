
import React, { useEffect, useRef } from 'react';

interface PDFViewerProps {
  url: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ url }) => {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Basic right-click prevention on the viewer
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const element = viewerRef.current;
    if (element) {
      element.addEventListener('contextmenu', handleContextMenu);
    }

    return () => {
      if (element) {
        element.removeEventListener('contextmenu', handleContextMenu);
      }
    };
  }, []);

  // Using Google Docs viewer for a cleaner embed that works across devices
  // Adding #toolbar=0&navpanes=0&scrollbar=0 to common viewer params
  const embedUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;

  return (
    <div className="w-full h-[600px] md:h-[800px] bg-gray-200 rounded-lg overflow-hidden shadow-inner relative no-select" ref={viewerRef}>
      {/* Overlay to catch clicks if needed, or simply styling */}
      <div className="absolute inset-0 z-10 pointer-events-none border-4 border-white/10"></div>
      
      <iframe
        src={embedUrl}
        className="w-full h-full border-none"
        title="PDF Content"
        onContextMenu={(e) => e.preventDefault()}
      >
        Your browser does not support iframes. 
      </iframe>

      <div className="p-4 bg-yellow-50 text-yellow-800 text-sm italic border-t border-yellow-200">
        Note: Download and printing are restricted for security reasons.
      </div>
    </div>
  );
};

export default PDFViewer;
