import { Request, Response } from "express";
import db from "../models/index.js";
const Users = db.users;

export default {
  create: (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send("Empty body");
    const user = new Users({ ...req.body });
    user
      .save()
      .then((result) => res.json(result))
      .catch((err: Error) => res.status(500).send(err.message));
  },

  findById: (req: Request, res: Response) => {
    Users.findById(req.params.id)
      .populate("linked_account")
      .exec()
      .then((result) => (result ? res.json(result) : res.status(404).send("User not found")))
      .catch((err: Error) => res.status(500).send(err.message));
  },

  findMany: (req: Request, res: Response) => {
    const query: { [key: string]: unknown } = {};
    if (req.query.role) query["role"] = req.query.role;
    if (req.query.email) query["email"] = { $regex: req.query.email, $options: "i" };
    if (req.query.status) query["status"] = req.query.status;
    if (req.query.phone) query["phone"] = { $regex: req.query.phone, $options: "i" };

    Users.find(query)
      .populate("linked_account")
      .then((result) => res.json(result))
      .catch((err: Error) => res.status(500).send(err.message));
  },

  updateById: (req: Request, res: Response) => {
    Users.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .exec()
      .then((result) => res.json(result))
      .catch((err: Error) => res.status(500).send(err.message));
  },

  deleteById: (req: Request, res: Response) => {
    Users.findByIdAndDelete(req.params.id)
      .then((result) => res.json(result))
      .catch((err: Error) => res.status(500).send(err.message));
  },
};
