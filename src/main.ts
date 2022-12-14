import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerDocumentOptions } from './interface/swagger.interface';
import { ExpressSwaggerCustomOptions } from './interface/swag.interface';
import dbConfig from './config/db.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('User Application')
    .setDescription('User API Application')
    .setVersion('v1')
    .addTag('user')
    .build();

  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };

  const document = SwaggerModule.createDocument(app, config, options);

  const customOptions: ExpressSwaggerCustomOptions = {
    customSiteTitle: 'User API Docs',
  };

  SwaggerModule.setup('api', app, document, customOptions);


  const port = dbConfig().port
  await app.listen(port);
}
bootstrap();
