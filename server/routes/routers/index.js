import express from "express";

import authRouter from "./authRouter.js";
import bannerRouter from "./bannerRouter.js";
import cartRouter from "./cartRouter.js";
import categoryRouter from "./categoryRouter.js";
import orderRouter from "./orderRouter.js";
import productRouter from "./productRouter.js";
import reviewRouter from "./reviewRouter.js";
import userRouter from "./userRouter.js";
import wishListRouter from "./wishListRouter.js";

const router = express.Router();

router.use(`/users`, userRouter);
router.use(`/auth`, authRouter);
router.use(`/products`, productRouter);
router.use(`/categories`, categoryRouter);
router.use(`/reviews`, reviewRouter);
router.use(`/wishlist`, wishListRouter);
router.use(`/cart`, cartRouter);
router.use(`/orders`, orderRouter);
router.use(`/banners`, bannerRouter);

export default router;