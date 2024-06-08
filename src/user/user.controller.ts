import { Controller, Post, Body, Get, Delete, Param, Put } from '@nestjs/common';
import { UserService } from './user.services';
import { User, UserResponse } from './user.interface';

@Controller('/users')
export class UserController {
  
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get()
  // obtem usuar'io pelo email
  async findOne(@Body() email: string): Promise<UserResponse> {
    return this.userService.findOne(email);
  }

  @Get(':email')
  async findOneByEmail(@Param('email') email: string): Promise<object> {
    try{
      return await this.userService.findOne(email);
    } catch (error) {
      return { message: error.message };
    }
  }

  @Post()
  async create(@Body() user: User): Promise<object> {
    try {
      return await this.userService.create(user);
    } catch (error) {
      
      return { message: error.message };
    }
  }

  @Put(':email')
  async update(
    @Param('email') email: string,
    @Body() user: User,
  ){
    try{
      return await this.userService.update(email, user);
    } catch (error) {
      return { message: error.message };
    }
  }

  @Delete(':email')
  async remove(
    @Param('email') email: string,
  ){
    try{
      return await this.userService.remove(email);
    } catch (error) {
      return { message: error.message };
    }
  }

}