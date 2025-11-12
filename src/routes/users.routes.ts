import express from "express";
import UsersController from "../controllers/users.controller";

const router = express.Router();

// CREATE
router.post("/", UsersController.create);
router.post("/bulk", UsersController.create);

// READ
router.get("/", UsersController.findMany);
router.get("/:id", UsersController.findById);

// UPDATE
router.put("/:id", UsersController.updateById);

// DELETE
router.delete("/:id", UsersController.deleteById);

export default router;
