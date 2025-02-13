"use client";
import { useState } from "react";
import Link from "next/link";

import Logo from "./Logo";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogPanel } from "@headlessui/react";
import Button from "./Button";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-primary-900 z-50 ">
      <nav
        aria-label="Global"
        className="flex justify-between items-center max-w-7xl mx-auto p-3"
      >
        <div className="xl:-ml-5">
          <Logo />
        </div>

        {/* Mobile Menu Icon */}

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="m-2.5 inline-flex items-center justify-center rounded-md p-2 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-5 items-center">
          <Link href="/" className="text-lg font-regular text-accent-500">
            Log in
          </Link>
          <Button>Get started </Button>
        </div>
      </nav>

      {/* Mobile Menu */}

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-primary-950 p-3 sm:max-w-sm shadow-lg">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-7" />
            </button>
          </div>

          <div className="mx-3 divide-y divide-gray-500/10">
            <div className="py-4">
              <Link
                href="/"
                className="text-lg text-accent-500  block rounded-lg px-3 py-2 hover:bg-accent-100"
              >
                Log in
              </Link>
            </div>
            <div className="py-4">
              <Button>Get started </Button>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
