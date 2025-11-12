import express from "express";
import TransactionsController from "../controllers/transactions.controller";

const router = express.Router();

// CREATE
router.post("/", TransactionsController.create);

// READ
router.get("/", TransactionsController.findMany);
router.get("/:id", TransactionsController.findById);

// UPDATE
router.put("/:id", TransactionsController.updateById);

// DELETE
router.delete("/:id", TransactionsController.deleteById);

export default router;
