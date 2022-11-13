import { ValidationPipe, VersioningType } from "@nestjs/common";
import { NestApplication, NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  //instancia de la aplicacion de Nest
  const app = await NestFactory.create<NestApplication>(AppModule);

  //cors
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Accept, Authorization",
    credentials: true,
  });

  // Enable validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Enable versioning
  app.enableVersioning({
    prefix: "v",
    type: VersioningType.URI,
    defaultVersion: "1",
  });

  // Global prefix
  app.setGlobalPrefix("api");

  // Generate swagger config
  const config = new DocumentBuilder()
    .setTitle("Api de ejemplos")
    .setDescription("Api de ejemplos")
    .setVersion("1")
    .build();
  // Generate swagger module
  const document = SwaggerModule.createDocument(app, config);

  // Enable swagger
  SwaggerModule.setup("swagger", app, document);

  // Start server
  await app.listen(3000);
}
bootstrap();
