import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsuarioRepository } from "src/usuarios/usuarios.repository";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioRepository]),
    JwtModule.register({
      secret: "llave secreta para los JWT",
      signOptions: { expiresIn: "1h" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsuarioRepository],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
