import { compareSync, hashSync } from "bcrypt";
import { Document, Model, model, Schema } from "mongoose";
import { sign } from "jsonwebtoken";
import { randomBytes } from "crypto";
import { environment } from "../utils";

// Schema
const UserSchema = new Schema<UserBaseDocument, UserModel>({
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  username: { type: String, unique: true, default: "" },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export interface IUser {
  firstName?: string;
  lastName?: string;
  username?: string;
  email: string;
  password: string;
}

interface UserBaseDocument extends IUser, Document {
  fullName: string;
  generateToken(): String;
}

// Virtuals
UserSchema.virtual("fullName").get(function (this: UserBaseDocument) {
  return this.firstName + this.lastName;
});

// Methods
UserSchema.methods.generateToken = function (this: UserBaseDocument) {
  return sign({ id: this._id }, environment.secret, { expiresIn: "1800s" });
};

// For model
export interface UserModel extends Model<UserBaseDocument> {
  findByCredentials({ email, password }): Promise<UserBaseDocument>;
}

// Static methods
UserSchema.statics.findByCredentials = async function (
  this: Model<UserBaseDocument>,
  { email, password }
) {
  try {
    const user = await this.findOne({ email });
    if (!user) throw new Error("There is no user with such an email");

    const isMatch = compareSync(password, user.password);
    if (!isMatch) throw new Error("Wrong credentials");

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Document middlewares
UserSchema.pre<UserBaseDocument>("save", function (next) {
  if (this.isModified("password")) {
    this.password = hashSync(this.password, 10);
  }
  next();
});

export const User = model<UserBaseDocument, UserModel>("User", UserSchema);
