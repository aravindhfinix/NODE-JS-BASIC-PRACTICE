import { Book } from "../../model/books";
import { responseHandler } from "../../response/responseHandler";

export const bookCreation = async (req, res) => {
  try {
    const books = await new Book({
      name: req.body.name,
      author: req.body.author,
      journal: req.body.journal,
    });
    await books.save();
    return responseHandler(res, 200, "Book created successfully", true, books);
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
