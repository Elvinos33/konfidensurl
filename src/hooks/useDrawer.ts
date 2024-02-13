import { useCallback, useState } from "react";

export default function useDrawer(initialState: boolean) {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggleDrawer = useCallback(() => {
    setIsOpen((current) => !current);
  }, [setIsOpen]);

  return { isOpen, toggleDrawer };
}
