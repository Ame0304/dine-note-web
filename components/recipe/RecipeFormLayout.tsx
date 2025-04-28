import { Dialog, DialogPanel } from "@headlessui/react";
import Heading from "@/components/Heading";
import { ReactNode } from "react";
import { Lexend } from "next/font/google";

interface RecipeFormLayoutProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footerContent?: ReactNode;
  width?: string;
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
  width,
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
        <DialogPanel
          className={` ${
            width ? width : "w-full lg:w-1/2"
          }  bg-gradient-to-br from-[#FFF4E5] from-40% via-[#FCDAB8] via-70% to-[#bdecfc] to-100% rounded-2xl shadow-lg shadow-primary-900 p-6 lg:px-10 mx-auto border-4 border-accent-200 transform transition-all max-h-[90vh] overflow-y-auto scrollbar-hide`}
        >
          <div className="text-center">
            <Heading
              level="h3"
              styled="bg-accent-500"
              className="text-accent-200"
            >
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
