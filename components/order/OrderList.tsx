import Heading from "@/components/Heading";
import OrderCard from "@/components/order/OrderCard";
import { Order } from "@/lib/services/orderService";

export default function OrderList({ orders }: { orders: Order[] }) {
  const pendingOrders = orders.filter((order) => order.status === "pending");
  const acceptedOrders = orders.filter((order) => order.status === "accepted");
  const declinedOrders = orders.filter((order) => order.status === "declined");

  return (
    <div className="space-y-3">
      <Heading level="h3" styled="bg-accent-500">
        Pending
      </Heading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {pendingOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
      <Heading level="h3" styled="bg-accent-300">
        Accepted
      </Heading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {acceptedOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
      <Heading level="h3" styled="bg-accent-400">
        Declined
      </Heading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {declinedOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
