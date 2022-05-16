const express = require("express");
const {
  requireSignin,
  adminMiddleware,
  managerMiddleware,
  customMiddleware,
} = require("../common-middleware");
const {
  createProduct,

  getAllProducts,
  updateProduct,
} = require("../controller/product");

const router = express.Router();

router.post("/product/create", requireSignin, adminMiddleware, createProduct);
router.get(
  "/product/getallproducts",
  requireSignin,
  customMiddleware,
  getAllProducts
);

router.put(
  "/product/updateproduct/:id",
  requireSignin,
  customMiddleware,
  updateProduct
);

module.exports = router;
