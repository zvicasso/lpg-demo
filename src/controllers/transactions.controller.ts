import { Request, Response } from "express";
import db from "../models/index.js";
const Transactions = db.transactions;

type Transaction = {
  id?: string;
  _id?: string;
  type: string;
  amount: number;
  related_order: string;
  from_account: string;
  to_account: string;
  recorded_by: string;
};

export default {
  create: (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send({ message: "Body required" });
    const transaction = new Transactions({ _id: req.body.id, ...req.body });
    transaction
      .save()
      .then((result) => res.json(result))
      .catch((err: Error) => res.status(500).send(err.message));
  },

  findById: (req: Request, res: Response) => {
    Transactions.findById(req.params.id)
      .populate("from_account")
      .populate("to_account")
      .populate("related_order")
      .populate("recorded_by")
      .exec()
      .then((result) => (result ? res.json(result) : res.status(404).send("Transaction not found")))
      .catch((err: Error) => res.status(500).send(err.message));
  },

  findMany: (req: Request, res: Response) => {
    const query: { [key: string]: unknown } = {};
    if (req.query.type) query["type"] = req.query.type;
    if (req.query.from_account) query["from_account"] = req.query.from_account;
    if (req.query.to_account) query["to_account"] = req.query.to_account;
    if (req.query.recorded_by) query["recorded_by"] = req.query.recorded_by;

    Transactions.find(query)
      .populate("related_order")
      .sort({ createdAt: -1 })
      .then((result) => res.json(result))
      .catch((err: Error) => res.status(500).send(err.message));
  },

  updateById: (req: Request, res: Response) => {
    Transactions.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .exec()
      .then((result) => res.json(result))
      .catch((err: Error) => res.status(500).send(err.message));
  },

  deleteById: (req: Request, res: Response) => {
    Transactions.findByIdAndDelete(req.params.id)
      .then((result) => res.json(result))
      .catch((err: Error) => res.status(500).send(err.message));
  },
};
