import { Book } from "../../model/books";
import { responseHandler } from "../../response/responseHandler";
import { redis } from "../../server";

export const bookAll = async (req, res) => {
  let results;
  try {
    const books = await Book.find().select("-__v");
    if (books.length == 0) {
      return responseHandler(res, 400, "No Books", false);
    }
    const cachedResult = await redis.get("books");
    if (cachedResult) {
      results = JSON.parse(cachedResult);
      return responseHandler(res, 200, "Data sent from cache", true, results);
    } else {
      results = redis.setex("books", 60, JSON.stringify(books));
      return responseHandler(res, 200, "Data sent from database", true, books);
    }
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
