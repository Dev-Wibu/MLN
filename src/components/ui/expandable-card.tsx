import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

interface ExpandableCardProps {
  title: string;
  icon?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  defaultExpanded?: boolean;
  children: React.ReactNode;
}

const ExpandableCard: React.FC<ExpandableCardProps> = ({ title, icon, className, headerClassName, defaultExpanded = false, children }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={cn("border-amber-200 overflow-hidden transition-all duration-300", className)}>
      <CardHeader
        onClick={toggleExpand}
        className={cn("bg-gradient-to-r from-amber-100 to-yellow-100 cursor-pointer flex flex-row items-center justify-between", headerClassName)}
      >
        <CardTitle className="flex items-center gap-2 text-amber-900">
          {icon}
          {title}
        </CardTitle>
        {expanded ? (
          <ChevronUp className="h-5 w-5 text-amber-700 transition-transform duration-300" />
        ) : (
          <ChevronDown className="h-5 w-5 text-amber-700 transition-transform duration-300" />
        )}
      </CardHeader>
      <div className={cn("transition-all duration-300 ease-in-out", expanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden")}>
        <CardContent className="p-6">{children}</CardContent>
      </div>
    </Card>
  );
};

export default ExpandableCard;
