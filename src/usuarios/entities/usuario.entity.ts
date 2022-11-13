import { hash, compare } from "bcrypt";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";
import { Perfiles } from "../enum/perfiles.enum";

@Entity("usuarios")
export class UsuarioEntity {
  @ApiProperty({
    description: "Id del usuario",
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: "Nombre del usuario",
    example: "Juan",
  })
  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  nombre: string;
  @ApiProperty({
    description: "Apellido del usuario",
    example: "Perez",
  })
  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  apellido: string;

  @ApiProperty({
    description: "Email del usuario",
    example: "juan@live.com",
  })
  @Column({
    type: "varchar",
    length: 150,
    nullable: false,
    unique: true,
  })
  email: string;

  @ApiProperty({
    description: "Contraseña del usuario",
    example: "12345678",
  })
  @Column({
    type: "varchar",
    length: 100,
    nullable: true,
  })
  @Exclude()
  password: string;

  @ApiProperty({
    description: "Perfil del usuario",
    example: Perfiles.ADMIN,
    enum: Perfiles,
  })
  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
    default: Perfiles.CIUDADANO,
  })
  perfil: Perfiles;

  @ApiProperty({
    description: "Indica si el usuario está activo",
    example: true,
    type: Boolean,
  })
  @Column({ type: "boolean", default: false })
  activo: boolean;

  @ApiProperty({
    description: "Fecha de creación del usuario",
    example: "2021-01-01T00:00:00.000Z",
    type: Date,
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: "Fecha de actualización del usuario",
    example: "2021-01-01T00:00:00.000Z",
    type: Date,
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: "Versión del usuario",
    example: 1,
  })
  @VersionColumn()
  version: number;

  @ApiProperty({
    description: "Fecha de eliminación del usuario",
    example: "2021-01-01T00:00:00.000Z",
    type: Date,
  })
  @DeleteDateColumn()
  deletedAt: Date;

  async checkPassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }

  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
