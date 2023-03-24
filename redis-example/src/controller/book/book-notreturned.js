import { Book } from "../../model/books";
import { responseHandler } from "../../response/responseHandler";
import { redis } from "../../server";

export const bookNotReturned = async (req, res) => {
  let results;
  try {
    const books = await Book.find({ returned: false }).select(
      "name author journal"
    );
    if (books.length === 0) {
      return responseHandler(res, 400, "No books", false);
    }
    const cachedResult = await redis.get("notReturnedBooks");
    if (cachedResult) {
      results = JSON.parse(cachedResult);
      return responseHandler(res, 200, "Data sent from cache", true, results);
    } else {
      results = redis.setex("notReturnedBooks", 60, JSON.stringify(books));
      return responseHandler(res, 200, "Data sent from database", true, books);
    }
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
