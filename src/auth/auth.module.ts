import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsuarioRepository } from "src/usuarios/usuarios.repository";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
      secret: "llave secreta para los JWT",
      signOptions: { expiresIn: "1h" },
    }),
    TypeOrmModule.forFeature([UsuarioRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsuarioRepository],
})
export class AuthModule {}
