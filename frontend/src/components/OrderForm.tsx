import React, { useState } from 'react';
import { Order } from '../types';
import { API_BASE, PRODUCTS } from '../constants';

export default function OrderForm() {
  const [clientName, setClientName] = useState('');
  const [productId, setProductId] = useState<number>(PRODUCTS[0].id);
  const [loading, setLoading] = useState(false);

  return (
    <form className="flex gap-3 items-center">
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
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {loading ? 'Submitting...' : 'Submit Order'}
      </button>
    </form>
  );
}
