import { hashSync } from "bcrypt";
import { Document, Model, model, Schema } from "mongoose";

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
}

// Virtuals
UserSchema.virtual("fullName").get(function (this: UserBaseDocument) {
  return this.firstName + this.lastName;
});

// Methods
// UserSchema.methods.getGender = function (this: UserBaseDocument) {
//   return this.gender > 0 ? "Male" : "Female";
// };

// For model
export interface UserModel extends Model<UserBaseDocument> {
  // findMyCompany(id: string): Promise<UserBaseDocument>;
}

// Static methods
// UserSchema.statics.findMyCompany = async function (
//   this: Model<UserBaseDocument>,
//   id: string
// ) {
//   return this.findById(id).populate("company").exec();
// };

// Document middlewares
UserSchema.pre<UserBaseDocument>("save", function (next) {
  if (this.isModified("password")) {
    this.password = hashSync(this.password, 10);
  }
  next();
});

export const User = model<UserBaseDocument, UserModel>("User", UserSchema);
