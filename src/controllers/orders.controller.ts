import { Request, Response } from "express";
import db from "../models/index";
const Orders = db.orders;

type Order = {
  id?: string;
  _id?: string;
  order_type: string;
  from_account: string;
  to_account: string;
  cylinders: string[];
  status: string;
  created_by: string;
  approved_by: string;
  delivery_date: Date;
};

export default {
  /*****************************
   * CREATE OPERATIONS
   *****************************/

  create: (req: Request, res: Response) => {
    if (!req.body)
      return res.status(400).send({ message: "Content cannot be empty!" });

    const order = new Orders({
      ...req.body,
    });

    order
      .save()
      .then((result) => res.json(result))
      .catch((err: Error) =>
        res
          .status(500)
          .send(err.message || "Error occurred while creating Order.")
      );
  },

  createMany: (req: Request, res: Response) => {
    const orders = req.body.map((order: Order) => ({ ...order }));
    if (!orders) return res.status(400).send("Content cannot be empty");

    Orders.insertMany(orders, { ordered: true })
      .then((result) => res.json(result))
      .catch((err: Error) => res.status(400).send(err.message));
  },

  /*****************************
   * READ OPERATIONS
   *****************************/

  findById: (req: Request, res: Response) => {
    const id = req.params.id;
    Orders.findById(id)
      .populate("from_account")
      .populate("to_account")
      .populate("cylinders")
      .populate("created_by")
      .populate("approved_by")
      .exec()
      .then((result) =>
        result ? res.json(result) : res.status(404).send("Order not found")
      )
      .catch((err: Error) => res.status(500).send(err.message));
  },

  findMany: (req: Request, res: Response) => {
    const query: { [key: string]: unknown } = {};
    if (req.query.order_type) query["order_type"] = req.query.order_type;
    if (req.query.status) query["status"] = req.query.status;
    if (req.query.from_account) query["from_account"] = req.query.from_account;
    if (req.query.to_account) query["to_account"] = req.query.to_account;

    Orders.find(query)
      .populate("from_account")
      .populate("to_account")
      .populate("cylinders")
      .then((result) => res.json(result))
      .catch((err: Error) => res.status(500).send(err.message));
  },

  findAll: (_req: Request, res: Response) => {
    Orders.find()
      .populate("from_account")
      .populate("to_account")
      .then((result) => res.json(result))
      .catch((err: Error) => res.status(500).send(err.message));
  },

  /*****************************
   * UPDATE OPERATIONS
   *****************************/

  updateById: (req: Request, res: Response) => {
    const id = req.params.id;
    if (!req.body)
      return res.status(400).send({ message: "Data cannot be empty!" });

    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    Orders.findByIdAndUpdate(id, req.body, options)
      .exec()
      .then((result) =>
        result ? res.json(result) : res.status(404).send("Not found")
      )
      .catch((err: Error) => res.status(500).send(err.message));
  },

  /*****************************
   * DELETE OPERATIONS
   *****************************/

  deleteById: (req: Request, res: Response) => {
    const id = req.params.id;
    Orders.findByIdAndDelete(id)
      .then((result) =>
        result ? res.json(result) : res.status(404).send("Not found")
      )
      .catch((err: Error) => res.status(500).send(err.message));
  },

  deleteAll: (_req: Request, res: Response) => {
    Orders.deleteMany({})
      .then((result) => res.json(result))
      .catch((err: Error) => res.status(500).send(err.message));
  },
};
