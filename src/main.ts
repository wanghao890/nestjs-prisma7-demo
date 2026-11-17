import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 👇 加这一行，允许跨域请求
  app.enableCors(); 
  await app.listen(process.env.PORT ?? 3123);
}
await bootstrap();
