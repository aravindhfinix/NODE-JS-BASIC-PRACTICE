import { Router } from "express";
export const bookRouter = Router();
import { bookCreation } from "../../controller/book/book.create";
import { bookDelete } from "../../controller/book/book-delete";
import { bookOne } from "../../controller/book/book-one";
import { bookAll } from "../../controller/book/book-all";
import { bookUpdate } from "../../controller/book/book-update";
import { permit } from "../../middleware/permit";
import { role } from "../../middleware/role";
import { bookAuthor } from "../../controller/book/book-author";
import { bookJournal } from "../../controller/book/book-journal";
import { searchBook } from "../../controller/book/book-search";
import { bookByUserJournal } from "../../controller/book/book-userjournal";
import { bookByUserAuthor } from "../../controller/book/book-userauthor";
import { bookRent } from "../../controller/book/book-rent";
import { bookNotReturned } from "../../controller/book/book-notreturned";
import { bookReturnedOrNot } from "../../controller/book/book-returned-or-not";
import { bookUserNotReturned } from "../../controller/book/book-user-not-returned";

bookRouter.post("/create", role, permit(["admin"]), bookCreation);
bookRouter.delete("/delete/:id", role, permit(["admin"]), bookDelete);
bookRouter.patch("/update/:id", role, permit(["admin"]), bookUpdate);
bookRouter.get("/get/:id", role, permit(["admin"]), bookOne);
bookRouter.get("/author", role, permit(["admin"]), bookAuthor);
bookRouter.get("/getall", role, permit(["admin"]), bookAll);
bookRouter.get("/journal", role, permit(["admin"]), bookJournal);
bookRouter.get("/search", role, permit(["admin"]), searchBook);
bookRouter.get("/userjournal", role, permit(["admin"]), bookByUserJournal);
bookRouter.get("/userauthor", role, permit(["admin"]), bookByUserAuthor);
bookRouter.patch("/rent", bookRent);
bookRouter.get("/notreturned", role, permit(["admin"]), bookNotReturned);
bookRouter.get("/returned-or-not", role, permit(["admin"]), bookReturnedOrNot);
bookRouter.get(
  "/user-not-returned",
  role,
  permit(["admin"]),
  bookUserNotReturned
);
