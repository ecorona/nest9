import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
export class LoginDto {
  @ApiProperty({
    description: "Email del usuario",
    example: "juan@live.com",
  })
  @IsEmail(
    {},
    {
      message: "El email no es válido",
    }
  )
  @IsNotEmpty({
    message: "El email es requerido",
  })
  email: string;

  @ApiProperty({
    description: "Contraseña del usuario",
    example: "12345678",
  })
  @IsString()
  @MinLength(8, {
    message: "La contraseña debe tener al menos 8 caracteres",
  })
  @IsNotEmpty({
    message: "La contraseña no puede estar vacía",
  })
  password: string;
}
