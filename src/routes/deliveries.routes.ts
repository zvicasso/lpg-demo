import express from "express";
import DeliveriesController from "../controllers/deliveries.controller";

const router = express.Router();

// CREATE
router.post("/", DeliveriesController.create);

// READ
router.get("/", DeliveriesController.findByEngineer); // Optional: use query param for filtering
router.get("/:id", DeliveriesController.findById);
router.get("/engineer/:engineer", DeliveriesController.findByEngineer);
router.get("/customer/:customer", DeliveriesController.findByCustomer);

// UPDATE
router.put("/:id", DeliveriesController.updateById);

// DELETE
router.delete("/:id", DeliveriesController.deleteById);

export default router;
