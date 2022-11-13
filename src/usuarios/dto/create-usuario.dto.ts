import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  MinLength,
} from "class-validator";
import { Perfiles } from "../enum/perfiles.enum";

export class CreateUsuarioDto {
  @ApiProperty({
    description: "Nombre del usuario",
    example: "Juan",
  })
  @IsString()
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  nombre: string;

  @ApiProperty({
    description: "Apellido del usuario",
    example: "Perez",
  })
  @IsString()
  @IsNotEmpty({ message: "El apellido es obligatorio" })
  apellido: string;

  @ApiProperty({
    description: "Email del usuario",
    example: "juan@live.com",
  })
  @IsEmail({}, { message: "El email no es válido" })
  @IsNotEmpty({ message: "El email es obligatorio" })
  email: string;

  @ApiProperty({
    description: "Contraseña del usuario",
    example: "12345678",
  })
  @IsString()
  @IsNotEmpty({ message: "La contraseña es obligatoria" })
  @MinLength(8, { message: "La contraseña debe tener al menos 8 caracteres" })
  password: string;

  @ApiProperty({
    description: "Perfil del usuario",
    example: Perfiles.ADMIN,
    enum: Perfiles,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(Perfiles, {
    message: `El perfil no es válido [${Perfiles.ADMIN}|${Perfiles.CIUDADANO}]`,
  })
  perfil: Perfiles;
}
