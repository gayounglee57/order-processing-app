import { Order } from "../types";

function StatusBadge({ status }: { status: Order["status"] }) {
  let bgColor = "";
  if (status === "Pending") bgColor = "bg-orange-100";
  if (status === "Processing") bgColor = "bg-blue-100";
  if (status === "Completed") bgColor = "bg-green-100";

  return (
    <span
      className={`inline-block min-w-[88px] text-center font-semibold px-2 py-1 rounded ${bgColor}`}
    >
      {status}
    </span>
  );
}

export default function OrdersList({ orders }: { orders: Order[] }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Orders</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-b border-gray-200">
            <th className="p-2.5">ID</th>
            <th className="p-2.5">Customer Name</th>
            <th className="p-2.5">Product</th>
            <th className="p-2.5">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-gray-100">
              <td className="p-2.5 text-sm">{order.id.slice(0, 8)}</td>
              <td className="p-2.5">{order.clientName}</td>
              <td className="p-2.5">{order.productName}</td>
              <td className="p-2.5">
                <StatusBadge status={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
