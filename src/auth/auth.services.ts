import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.services';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }


  async login(user: any) {

    if (!user.email || !user.password) {
      throw new Error('Email e senha são obrigatórios.');
    }
    const userExists = await this.userService.findOne(user.email);

    if (!userExists) {
      throw new Error('Usuário não encontrado.');
    }

    const isMatch = await bcrypt.compare(user.password, userExists.password);

    if (!isMatch) {
      throw new Error('Senha inválida.');
    }

    return this.getToken(userExists);

  }

  async getToken(user: any) {
    const payload = { email: user.email, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
      token_type: 'Bearer',
      expires_in: 3600
    };
  };


  async validateToken(jwt: string) {
    return this.jwtService.verify(jwt);
  }

}