import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import categoryRouter from "./routers/categoryRouter.js";
import productRouter from "./routers/productRouter.js";

// app
const app = express();

app.get("/", (req, res) => {
  res.send({ message: "Server is live" });
});

// db
mongoose
  .connect(process.env.MONGODB_URL || "mongodb://localhost/ecom_filter", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERR", err));

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

// routers
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
