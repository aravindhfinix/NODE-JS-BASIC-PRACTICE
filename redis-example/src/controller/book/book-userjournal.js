import { User } from "../../model/user";
import { responseHandler } from "../../response/responseHandler";

export const bookByUserJournal = async (req, res) => {
  try {
    const user = await User.find().select("name email").populate("books", {
      name: 1,
      author: 1,
      journal: 1,
    });
    const book = [];
    if (user.length > 0) {
      for (let i = 0; i < user.length; i++) {
        const books = user[i].books;
        if (books.length !== 0) {
          let num = 0;
          for (let j = 0; j < books.length; j++) {
            if (books[j].journal === req.query.name) {
              num += 1;
            }
            if (books.length - 1 === j && num > 0) {
              book.push(user[i]);
            }
          }
        }
      }
    } else {
      return responseHandler(res, 200, "No  user found", true);
    }
    return responseHandler(res, 200, "Books sent successfully", true, book);
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
