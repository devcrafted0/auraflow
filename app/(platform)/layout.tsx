import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import { Toaster } from "sonner";

const PlatformLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ClerkProvider>
      <Toaster
        toastOptions={{ style: { zIndex: 9999 } }}
        expand
        visibleToasts={4}
        position="bottom-right"
      />
      {children}
    </ClerkProvider>
  );
};

export default PlatformLayout;
