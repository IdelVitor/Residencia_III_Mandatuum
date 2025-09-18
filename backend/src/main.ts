import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Mandatuum')
    .setDescription('Documentação das rotas da API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  // deepScanRoutes ajuda o Swagger a encontrar rotas em todos os módulos
  const document = SwaggerModule.createDocument(app, config, { deepScanRoutes: true });
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log('> http://localhost:3000/api-docs');
}
bootstrap();
