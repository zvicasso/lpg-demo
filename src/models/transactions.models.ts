import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Sale Transaction Model (B2C Sales and Swaps) ---
// Records transactions between a Distributor/Retailer and a Customer.

const TransactionSchema = new Schema(
  {
    type: { type: String, enum: ["sale", "purchase", "recycle"], required: true },
    amount: { type: Number },
    related_order: { type: String, ref: "Order" },
    from_account: { type: String, ref: "Account" },
    to_account: { type: String, ref: "Account" },
    recorded_by: { type: String, ref: "User" },
  },
  { timestamps: true }
);

const Transactions = mongoose.model("Transaction", TransactionSchema);
export default Transactions;
