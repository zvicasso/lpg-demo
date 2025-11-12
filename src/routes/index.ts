import express from "express";

import usersRoutes from "./users.routes";
import accountsRoutes from "./accounts.routes";
import ordersRoutes from "./orders.routes";
import cylindersRoutes from "./cylinders.routes";
import deliveriesRoutes from "./deliveries.routes";
import transactionsRoutes from "./transactions.routes";

const routes = express.Router();
routes.use("/users", usersRoutes);
routes.use("/accounts", accountsRoutes);
routes.use("/orders", ordersRoutes);
routes.use("/cylinders", cylindersRoutes);
routes.use("/deliveries", deliveriesRoutes);
routes.use("/transactions", transactionsRoutes);

export default routes;
