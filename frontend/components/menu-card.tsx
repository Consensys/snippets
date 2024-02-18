import { cn } from "@/lib/utils";
import React from "react";
interface MenuCardProps {
  name: string;
  description?: string;
  isSelected?: boolean;
}

const MenuCard: React.FC<MenuCardProps> = ({ name, description, isSelected }) => {
  return (
    <div className={cn("overflow-hidden cursor-pointer gap-6 min-h-[118px] p-0 md:px-8 md:py-6 items-center md:max-w-md border border-gray-600 rounded-xl bg-gradient-to-b from-slate-900 to-transparent  hover:shadow-lg hover:scale-105 duration-150", isSelected && "border-slate-200")} >
      <div className="space-y-3">
        <h5 className="text-gray-200 text-center block text-sm leading-8 font-bold tracking-tight md:text-sm">
          {name}
        </h5>
        <p className="max-w-xs hidden md:block text-xs text-justify font-semibold text-opacity-70 text-gray-300">
          {description}
        </p>
      </div>
    </div>
  );
};

export default MenuCard;
