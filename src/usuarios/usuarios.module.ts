import { AuthModule } from "./../auth/auth.module";
import { AuthService } from "./../auth/auth.service";
import { UsuarioEntity } from "./entities/usuario.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { UsuariosController } from "./usuarios.controller";
import { UsuarioRepository } from "./usuarios.repository";

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity]), AuthModule],
  controllers: [UsuariosController],
  providers: [UsuarioRepository, AuthService],
})
export class UsuariosModule {}
