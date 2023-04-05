import express from "express";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger/swagger.json";
import CategoriesRouter from "./categories/categories.router";
import AuthRouter from "./auth/auth.middleware";
import ClassificationRouter from "./classification/classification.router";

const router = express.Router();

router.use(express.static("public"));

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

router.use("*", AuthRouter);

router.use("/classify", ClassificationRouter);

router.use("/categories", CategoriesRouter);

export default router;
