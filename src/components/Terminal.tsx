import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TerminalProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const Terminal = ({
  children,
  className,
  title = "TERMINAL",
}: TerminalProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={cn("terminal-window terminal-glow", className)}>
      <div className="flex justify-between items-center border-b border-terminal-green-dim mb-2 pb-1">
        <div className="text-xs text-terminal-green-dim">{title}</div>
        <div className="text-xs text-terminal-green-dim">
          {time.toLocaleDateString()} - {time.toLocaleDateString()}
        </div>
      </div>
      <div className="relative">
        <div className="scan-line animate-scan-line"></div>
        {children}
      </div>
    </div>
  );
};

export default Terminal;
