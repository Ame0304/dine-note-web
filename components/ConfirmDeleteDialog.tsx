import React from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import Button from "./Button";

interface ConfirmDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  itemName: string;
  isDeleting: boolean;
}

export default function ConfirmDeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  itemName,
  isDeleting,
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/10 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center text-primary-100">
        <DialogPanel className="max-w-lg space-y-5 border bg-white px-10 py-8 rounded-xl shadow-xl shadow-accent-400 transform transition-all">
          <div className="flex items-center gap-4">
            <div className="bg-accent-400/30 rounded-full p-2">
              <TrashIcon className="size-6 stroke-accent-400" />
            </div>
            <DialogTitle className="font-semibold text-2xl text-accent-400">
              Delete {title}
            </DialogTitle>
          </div>
          <Description className="text-primary-50 text-lg">
            Are you sure you want to delete{" "}
            <span className="font-medium text-accent-500">{itemName}</span> ?
          </Description>
          <div className="pt-2 flex gap-4 justify-end">
            <Button onClick={onClose} variant="secondary">
              Cancel
            </Button>
            <Button onClick={onConfirm} disabled={isDeleting}>
              Delete
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
