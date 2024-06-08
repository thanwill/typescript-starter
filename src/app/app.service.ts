import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    // informações sobre a Auth API
    return {
      message: 'Auth API',
      version: '1.0.0',
    };
  }
}
