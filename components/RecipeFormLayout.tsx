import { Dialog, DialogPanel } from "@headlessui/react";
import Heading from "./Heading";
import { ReactNode } from "react";
import { Lexend } from "next/font/google";

interface RecipeFormLayoutProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footerContent?: ReactNode;
}

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
});

export default function RecipeFormLayout({
  isOpen,
  onClose,
  title,
  children,
  footerContent,
}: RecipeFormLayoutProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className={`relative z-50 ${lexend.className} `}
    >
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black/10 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center text-primary-100">
        <DialogPanel className="w-full md:w-1/2 bg-primary-950 rounded-2xl shadow-lg shadow-primary-900 p-6 mx-auto border-4 border-accent-200 transform transition-all max-h-[90vh] overflow-y-auto scrollbar-hide">
          <div className="text-center">
            <Heading level="h3" styled={true} className="text-accent-200">
              {title}
            </Heading>
          </div>

          {children}

          {footerContent && (
            <div className="flex justify-end pt-4">{footerContent}</div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
