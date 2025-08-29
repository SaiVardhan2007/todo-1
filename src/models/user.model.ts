import mongoose, { Schema, Document } from "mongoose";
const validator = require('validator');

export interface User extends Document {
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String,
       required: true,
        unique: true,
        validate: [validator.isEmail, 'Invalid email'], // instead we can use: match: /.+@.+\..+/ 
      },

    password: { type: String, required: true }, // hashed password
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<User>("User", userSchema);
