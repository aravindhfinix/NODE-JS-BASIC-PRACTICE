import { Book } from "../../model/books";
import { responseHandler } from "../../response/responseHandler";

export const bookDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findByIdAndDelete({ _id: id });
    return responseHandler(res, 200, "book deleted successfully", true);
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
