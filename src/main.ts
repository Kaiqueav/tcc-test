import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/http-exception.filter'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
 app.enableCors({
    origin: true, // Permite qualquer origem (ótimo para desenvolvimento)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  app.useGlobalFilters(new AllExceptionsFilter());
  
   
}
bootstrap();
