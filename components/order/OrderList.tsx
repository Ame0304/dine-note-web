import Heading from "@/components/Heading";
import OrderCard from "@/components/order/OrderCard";
import { Order } from "@/lib/services/orderService";

type OrderCategory = {
  title: string;
  styleClass: string;
  orders: Order[];
};

export default function OrderList({
  orders,
  userId,
}: {
  orders: Order[];
  userId: string;
}) {
  const orderCategories: OrderCategory[] = [
    {
      title: "Pending",
      styleClass: "bg-accent-500",
      orders: orders.filter((order) => order.status === "pending"),
    },
    {
      title: "Accepted",
      styleClass: "bg-accent-300",
      orders: orders.filter((order) => order.status === "accepted"),
    },
    {
      title: "Declined",
      styleClass: "bg-accent-400",
      orders: orders.filter((order) => order.status === "declined"),
    },
  ];

  return (
    <div className="space-y-6">
      {orderCategories.map((category) => (
        <div key={category.title}>
          <Heading level="h4" styled={category.styleClass}>
            {category.title}
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {category.orders.length > 0 ? (
              category.orders.map((order) => (
                <OrderCard key={order.id} order={order} userId={userId} />
              ))
            ) : (
              <div className="bg-accent-200/10 border border-accent-200/20 rounded-lg p-4 text-center col-span-full">
                <p className="text-sm text-gray-500">
                  No {category.title.toLowerCase()} orders
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
