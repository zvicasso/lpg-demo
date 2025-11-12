import { Request, Response } from "express";
import db from "../models/index";
const Deliveries = db.deliveries;

type Delivery = {
  id?: string;
  _id?: string;
  engineer: string;
  customer: string;
  cylinder: string;
  type: string;
  status: string;
  notes: string;
  delivery_date: Date;
};

export default {
  create: (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send("Body required");
    const delivery = new Deliveries({ ...req.body });
    delivery
      .save()
      .then((result) => res.json(result))
      .catch((err: Error) => res.status(500).send(err.message));
  },

  findById: (req: Request, res: Response) => {
    const id = req.params.id;
    Deliveries.findById(id)
      .populate("engineer")
      .populate("customer")
      .populate("cylinder")
      .exec()
      .then((result) =>
        result ? res.json(result) : res.status(404).send("Not found")
      )
      .catch((err: Error) => res.status(500).send(err.message));
  },

  findByEngineer: (req: Request, res: Response) => {
    Deliveries.find({ engineer: req.params.engineer })
      .populate("cylinder")
      .populate("customer")
      .sort({ delivery_date: -1 })
      .exec()
      .then((result) => res.json(result))
      .catch((err: Error) => res.status(500).send(err.message));
  },

  findByCustomer: (req: Request, res: Response) => {
    Deliveries.find({ customer: req.params.customer })
      .populate("cylinder")
      .populate("engineer")
      .exec()
      .then((result) => res.json(result))
      .catch((err: Error) => res.status(500).send(err.message));
  },

  updateById: (req: Request, res: Response) => {
    const id = req.params.id;
    Deliveries.findByIdAndUpdate(id, req.body, { new: true })
      .exec()
      .then((result) => res.json(result))
      .catch((err: Error) => res.status(500).send(err.message));
  },

  deleteById: (req: Request, res: Response) => {
    Deliveries.findByIdAndDelete(req.params.id)
      .then((result) => res.json(result))
      .catch((err: Error) => res.status(500).send(err.message));
  },
};
