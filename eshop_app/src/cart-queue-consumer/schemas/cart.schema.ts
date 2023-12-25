import * as mongoose from 'mongoose';

export const cartSchema = new mongoose.Schema({
  item_id: String,
  cart_id: String,
  item_count: Number,
});
