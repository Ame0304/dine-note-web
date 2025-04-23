// import { useState } from "react";
import { format } from "date-fns";
import Image from "next/image";

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import {
  CakeIcon,
  CalendarDateRangeIcon,
  TagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export default function OrdersPage() {
  const orders = [
    {
      id: "1",
      name: "Eric",
      servings: 2,
      date: "2025-04-23",
      mealType: "dinner",
      note: "Can't wait to try this!",
      status: "pending",
      recipe: {
        id: "101",
        title: "Spicy Mapo Tofu",
        image: "https://source.unsplash.com/80x80/?tofu,food",
      },
    },
    {
      id: "2",
      name: "Amy",
      servings: 1,
      date: "2025-04-24",
      mealType: "lunch",
      note: "Looks yummy 💕",
      status: "accepted",
      recipe: {
        id: "102",
        title: "Sushi Rolls",
        image: "https://source.unsplash.com/80x80/?sushi",
      },
    },
  ];

  //   const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="px-4">
      <Heading level="h1" className="mb-4" styled="bg-accent-500">
        Orders
      </Heading>

      {orders.length === 0 ? (
        <p className="text-muted-foreground">No orders yet 🍽️</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white/70 p-4 rounded-2xl shadow-md shadow-primary-900 space-y-2 flex justify-between items-center"
            >
              <div className="flex flex-col items-start justify-between w-2/3 gap-3">
                <div className="space-y-1 mb-1">
                  <Heading level="h3">{order.recipe.title}</Heading>

                  <div className="flex flex-wrap gap-x-5 gap-y-1 items-center text-sm">
                    <span className="inline-flex items-center text-accent-500">
                      <UserIcon className="size-5 stroke-[2px] mr-1" />
                      {order.name}
                    </span>

                    <span className="inline-flex items-center text-accent-400">
                      <CakeIcon className="size-5  stroke-[2px] mr-1" />
                      {order.servings} serving{order.servings > 1 && "s"}
                    </span>
                    <span className="inline-flex items-center text-accent-300">
                      <TagIcon className="size-5 stroke-[2px]  mr-1" />
                      {order.mealType}
                    </span>

                    <span className="inline-flex items-center text-accent-200">
                      <CalendarDateRangeIcon className="size-5 stroke-[2px]  mr-1" />{" "}
                      {format(new Date(order.date), "PPP")}
                    </span>
                  </div>

                  {order.note && (
                    <div className="relative mt-1">
                      <p className="text-sm italic bg-accent-200 px-3 py-2 rounded-2xl text-primary-950 relative after:content-[''] after:absolute after:left-4 after:-bottom-2 after:w-0 after:h-0 after:border-l-[8px] after:border-l-transparent after:border-r-[8px] after:border-r-transparent after:border-t-[8px] after:border-t-accent-200">
                        {order.note}
                      </p>
                    </div>
                  )}
                </div>
                {order.status === "pending" ? (
                  <div className="flex gap-2">
                    <Button size="small">✅ Accept</Button>
                    <Button size="small" variant="outline">
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
                src="/default-recipe.png"
                alt={order.recipe.title}
                width={40}
                height={40}
                className="w-32 h-32 rounded-xl object-cover shadow-md shadow-primary-900"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
