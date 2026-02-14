import { ICONS } from "../Icons/icons";

export const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "paid":
      return "bg-[#16A34A] text-white";
    case "processing":
      return "bg-[#EFB700] text-white";
    case "pending":
      return "bg-[#DC2626] text-white";
    default:
      return "bg-[#94A3B8] text-white";
  }
};
export const getStatusIcon = (status) => {
  switch (status.toLowerCase()) {
    case "paid":
      return <ICONS.CHECKCIRCLE className="w-4 h-4" />;
    case "processing":
      return <ICONS.CLOCK className="w-4 h-4" />;
    case "pending":
      return <ICONS.ALERTCIRCLE className="w-4 h-4" />;
    default:
      return <ICONS.CLOCK className="w-4 h-4" />;
  }
};
