import mongoose from "mongoose";
const Schema = mongoose.Schema;

// --- 2. Organization Model (HQ, Distributor, Plant/Warehouse) ---
// Represents the entities in the supply chain that manage stock and place orders.

const AccountSchema = new Schema(
  {
    _id: { type: String },
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["hq", "distributor", "retailer", "warehouse"],
      required: true,
    },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    managers: [{ type: String, ref: "User" }],
    stock: [{ type: String, ref: "Cylinder" }],
  },
  { timestamps: true }
);

// AccountSchema.set("toJSON", {
//   transform: (doc, ret) => {
//     ret.id = ret._id;
//     delete ret._id;
//     delete ret.__v;
//   },
// });

const Accounts = mongoose.model("Account", AccountSchema);
export default Accounts;
