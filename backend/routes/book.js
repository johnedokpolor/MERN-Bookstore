import express from "express";
const router = express.Router();
import {
  CreateBook,
  DeleteBook,
  EditBook,
  GetBook,
  GetSingleBook,
} from "../controllers/book.js";

router.route("/").get(GetBook).post(CreateBook);
router.route("/:id").get(GetSingleBook).put(EditBook).delete(DeleteBook);

export default router;
