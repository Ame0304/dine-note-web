import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "@/components/Button";
import { Lexend } from "next/font/google";
import FormRow from "../FormRow";
import Input from "../Input";

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
});

interface AcceptOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: (orderId: string) => void;
  title: string;
  date: string;
}

export default function AcceptOrderModal({
  isOpen,
  onClose,
  onAccept,
  title,
  date,
}: AcceptOrderModalProps) {
  const [seletedDate, setseletedDate] = useState(date);
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className={`relative z-50 ${lexend.className}`}
    >
      <div
        className="fixed inset-0 bg-black/10 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center text-primary-100">
        <DialogPanel className="max-w-xl space-y-5 px-10 py-8 bg-primary-950 rounded-2xl shadow-lg shadow-primary-900 transform transition-all">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🍱</span>
            <DialogTitle className="font-semibold text-2xl">
              Add {title} to Meal Plan
            </DialogTitle>
          </div>

          <FormRow label="Select a date for plan">
            <Input
              type="date"
              id="date"
              defaultValue={seletedDate}
              onChange={(e) => setseletedDate(e.target.value)}
            />
          </FormRow>

          <div className="pt-2 flex gap-4 justify-end">
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button onClick={() => onAccept(seletedDate)}>Accept & Add</Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
