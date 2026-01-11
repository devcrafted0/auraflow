"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

const MobileSidebar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMouted] = useState(false);

  const { isOpen, onClose, onOpen } = useMobileSidebar();

  useEffect(() => {
    setIsMouted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button
        onClick={onOpen}
        className="block md:hidden mr-2"
        variant="ghost"
        size="sm"
      >
        <Menu className="w-4 h-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-2 pt-10">
          <Sidebar storageKey="to-sidebar-mobile-state" />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSidebar;
