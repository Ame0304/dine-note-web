// import { useState } from "react";
import { useUser } from "@/context/UserContext";
import useOrders from "@/hooks/orders/useOrders";

import Heading from "@/components/Heading";
import OrderList from "@/components/order/OrderList";
import Loading from "@/components/Loading";

export default function OrdersPage() {
  const { user } = useUser();
  const userId = user?.id;

  //   const [selectedOrder, setSelectedOrder] = useState(null);

  const { orders, isLoading } = useOrders(userId as string);

  if (isLoading) return <Loading />;

  return (
    <div className="px-4">
      <Heading level="h1" className="mb-4" styled="bg-accent-500">
        Orders
      </Heading>

      {!orders || orders.length === 0 ? (
        <div className="bg-accent-200/20 border-4 rounded-xl p-2 text-center border-dashed border-accent-200/50 cursor-pointer hover:text-primary-950">
          <span className="font-semibold ">🍽️ No orders yet</span>
        </div>
      ) : (
        <OrderList orders={orders} />
      )}
    </div>
  );
}
