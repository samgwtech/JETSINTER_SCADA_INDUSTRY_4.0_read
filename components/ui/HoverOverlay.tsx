"use client";

import React from "react";

interface HoverOverlayProps {
  content: string;
  visible: boolean;
}

const HoverOverlay: React.FC<HoverOverlayProps> = ({ content, visible }) => {
  if (!visible) return null;
  return (
    <div className="fixed bottom-4 right-40 z-50 px-4 py-3 bg-card border border-border text-foreground text-sm rounded-lg shadow-xl backdrop-blur-sm">
      {content}
    </div>
  );
};

export default HoverOverlay;
