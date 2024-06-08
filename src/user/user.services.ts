import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserResponse } from './user.interface';

@Injectable()
export class UserService {

  constructor(
    @InjectModel('User') private userModel: Model<User>
  ) { }

  async create(user: User) {

    const userExists = await this.userModel.findOne({ email: user.email }).exec();

    if (userExists) {
      throw new Error('O email informado já está cadastrado.');
    }

    try {
      const createdUser = new this.userModel(user);      

      await createdUser.save();

      if (createdUser) {
        return { message: 'Usuário criado com sucesso.' };
      }
      
    } catch (error) {
      throw new Error(error.message);
    }

  }

  async findOne(email: string) : Promise<User> {
    if (!email) {
      throw new Error('O email é obrigatório.');
    }

    const user = await this.userModel.findOne({ email: email }).exec();

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }
    
    return user;
  }

  findAll() {
    return this.userModel.find({}, { password: 0, __v: 0, _id: 0 }).exec();
  }


  update(email: string, user: User) {
    return this.userModel.findByIdAndUpdate(email, user, { new: true }).exec();
  }

  async remove(email : string) {

    if (!email) {
      throw new Error('O email é obrigatório.');
    }

    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }
    
    return this.userModel.deleteOne({ email }).exec();
  }


}