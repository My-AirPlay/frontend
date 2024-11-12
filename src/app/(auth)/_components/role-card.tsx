import { ArrowRight } from "lucide-react";
import React from "react";
interface RoleCardProps {
  title: string;
  description: string;
  onClick?: () => void;
}
const RoleCard = ({ description, title, onClick }: RoleCardProps) => {
  return (
    <div className="px-6 py-4 rounded-lg border bg-custom-background border-custom-primary flex items-center justify-between">
      <div>
        <h2 className="font-medium text-white text-base">{title}</h2>
        <p className="text-white font-normal text-sm">{description}</p>
      </div>
      <button className="text-lg text-custom-primary" onClick={onClick}>
        <ArrowRight />
      </button>
    </div>
  );
};

export default RoleCard;
