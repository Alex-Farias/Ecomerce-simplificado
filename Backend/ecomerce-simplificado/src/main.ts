import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
      'Content-Type', // Allow standard content type headers (e.g., for JSON data)
      'Authorization', // Allow authorization headers (for token-based authentication)
      'Accept', // Allow accept headers (specifies the media types that are acceptable)
      'X-Requested-With', // Allows browser requests initiated by JavaScript (like XMLHttpRequest)
    ],
    credentials: true,
  });

  app.useBodyParser('json');

  console.log('Database Host:', process.env.DB_DOCKER_HOST);
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
