import { Book } from "../../model/books";
import { responseHandler } from "../../response/responseHandler";

export const searchBook = async (req, res) => {
  const name = req.query.name;
  try {
    const book = await Book.find({
      name: { $regex: `^${name}`, $options: "i" },
    }).select("name author journal");
    if (book.length === 0) {
      return responseHandler(res, 400, "No Books", false);
    }
    return responseHandler(res, 200, "Book details sent successfully", book);
  } catch (err) {
    return responseHandler(res, 500, err.message);
  }
};
