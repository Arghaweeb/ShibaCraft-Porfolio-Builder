// src/app/(private)/account/PortfolioActions.tsx
"use client";

import React from "react";
import { Copy, ExternalLink } from "lucide-react";

interface PortfolioActionsProps {
  portfolioUrl: string;
}

export default function PortfolioActions({ portfolioUrl }: PortfolioActionsProps) {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You can add a toast notification here if you have one
      alert('Portfolio URL copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Portfolio URL copied to clipboard!');
    }
  };

  const openPortfolio = () => {
    window.open(portfolioUrl, '_blank');
  };

  return (
    <div className="flex gap-2 flex-shrink-0">
      <button
        className="px-3 py-1 text-sm border border-green-300 text-green-700 rounded hover:bg-green-100 flex items-center gap-1 transition-colors"
        onClick={() => copyToClipboard(portfolioUrl)}
      >
        <Copy className="h-4 w-4" />
        Copy
      </button>
      <button
        className="px-3 py-1 text-sm border border-green-300 text-green-700 rounded hover:bg-green-100 flex items-center gap-1 transition-colors"
        onClick={openPortfolio}
      >
        <ExternalLink className="h-4 w-4" />
        View
      </button>
    </div>
  );
}