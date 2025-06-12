// server.js (or your entry file)
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/mongobd.js';

// import products from './routes/product.js';
// import orders from './routes/order.js';
import authRoutes from './routes/auth.js';

dotenv.config({ path: './.env' });

// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Connect to DB
connectDB();

const app = express();

// ── CORS ───────────────────────────────────────────────────────────────
// Allow your Vite client (default port 5173) to talk to this API
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// ✅ API Routes
// app.use('/api/products', products);
// app.use('/api/orders', orders);
app.use('/api/auth', authRoutes);

// ✅ Health check
app.get('/', (req, res) => {
  res.send(`Server running on port ${process.env.PORT || 8000}`);
});

const PORT = process.env.PORT || 8000;
const NODE = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} in ${NODE} mode`);
});
