// Importing modules
import mongoose from "mongoose";
mongoose.Promise = global.Promise;

import dotenv from "dotenv";
dotenv.config();

const MONGO_URI: string = process.env.MONGO_URI || "";

// Importing models
import Users from "./users.models";
import Accounts from "./accounts.models";
import Cylinders from "./cylinders.models";
import Orders from "./orders.models";
import Deliveries from "./deliveries.models";
import Transactions from "./transactions.models";

// Defining the Database interface
interface Database {
  mongoose: typeof mongoose;
  url: string;
  users: typeof Users;
  accounts: typeof Accounts;
  cylinders: typeof Cylinders;
  orders: typeof Orders;
  deliveries: typeof Deliveries;
  transactions: typeof Transactions;
}

// Build the database object
const db: Database = {
  mongoose: mongoose,
  url: MONGO_URI,
  users: Users,
  accounts: Accounts,
  cylinders: Cylinders,
  orders: Orders,
  deliveries: Deliveries,
  transactions: Transactions,
};

export default db;
