export const getStatusColor = (status) => {
  switch (status) {
    case "Active":
      return "bg-[#16A34A] text-white";
    case "Inactive":
      return "bg-[#94A3B8] text-white";
    case "on-leave":
      return "bg-[#EFB700] text-white";
    default:
      return "bg-[#94A3B8] text-white";
  }
};
