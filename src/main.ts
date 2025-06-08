import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe, BadRequestException } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import * as basicAuth from "express-basic-auth";
import { AllExceptionsFilter } from "./common/errors/error.handling";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    ["/api/docs"],
    basicAuth({
      users: {
        superadmin: "strong2025",
      },
      challenge: true,
    })
  );

  app.use(cookieParser());

  app.useGlobalFilters(new AllExceptionsFilter());

  app.setGlobalPrefix("api");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true, 
      transform: true,
    })
  );

  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:8000",
        "http://localhost:3000",
        "https://skidkachi.uz",
        "https://api.skidkachi.uz",
        "https://skidkachi.vercel.app",
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new BadRequestException("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle("Jewelry Store Project")
    .setDescription("REST API for jewelry system")
    .setVersion("1.0")
    .addTag("NestJS, TypeORM, Swagger")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      "access-token" 
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  const PORT = process.env.PORT || 3030;
  await app.listen(PORT);
  console.log(`Server running at http://localhost:${PORT}`);
}

bootstrap();
