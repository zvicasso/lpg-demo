import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//Used by Delivery/Maintenance Engineers to record deliveries and servicing activities.

const DeliverySchema = new Schema(
  {
    engineer: { type: String, ref: "User", required: true },
    customer: { type: String, ref: "User", required: true },
    cylinder: { type: String, ref: "Cylinder", required: true },
    type: {
      type: String,
      enum: ["delivery", "maintenance"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    notes: { type: String },
    delivery_date: { type: Date },
  },
  { timestamps: true }
);

const Deliveries = mongoose.model("Delivery", DeliverySchema);
export default Deliveries;
