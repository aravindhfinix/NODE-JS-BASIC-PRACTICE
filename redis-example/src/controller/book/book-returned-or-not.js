import { Book } from "../../model/books";
import { responseHandler } from "../../response/responseHandler";

export const bookReturnedOrNot = async (req, res) => {
  try {
    const book = await Book.findById({ _id: req.body.id }).select(
      "name author journal returned"
    );
    return responseHandler(
      res,
      200,
      "Book details sent successfully",
      true,
      book
    );
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
