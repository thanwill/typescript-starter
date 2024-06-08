import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth/auth.services';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly authService: AuthService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token de autenticação não encontrado.' });
        }
        try {
            const decoded = await this.authService.validateToken(token);
            req.body.user = decoded;
            next();
        } catch (err) {            
            return res.status(401).json({ message: `${err}`});
        }
    }
}
