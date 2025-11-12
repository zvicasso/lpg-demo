import express from "express";
import CylindersController from "../controllers/cylinders.controller";

const router = express.Router();

// CREATE
router.post("/", CylindersController.create);
router.post("/bulk", CylindersController.createMany);

// READ
router.get("/", CylindersController.findMany);
router.get("/:id", CylindersController.findById);

// UPDATE
router.put("/:id", CylindersController.updateById);
router.put("/:id/recycle", CylindersController.markRecycled);

// DELETE
router.delete("/:id", CylindersController.deleteById);

export default router;
