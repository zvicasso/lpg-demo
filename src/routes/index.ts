import express from "express";

import usersRoutes from "./users.routes.js";
import accountsRoutes from "./accounts.routes.js";
import ordersRoutes from "./orders.routes.js";
import cylindersRoutes from "./cylinders.routes.js";
import deliveriesRoutes from "./deliveries.routes.js";
import transactionsRoutes from "./transactions.routes.js";

const routes = express.Router();
routes.use("/users", usersRoutes);
routes.use("/accounts", accountsRoutes);
routes.use("/orders", ordersRoutes);
routes.use("/cylinders", cylindersRoutes);
routes.use("/deliveries", deliveriesRoutes);
routes.use("/transactions", transactionsRoutes);

export default routes;
