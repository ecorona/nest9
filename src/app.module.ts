import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UsuarioEntity } from "./usuarios/entities/usuario.entity";
import { UsuariosModule } from "./usuarios/usuarios.module";

@Module({
  imports: [
    // Conexión a la base de datos
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "testuser",
      password: "testpassword",
      database: "testdb",
      //entidades que se van a registrar con la base de datos
      entities: [UsuarioEntity],
      //sincronizar la base de datos con el modelo
      synchronize: true,
    }),
    //modulos de sistema
    AuthModule,
    UsuariosModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
