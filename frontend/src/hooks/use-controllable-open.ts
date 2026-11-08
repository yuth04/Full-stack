import { useState } from "react";

type Options = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

/**
 * Works as controlled (parent passes `open`) or uncontrolled (internal state).
 */
export function useControllableOpen({ open, onOpenChange }: Options) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = open !== undefined;

  return {
    isControlled,
    open: isControlled ? open : internalOpen,
    setOpen: isControlled ? (onOpenChange ?? (() => {})) : setInternalOpen,
  };
}