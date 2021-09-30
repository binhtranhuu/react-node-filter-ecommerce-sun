import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    children: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Category",
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);
const Category = mongoose.model("Category", categorySchema);

export default Category;
