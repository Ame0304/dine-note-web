import { useState } from "react";
import { format } from "date-fns";
import Image from "next/image";

import { Order } from "@/lib/services/orderService";
import useUpdateOrder from "@/hooks/orders/useUpdateOrder";

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import {
  SunIcon,
  CalendarDateRangeIcon,
  TagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import AcceptOrderModal from "./AcceptOrderModal";

export default function OrderCard({
  order,
  userId,
}: {
  order: Order;
  userId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { updateOrder, isUpdating } = useUpdateOrder();
  const handleAccept = (selectedDate: string) => {
    // 1. Update the order status to "accepted"
    updateOrder({
      orderId: order.id,
      status: "accepted",
    });
    // 2. Add the recipe to the user's meal plan for the selected date
    const addToPlanData = {
      userId: userId,
      date: selectedDate,
      mealType: order.meal_type,
      recipeId: order.recipe.id,
    };
    console.log(addToPlanData);
    setIsOpen(false);
  };
  const handleDecline = () => {
    updateOrder({
      orderId: order.id,
      status: "declined",
    });
  };

  return (
    <div
      key={order.id}
      className="bg-white/70 rounded-2xl shadow-md shadow-primary-900 space-y-2"
    >
      <div className="bg-accent-200 text-primary-950 rounded-t-2xl px-4 py-1.5 flex items-center justify-between">
        <Heading level="h3">{order.recipe.title}</Heading>
        <span className="inline-flex items-center text-xs">
          <CalendarDateRangeIcon className="size-5 stroke-[2px]  mr-1" />{" "}
          {format(new Date(order.date), "PPP")}
        </span>
      </div>
      <div className="flex items-center justify-between px-4 pb-4">
        {/*Order Info*/}
        <div className="flex flex-col items-start justify-between w-2/3  gap-1 sm:gap-3">
          {/* Order Details */}
          <div className="mt-2 flex flex-col sm:flex-row items-center text-sm space-y-1 sm:space-x-3">
            <span className="inline-flex items-center border-2 border-accent-200 rounded-full px-2 py-0.5">
              <UserIcon className="size-4 stroke-[2px] mr-1" />
              {order.guest_name}
            </span>
            <div className="flex gap-3">
              <span className="inline-flex items-center text-accent-200">
                <SunIcon className="size-5 stroke-[2px] mr-1 " />
                {order.servings} serving{order.servings > 1 && "s"}
              </span>
              <span className="inline-flex items-center text-accent-200">
                <TagIcon className="size-5 stroke-[2px]  mr-1 " />
                {order.meal_type}
              </span>
            </div>
          </div>
          {/* Order Note */}
          {order.note && (
            <div className="relative w-full">
              <p className="text-sm italic bg-accent-200 px-3 py-2 mb-2 rounded-2xl text-primary-950 relative after:content-[''] after:absolute after:left-4 after:-bottom-2 after:w-0 after:h-0 after:border-l-[8px] after:border-l-transparent after:border-r-[8px] after:border-r-transparent after:border-t-[8px] after:border-t-accent-200">
                {order.note}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          {order.status === "pending" ? (
            <div className="flex gap-2">
              <Button
                size="small"
                onClick={() => setIsOpen(true)}
                disabled={isUpdating}
              >
                Accept
              </Button>
              <Button size="small" variant="outline" onClick={handleDecline}>
                Decline
              </Button>
            </div>
          ) : (
            <Button disabled size="small">
              ✅ Accepted
            </Button>
          )}
        </div>

        <Image
          src={order.recipe.imageUrl || "/default-recipe.png"}
          alt={order.recipe.title}
          width={80}
          height={80}
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover shadow-md shadow-primary-900"
        />
      </div>
      <AcceptOrderModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAccept={handleAccept}
        title={order.recipe.title}
        date={order.date}
      />
    </div>
  );
}
