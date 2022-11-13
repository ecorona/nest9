import { ApiProperty } from "@nestjs/swagger";
import { UsuarioEntity } from "src/usuarios/entities/usuario.entity";

export class LoginResponse {
  @ApiProperty({
    description: "Token de autenticación",
    example: "fakeJWTToken",
  })
  accessToken: string;

  usuario: Omit<UsuarioEntity, "password">;
}
