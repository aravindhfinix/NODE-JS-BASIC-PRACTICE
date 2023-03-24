import { Book } from "../../model/books";
import { responseHandler } from "../../response/responseHandler";
import { redis } from "../../server";

export const remainingBooks = async (req, res) => {
  let results;
  try {
    const book = await Book.find({
      $and: [
        {
          bought: false,
          rented: false,
        },
      ],
    }).select("name author journal");
    if (book === 0) {
      return responseHandler(res, 400, "No Books", false);
    }
    const cachedResult = await redis.get("books");
    if (cachedResult) {
      results = JSON.parse(cachedResult);
      return responseHandler(res, 200, "Data sent from cache", true, results);
    } else {
      results = redis.setex("books", 60, JSON.stringify(book));
      return responseHandler(res, 200, "Data sent from database", true, book);
    }
  } catch (err) {
    return responseHandler(res, 500, err.message);
  }
};
