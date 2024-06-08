// cria a module user

import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.services';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema as User } from './user.model';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.services';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from '../middleware/auth.middleware';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forFeature([{ name: 'User', schema: User }]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRESIN }
        }),
    ],
    controllers: [UserController, AuthController],
    providers: [UserService, AuthService],
})

export class UserModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: 'users', method: RequestMethod.GET },
                { path: 'users/:email', method: RequestMethod.GET },
                { path: 'users/:email', method: RequestMethod.PUT },
                { path: 'users/:email', method: RequestMethod.DELETE },                
            )
    }
}