import { User } from "../../model/user";
import { Book } from "../../model/books";
import { responseHandler } from "../../response/responseHandler";

export const buyBooks = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.body.id },
      { $push: { books: req.body.books } },
      { new: true }
    )
      .select("name email")
      .populate("books", { name: 1, author: 1, journal: 1, cost: 1 });
    const books = await Book.findByIdAndUpdate(
      { _id: req.body.books },
      { bought: true, cost: req.body.cost },
      { new: true }
    );
    return responseHandler(
      res,
      200,
      "User bought books sent Successfully",
      true,
      user
    );
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
