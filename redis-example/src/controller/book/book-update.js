import { Book } from "../../model/books";
import { responseHandler } from "../../response/responseHandler";

export const bookUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const books = await Book.findByIdAndUpdate(
      { _id: id },
      {
        name: req.body.name,
        author: req.body.author,
        journal: req.body.journal,
      },
      { new: true }
    );
    return responseHandler(res, 200, "Book updated successfully", true, books);
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
