import { updateSchema, User } from "../../model/user";
import { responseHandler } from "../../response/responseHandler";
import bcrypt from "bcrypt";

export const resetPassword = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = updateSchema.validate(req.body);
    if (error) {
      return responseHandler(res, 403, error.details[0].message, false);
    } else {
      const hash = await bcrypt.hash(value.password, 10);
      value.password = hash;
      const user = await User.findByIdAndUpdate(
        { _id: id },
        {
          password: value.password,
          confirmPassword: value.confirmPassword,
        },
        { new: true }
      );
      return responseHandler(res, 200, "Password updated successfully", true);
    }
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
