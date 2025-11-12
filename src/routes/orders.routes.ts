import express from "express";
import OrdersController from "../controllers/orders.controller.js";

const router = express.Router();

// CREATE
router.post("/", OrdersController.create);
router.post("/bulk", OrdersController.createMany);

// READ
router.get("/", OrdersController.findMany);
router.get("/:id", OrdersController.findById);

// UPDATE
router.put("/:id", OrdersController.updateById);

// DELETE
router.delete("/:id", OrdersController.deleteById);
router.delete("/", OrdersController.deleteAll);

export default router;
