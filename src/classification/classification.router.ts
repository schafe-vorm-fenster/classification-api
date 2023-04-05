import express, { Request, Response } from "express";
import ClassificationController from "./classification.controller";

const router = express.Router();

router.post("", async (_req: Request, res: Response) => {
  if (!_req.headers["read-access"]) return res.status(401).send("Unauthorized");

  const controller = new ClassificationController();
  await controller
    .getClassification(_req.body)
    .then((response) => {
      res.set(
        "Cache-Control",
        "public, max-age=300, s-maxage=300, stale-while-revalidate=60, stale-if-error=60"
      );
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res
        .status(error.status || 500)
        .json({ status: error.status || 500, error: error.message });
    });
});

export default router;
