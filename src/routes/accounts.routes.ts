import express from "express";
import AccountsController from "../controllers/accounts.controller";

const router = express.Router();

// CREATE
router.post("/", AccountsController.create);
router.post("/bulk", AccountsController.createMany);

// READ
router.get("/", AccountsController.findMany);
router.get("/:id", AccountsController.findById);

// UPDATE
router.put("/:id", AccountsController.updateById);

// DELETE
router.delete("/:id", AccountsController.deleteById);
router.delete("/", AccountsController.deleteAll);

export default router;
