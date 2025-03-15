import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
    .setTitle('Students API')
    .setOpenAPIVersion('3.0.0')
    .setDescription('The students API description')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addServer('http://localhost:3000')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    autoTagControllers: true
  });
  fs.writeFileSync('swagger.json', JSON.stringify(document,null,2));

  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
