import { Request, Response } from "express";
import db from "../models/index";
const Cylinders = db.cylinders;

type Cylinder = {
  id?: string;
  _id?: string;
  serialNumber: string;
  current_owner: string;
  status: string;
  last_service_date: Date;
  last_refill_date: Date;
  history: Array<{
    event: string;
    actor: string;
    date: Date;
    notes: string;
  }>;
};

export default {
  /*****************************
   * CREATE OPERATIONS
   *****************************/

  create: (req: Request, res: Response) => {
    if (!req.body)
      return res.status(400).send({ message: "Content cannot be empty!" });
    const {
      serialNumber,
      current_owner,
      status,
      last_service_date,
      last_refill_date,
      history,
    } = req.body;

    const cylinder = new Cylinders({
      serialNumber,
      current_owner,
      status: status || "full",
      last_service_date,
      last_refill_date,
      history,
    });

    cylinder
      .save()
      .then((result) => res.json(result))
      .catch((err: Error) =>
        res.status(500).send(err.message || "Error creating Cylinder.")
      );
  },

  createMany: (req: Request, res: Response) => {
    const cylinders = req.body.map((c: Cylinder) => ({ ...c }));
    Cylinders.insertMany(cylinders, { ordered: true })
      .then((result) => res.json(result))
      .catch((err: Error) => res.status(400).send(err.message));
  },

  /*****************************
   * READ OPERATIONS
   *****************************/

  findById: (req: Request, res: Response) => {
    const id = req.params.id;
    Cylinders.findById(id)
      .populate("current_owner")
      .exec()
      .then((result) =>
        result ? res.json(result) : res.status(404).send("Cylinder not found")
      )
      .catch((err: Error) => res.status(500).send(err.message));
  },

  findMany: (req: Request, res: Response) => {
    const query: { [key: string]: unknown } = {};
    if (req.query.status) query["status"] = req.query.status;
    if (req.query.owner) query["current_owner"] = req.query.owner;
    if (req.query.serialNumber)
      query["serialNumber"] = { $regex: req.query.serialNumber, $options: "i" };

    Cylinders.find(query)
      .populate("current_owner")
      .then((result) => res.json(result))
      .catch((err: Error) => res.status(500).send(err.message));
  },

  findAll: (_req: Request, res: Response) => {
    Cylinders.find()
      .populate("current_owner")
      .then((result) => res.json(result))
      .catch((err: Error) => res.status(500).send(err.message));
  },

  /*****************************
   * UPDATE OPERATIONS
   *****************************/

  updateById: (req: Request, res: Response) => {
    const id = req.params.id;
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    Cylinders.findByIdAndUpdate(id, req.body, options)
      .exec()
      .then((result) =>
        result ? res.json(result) : res.status(404).send("Not found")
      )
      .catch((err: Error) => res.status(500).send(err.message));
  },

  markRecycled: (req: Request, res: Response) => {
    const id = req.params.id;
    Cylinders.findByIdAndUpdate(
      id,
      {
        status: "recycled",
        $push: {
          history: {
            event: "recycled",
            actor: req.body.actor,
            date: new Date(),
            notes: req.body.notes,
          },
        },
      },
      { new: true }
    )
      .exec()
      .then((result) => res.json(result))
      .catch((err: Error) => res.status(500).send(err.message));
  },

  /*****************************
   * DELETE OPERATIONS
   *****************************/

  deleteById: (req: Request, res: Response) => {
    const id = req.params.id;
    Cylinders.findByIdAndDelete(id)
      .then((result) =>
        result ? res.json(result) : res.status(404).send("Not found")
      )
      .catch((err: Error) => res.status(500).send(err.message));
  },
};
