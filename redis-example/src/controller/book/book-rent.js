import { Book } from "../../model/books";
import { User } from "../../model/user";
import { responseHandler } from "../../response/responseHandler";

export const bookRent = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.body.id },
      { $push: { books: req.body.books } },
      { new: true }
    )
      .select("name email")
      .populate("books", { name: 1, author: 1, journal: 1 });
    const books = await Book.findByIdAndUpdate(
      { _id: req.body.books },
      {
        rented: true,
        rented_date: req.body.rented_date,
        returned_date: req.body.returned_date,
        returned: false,
      },
      { new: true }
    );
    return responseHandler(
      res,
      200,
      "Rented Book sent successfully",
      true,
      books
    );
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
