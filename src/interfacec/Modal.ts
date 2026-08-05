import React from "react";

export interface ModelProps {
  isOpen: boolean;

  onClose: () => void;

  childern: React.ReactNode;
}
