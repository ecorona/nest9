import { UsuarioEntity } from "./entities/usuario.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { UsuariosController } from "./usuarios.controller";
import { UsuarioRepository } from "./usuarios.repository";

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  controllers: [UsuariosController],
  providers: [UsuarioRepository],
})
export class UsuariosModule {}
