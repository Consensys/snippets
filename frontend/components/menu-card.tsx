import React from "react";
interface MenuCardProps {
  name: string;
  to?: string;
  description?: string;
  links?: {
    title: string;
    href: string;
  }[];
}

const MenuCard: React.FC<MenuCardProps> = ({
  name,
  to,
  description,
  links,
}) => {
  return (
    <div className=" overflow-hidden cursor-pointer gap-6 min-h-[118px] px-8 py-6 items-center md:max-w-md border border-gray-600 rounded-xl bg-gradient-to-b from-slate-900 to-transparent  hover:shadow-lg hover:scale-105 duration-150">
      <div>
        {/* <Image
          src={}
          onError={() => setError(true)}
          alt={key}
          width={100}
          height={100}
          className="rounded-lg"
        /> */}
      </div>
      <div className="space-y-3">
        <h5 className="text-gray-200 block text-sm leading-8 font-bold tracking-tight md:text-sm">
          {name}
        </h5>
        <p className="max-w-xs text-xs text-justify font-semibold text-opacity-70 text-gray-300">
          {description}
        </p>
      </div>
    </div>
  );
};

export default MenuCard;
