import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.services';
// cria a controller auth

@Controller('/auth')
export class AuthController {
  
    constructor( private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() user: any): Promise<object> {
        try{
            return await this.authService.login(user);
        } catch (error) {
            return {
                message: error.message
            };
        }
    }

}