import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  name: string;
  to?: string;
  description?: string;
  image?: string;
  links?: {
    title: string;
    href: string;
  }[]
}

const Card: React.FC<CardProps> = ({ name, to, description, image, links }) => {
  return (
    <Link
      className=" overflow-hidden flex  gap-6 min-h-[118px] px-8 py-6 items-center md:max-w-md border border-gray-600 rounded-xl bg-gradient-to-b from-slate-900 to-transparent  hover:shadow-lg hover:scale-105 duration-150"
    href={to || ""}
    >
      <div>
        {
          image && (

            <Image
              src={image}
              alt={name}
              width={100}
              height={100}
              className="rounded-lg"
            />
          )
        }
      </div>
      <div className="space-y-3">
        <h3 className="text-gray-200 block text-md leading-8 font-bold tracking-tight md:text-xl">{name}</h3>
        <p className="max-w-xs text-sm text-justify font-semibold text-opacity-70 text-gray-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default Card;
