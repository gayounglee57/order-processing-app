import express from 'express';
import cors from 'cors';
import http from 'http';
import { WebSocketServer } from 'ws';
import { COMPLETED_DELAY_MS, Order, OrderStatus, PORT, PROCESSING_DELAY_MS, PRODUCTS } from './types';

// Express setup
const app = express();
app.use(cors());
app.use(express.json());

const orders = new Map<string, Order>();
const server = http.createServer(app);
let wss: WebSocketServer | null = null;

// Helper functions
function broadcast(event: string, payload: any) {
  if (!wss) return;
  const message = JSON.stringify({ event, payload });
  wss.clients.forEach((client) => {
    if (client.readyState === 1) client.send(message);
  });
}

function scheduleStatusTransition(orderId: string, status: OrderStatus, delayMs: number) {
  setTimeout(() => {
    const existing = orders.get(orderId);
    if (!existing) return;
    existing.status = status;
    orders.set(orderId, existing);
    broadcast('orderUpdated', existing);
  }, delayMs);
}

function getAllOrders() {
  return Array.from(orders.values()).sort((a, b) => a.createdAt - b.createdAt);
}

function createOrder(clientName: string, productId: number): Order {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) throw new Error('Invalid product ID');

  const id = crypto.randomUUID();
  const order: Order = {
    id,
    clientName,
    productId: product.id,
    productName: product.name,
    price: product.price,
    status: 'Pending',
    createdAt: Date.now(),
  };

  orders.set(id, order);
  broadcast('orderCreated', order);

  scheduleStatusTransition(id, 'Processing', PROCESSING_DELAY_MS);
  scheduleStatusTransition(id, 'Completed', PROCESSING_DELAY_MS + COMPLETED_DELAY_MS);

  return order;
}

// REST endpoints
app.get('/orders', (_req, res) => {
  res.json(getAllOrders());
});

app.post('/orders', (req, res) => {
  const { clientName, productId } = req.body as { clientName: string; productId: number };
  if (!clientName || !productId) return res.status(400).json({ message: 'client name and product id required' });

  const order = createOrder(clientName, productId);
  res.status(201).json(order);
});

// WebSocket connection handling
wss = new WebSocketServer({ server });

wss.on('connection', (socket) => {
  socket.send(JSON.stringify({ event: 'initialOrders', payload: getAllOrders() }));
  socket.on('message', () => {});
});

// Start server
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
