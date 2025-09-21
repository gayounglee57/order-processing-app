import React, { useState } from "react";
import { API_BASE, PRODUCTS } from "../constants";
import { postJSON } from "../utils";

export default function OrderForm() {
  const [clientName, setClientName] = useState("");
  const [productId, setProductId] = useState<number>(PRODUCTS[0].id);
  const [loading, setLoading] = useState(false);

  async function submit(event?: React.FormEvent) {
    event?.preventDefault();
    setLoading(true);

    if (!clientName.trim()) {
      alert("Please enter name");
      setLoading(false);
      return;
    }

    try {
      await postJSON(`${API_BASE}/orders`, { clientName, productId });

      // Reset form fields
      setClientName("");
      setProductId(PRODUCTS[0].id);
    } catch (err) {
      console.error(err);
      alert("Could not create order");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex gap-3 items-center">
      <input
        placeholder="Customer name"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <select
        value={productId}
        onChange={(e) => setProductId(Number(e.target.value))}
        className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {PRODUCTS.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name} - ${product.price}
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 rounded text-white font-semibold ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Submitting..." : "Submit Order"}
      </button>
    </form>
  );
}
