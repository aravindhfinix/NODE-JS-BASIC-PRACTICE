import { Router } from "express";
import { userRouter } from "./user-router/userRouter";
import { bookRouter } from "./book-router/book-router";
export const router = Router();

router.use("/api/v1/user", userRouter);
router.use("/api/v1/book", bookRouter);
