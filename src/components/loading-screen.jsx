import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoadingComplete, 100);
          return 100;
        }
        return prev + 10;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
          <Code2 className="w-6 h-6 text-background" />
        </div>
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden mx-auto">
          <motion.div
            className="h-full bg-accent rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-xs text-muted-foreground mt-2">{progress}%</div>
      </div>
    </div>
  );
}
