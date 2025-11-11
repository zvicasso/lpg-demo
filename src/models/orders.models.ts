import mongoose from 'mongoose';
const Schema = mongoose.Schema;


// Stock Order Model (B2B Orders/Refills) ---
// Tracks orders between Distributor <-> HQ, and HQ <-> Plant/Warehouse.

const OrderSchema = new Schema(
  {
    _id: { type: String },
    order_type: {
      type: String,
      enum: ["restock", "refill", "b2b", "b2c"],
      required: true,
    },
    from_account: { type: String, ref: "Account", required: true },
    to_account: { type: String, ref: "Account", required: true },
    cylinders: [{ type: String, ref: "Cylinder" }],
    status: {
      type: String,
      enum: ["pending", "approved", "fulfilled", "rejected", "cancelled"],
      default: "pending",
    },
    created_by: { type: String, ref: "User" },
    approved_by: { type: String, ref: "User" },
    delivery_date: { type: Date },
  },
  { timestamps: true }
);

const Orders = mongoose.model("Order", OrderSchema);
export default Orders;
