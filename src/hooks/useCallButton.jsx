import React from "react";
import { Button } from "@/components/ui/Button";

export const CallButton = ({ phoneNumber }) => {
  // A function to handle the call action
  const handleCall = () => {
    // Construct the tel URL. Use the international format for best results.
    window.location.href = `tel:${phoneNumber}`;
  };

  return <Button onClick={handleCall}>{"Call Now"}</Button>;
};
