import mongoose from "mongoose";
const { Schema } = mongoose;

//  User Model (Revised for LPG Roles) ---
// This model represents individuals who log into the system: HQ staff, Managers, and Engineers.
// It retains the user's custom _id and toJSON configuration.
const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    national_id: { type: String },
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["hq_admin", "distributor", "retailer", "delivery_engineer", "customer"],
      default: "customer",
      lowercase: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
      lowercase: true,
    },
    linked_account: { type: String, ref: "Account" }, // Distributor/Retailer or HQ Account
  },
  { timestamps: true }
);

// UserSchema.set("toJSON", {
//   transform: function (doc, ret) {
//     ret.id = ret._id;
//     delete ret._id;
//     delete ret.__v;
//   },
// });

const Users = mongoose.model("User", UserSchema);
export default Users;
