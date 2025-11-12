import { Request, Response } from "express";
import db from "../models/index";
const Accounts = db.accounts;

type Account = {
   id?: string;
  _id?: string;
  name: string;
  type: string;
  address: string;
  phone: string;
  email: string;
  managers: string[];
  stock: string[];
};

export default {
  /*****************************
   * CREATE OPERATIONS
   *****************************/

  create: (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send({ message: "Content cannot be empty!" });

    const { name, type, address, phone, email, managers, stock } = req.body;

    const account = new Accounts({

      name,
      type,
      address,
      phone,
      email,
      managers,
      stock,
    });

    account
      .save()
      .then((result) => res.json(result))
      .catch((err: Error) => res.status(500).send(err.message || "Error creating Account."));
  },

  createMany: (req: Request, res: Response) => {
    const accounts = req.body.map((a: Account) => ({ ...a}));
    if (!accounts) return res.status(400).send("Content cannot be empty");
    Accounts.insertMany(accounts, { ordered: true })
      .then((result) => res.json(result))
      .catch((err: Error) => res.status(400).send(err.message));
  },

  /*****************************
   * READ OPERATIONS
   *****************************/

  findById: (req: Request, res: Response) => {
    const id = req.params.id;
    Accounts.findById(id)
      .populate("managers")
      .populate("stock")
      .exec()
      .then((result) => {
        if (!result) return res.status(404).send("Account not found with id " + id);
        res.json(result);
      })
      .catch((err: Error) => res.status(500).send(err.message));
  },

  findMany: (req: Request, res: Response) => {
    const query: { [key: string]: unknown } = {};
    if (req.query.name) query["name"] = { $regex: req.query.name, $options: "i" };
    if (req.query.type) query["type"] = req.query.type;
    if (req.query.phone) query["phone"] = { $regex: req.query.phone, $options: "i" };
    if (req.query.email) query["email"] = { $regex: req.query.email, $options: "i" };

    Accounts.find(query)
      .populate("managers")
      .then((result) => res.json(result))
      .catch((err: Error) => res.status(500).send(err.message));
  },

  findAll: (_req: Request, res: Response) => {
    Accounts.find()
      .populate("managers")
      .then((result) => res.json(result))
      .catch((err: Error) => res.status(500).send(err.message));
  },

  /*****************************
   * UPDATE OPERATIONS
   *****************************/

  updateById: (req: Request, res: Response) => {
    const id = req.params.id;
    if (!req.body) return res.status(400).send({ message: "Data cannot be empty!" });

    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    Accounts.findByIdAndUpdate(id, req.body, options)
      .exec()
      .then((result) => (result ? res.json(result) : res.status(404).send("Not found")))
      .catch((err: Error) => res.status(500).send(err.message));
  },

  /*****************************
   * DELETE OPERATIONS
   *****************************/

  deleteById: (req: Request, res: Response) => {
    const id = req.params.id;
    Accounts.findByIdAndDelete(id)
      .then((result) => (result ? res.json(result) : res.status(404).send("Not found")))
      .catch((err: Error) => res.status(500).send(err.message));
  },

  deleteMany: (req: Request, res: Response) => {
    const ids = req.body.map((a: { id: string }) => a.id);
    Accounts.deleteMany({ _id: { $in: ids } })
      .then((result) => res.json(result))
      .catch((err: Error) => res.status(500).send(err.message));
  },

  deleteAll: (_req: Request, res: Response) => {
    Accounts.deleteMany({})
      .then((result) => res.json(result))
      .catch((err: Error) => res.status(500).send(err.message));
  },
};
