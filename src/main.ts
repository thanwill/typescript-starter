import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthMiddleware } from './middleware/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3004);
}
bootstrap();
