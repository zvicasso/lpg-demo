import mongoose from 'mongoose';
const Schema = mongoose.Schema;


// Cylinder Model (The Core Asset) ---
// Tracks the lifecycle and current status of every single gas cylinder.
const CylinderSchema = new Schema(
  {
    _id: { type: String },
    serialNumber: { type: String, unique: true, required: true },
    current_owner: { type: String, ref: "Account" },
    status: {
      type: String,
      enum: ["full", "empty", "in_transit", "recycled", "scrapped"],
      default: "full",
    },
    last_service_date: { type: Date },
    last_refill_date: { type: Date },
    history: [
      {
        event: {
          type: String,
          enum: ["refilled", "sold", "delivered", "returned", "recycled"],
        },
        actor: { type: String, ref: "User" },
        date: { type: Date, default: Date.now },
        notes: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Cylinders = mongoose.model("Cylinder", CylinderSchema);
export default Cylinders;

