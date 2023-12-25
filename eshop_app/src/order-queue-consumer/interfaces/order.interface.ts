export interface Order extends Document {
  transaction_id: String,
  cart_id: String,
  items_count: Number,
  address: String,
  order_date: Date,
}