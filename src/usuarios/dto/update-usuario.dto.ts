import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class UpdateUsuarioDto {
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
}
