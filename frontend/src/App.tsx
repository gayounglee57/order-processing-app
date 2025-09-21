import { useEffect, useRef, useState } from "react";
import { Order } from "./types";
import { API_BASE, WS_URL } from "./constants";

export default function App() {
  const [orders, setOrders] = useState<Order[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/orders`)
      .then((result) => result.json())
      .then((data: Order[]) => setOrders(data));

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.addEventListener("message", (e) => {
      try {
        const { event, payload } = JSON.parse(e.data);
        if (event === "initialOrders") {
          setOrders(payload);
        } else if (event === "orderCreated") {
          setOrders((prev) => [...prev, payload]);
        } else if (event === "orderUpdated") {
          setOrders((prev) =>
            prev.map((order) => (order.id === payload.id ? payload : order))
          );
        }
      } catch (err) {
        console.error("ws parse", err);
      }
    });

    ws.addEventListener("open", () => console.log("ws open"));
    ws.addEventListener("close", () => console.log("ws closed"));

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="max-w-3xl mx-auto my-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">Order Processing App</h1>
      {/* <OrderForm /> */}
      <hr className="my-4 border-gray-200" />
      {/* <OrdersList orders={orders} /> */}
    </div>
  );
}
