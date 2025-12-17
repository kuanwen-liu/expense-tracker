import { cn } from "@/lib/utils";

interface MaterialIconProps {
  icon: string;
  className?: string;
  filled?: boolean;
}

export function MaterialIcon({ icon, className, filled = false }: MaterialIconProps) {
  return (
    <span
      className={cn("material-symbols-outlined", className)}
      style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
    >
      {icon}
    </span>
  );
}
