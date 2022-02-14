import mongoose from 'mongoose';

const user = new mongoose.Schema({
  username: String,
  name: String,
  lastname: String,
  password: String,
  avatar: {data: Buffer, contentType: String}
});

export const User = mongoose.model("User", user);