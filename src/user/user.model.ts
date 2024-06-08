import mongoose, { Schema, Document, model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from "./user.interface";

export const UserSchema = new mongoose.Schema({  
  id : { type: String, required: false },  
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  isActive: { type: Boolean, default: true },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

// cria uma senha em md5 antes de salvar o usuario
UserSchema.pre<User>('save', function (next) {

  this.updatedAt = new Date();
  this.password = bcrypt.hashSync(this.password, 10);

  next();
}

);
