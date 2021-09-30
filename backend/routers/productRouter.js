import express from "express";
import { data } from "../data.js";
import _ from "lodash";
import Product from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";
import { filterByBrands, filterByTypes } from "../utils.js";

const router = express.Router();

router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const pageSize = 16;
    const page = Number(req.query.pageNumber) || 1;

    const name = req.query.name || "";
    const category = req.query.category || "";
    const brand = req.query.brand || "";
    const type = req.query.type || "";
    const order = req.query.order || "";
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

    const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
    const categoryFilter = category ? { category } : {};
    const brandFilter = brand ? { brand } : {};
    const typeFilter = type ? { type } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
      order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : { _id: -1 };

    const count = await Product.count({
      ...nameFilter,
      ...categoryFilter,
      ...brandFilter,
      ...typeFilter,
      ...priceFilter,
      ...ratingFilter,
    });

    const products = await Product.find({
      ...nameFilter,
      ...categoryFilter,
      ...brandFilter,
      ...typeFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const productList = {
      products,
      page,
      pages: Math.ceil(count / pageSize),
      totalRows: count,
    };

    const categoryFilterCount = await Product.find({
      ...nameFilter,
      ...brandFilter,
      ...typeFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .populate("category")
      .select("category");

    const uniqueCategories = _.uniqBy(categoryFilterCount, function (e) {
      return e.category._id;
    });

    const categories = uniqueCategories.map(
      (category) => category.category
    );

    const brandQuery = await Product.find({
      ...nameFilter,
      ...categoryFilter,
      ...typeFilter,
      ...priceFilter,
      ...ratingFilter,
    }).select("brand");

    const brandFilterCount = filterByBrands(brandQuery);

    const typeQuery = await Product.find({
      ...nameFilter,
      ...categoryFilter,
      ...brandFilter,
      ...priceFilter,
      ...ratingFilter,
    }).select("type");

    const typeFilterCount = filterByTypes(typeQuery);

    // const brandFilterCount = await Product.aggregate([
    //   {
    //     $match: {
    //       ...nameFilter,
    //       ...categoryFilter,
    //       ...typeFilter,
    //       ...priceFilter,
    //       ...ratingFilter,
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$type",
    //       count: { $sum: 1 },
    //     },
    //   },
    //   { $sort: { count: -1 } },
    // ]);

    // const typeFilterCount = await Product.aggregate([
    //   {
    //     $match: {
    //       ...nameFilter,
    //       ...categoryFilter,
    //       ...brandFilter,
    //       ...priceFilter,
    //       ...ratingFilter,
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$type",
    //       count: { $sum: 1 },
    //     },
    //   },
    //   { $sort: { count: -1 } },
    // ]);

    const filters = {
      brandFilterCount,
      typeFilterCount,
      categories,
    };

    res.send({ productList, filters });
  })
);

router.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

export default router;
