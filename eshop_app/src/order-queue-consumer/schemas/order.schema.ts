import * as mongoose from 'mongoose';

export const orderSchema = new mongoose.Schema({
  transaction_id: String,
  cart_id: String,
  items_count: Number,
  address: String,
  order_date: Date,
});
