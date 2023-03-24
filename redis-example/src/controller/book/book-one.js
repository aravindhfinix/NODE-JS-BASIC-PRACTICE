import { Book} from "../../model/books";
import { responseHandler } from "../../response/responseHandler";

export const bookOne = async (req, res) => {
  try {
    const id = req.params.id;
    const books = await Book
      .findById({ _id: id })
      .select("-__v")
    return responseHandler(res, 200, "book sent successfully", true, books);
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
