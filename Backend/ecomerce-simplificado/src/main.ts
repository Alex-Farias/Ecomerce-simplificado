import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  console.log('Database Host:', process.env.DB_DOCKER_HOST);
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
