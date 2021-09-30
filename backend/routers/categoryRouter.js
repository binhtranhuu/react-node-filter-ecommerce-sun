import express from "express";
import { data } from "../data.js";
import Category from "../models/categoryModel.js";
import expressAsyncHandler from "express-async-handler";

const router = express.Router();

router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.send(categories);
  })
);

router.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await Category.remove({});
    const createdCategories = await Category.insertMany(data.categories);
    res.send({ createdCategories });
  })
);

export default router;
